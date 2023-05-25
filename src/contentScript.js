'use strict';

function runQuery(inputText, callback) {
  if (inputText === 'test') {
    runTestQuery(inputText, callback);
  } else {
    runOpenAIQuery(inputText, callback);
  }
}

function runTestQuery(inputText, callback) {
  const interval = setInterval(() => {
    callback('SELECT COUNT(CallCount)\nFROM "AWS/Usage"\nWHERE "Type" = \'API\'\nGROUP BY "Service", "Resource"\nORDER BY SUM() DESC LIMIT 20');
    clearInterval(interval);
  }, 1000);
}

function runOpenAIQuery(inputText, callback) {
  chrome.runtime.sendMessage(
    {
      type: 'QUERY',
      payload: {
        query: inputText,
      },
    },
    (response) => {
      if (response?.error?.message) {
        alert('OpenAI error message: ' + response.error.message);
        callback();
      } else if (response?.error?.code) {
        alert('OpenAI error code: ' + response.error.code);
        callback();
      } else if (response?.choices?.length > 0) {
        const text = response.choices[0]?.message?.content || inputText;
        callback(text);
      }
    }
  );
}

function disableButton(convertButton) {
  convertButton.disabled = true;
  convertButton.firstChild.firstChild.innerText = "Loading... Please wait";
  convertButton.firstChild.classList.add('awsui-button-disabled');
}

function enableButton(convertButton) {
  convertButton.disabled = false;
  convertButton.firstChild.firstChild.innerText = "Convert with ChatGPT";
  convertButton.firstChild.classList.remove('awsui-button-disabled');
}

function createConvertButton() {
  const runButton = document.querySelectorAll('[data-test-id="run-query-button"]')[0];

  //find element by innerText
  const convertButton = runButton.cloneNode(true);
  convertButton.firstChild.firstChild.innerText = "Convert with ChatGPT";
  convertButton.classList.add('submit-button-clone');
  runButton.parentNode.insertBefore(convertButton, runButton.nextSibling);
  return convertButton;
}

function setupButtonListener(convertButton, aceEditor) {
  convertButton.addEventListener('click', () => {
    disableButton(convertButton)
    runQuery(aceEditor.innerText.replace(/[\r\n]+/g,' '), (text) => {
      if (text) {
        writeToAceEditor(text);
      }
      enableButton(convertButton)
    });
  });
}

function writeToAceEditor(text) {
  window.postMessage({
    type: 'MI_GTP_EXTENSION_EVENT',
    text,
  }, "*");
}

function embedEditorHelperScript() {
  var s = document.createElement('script');
  s.src = chrome.runtime.getURL('editor.js');
  (document.head || document.documentElement).appendChild(s);
  s.onload = function() {
      s.remove();
  };
}

function isInSQLEditorPage() {
  return document.getElementsByClassName('query-editor-ace').length > 0;
}

function convertButtonExist() {
  return document.getElementsByClassName('submit-button-clone').length > 0;
}

function main() {
  const interval = setInterval(() => {
    if (!isInSQLEditorPage()) {
      return;
    }

    let aceEditor = document.getElementsByClassName('ace_content');
    if (!(aceEditor.length > 0)) {
      return;
    }
    aceEditor = aceEditor[0];

    if (aceEditor && !convertButtonExist()) {
      const convertButton = createConvertButton();
      setupButtonListener(convertButton, aceEditor);
    }
  }, 1000);
}

embedEditorHelperScript();
main();
