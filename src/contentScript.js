'use strict';

function runQuery(inputText, callback) {
  chrome.runtime.sendMessage(
    {
      type: 'QUERY',
      payload: {
        query: inputText,
      },
    },
    (response) => {
      if (response?.error?.message) {
        alert('OpenAI: ' + response.error.message);
      } else if (response?.choices?.length > 0) {
        const text = response.choices[0]?.message?.content || inputText;
        callback(text);
      }

      console.log(response);
    }
  );
}

function disableButton(convertButton) {
  convertButton.disabled = true;
  convertButton.firstChild.firstChild.innerText = "Loading... Please wait"
}

function enableButton(convertButton) {
  convertButton.disabled = false;
  convertButton.firstChild.firstChild.innerText = "Convert with ChatGPT"
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

function setupButtonListener(convertButton, editorContentArea) {
  convertButton.addEventListener('click', () => {
    disableButton(convertButton)
    runQuery(editorContentArea.innerText, (text) => {
      editorContentArea.innerText = text;
      enableButton(convertButton)
    });
  });
}

const interval = setInterval(() => {
  console.log("Plugin running...")
  const editor = document.getElementsByClassName('query-editor-ace');
  let editorContentArea = document.getElementsByClassName('ace_content');

  if (editor.length > 0 && editorContentArea.length > 0) {
    editorContentArea = editorContentArea[0];
    console.log("Editor found");
  } else {
    console.log("Editor NOT found");
    return;
  }

  if (editorContentArea) {
    const convertButton = createConvertButton();
    setupButtonListener(convertButton, editorContentArea);
    clearInterval(interval);
  }
}, 1000);
