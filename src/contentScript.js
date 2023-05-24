'use strict';

function runQuery(editorContentArea) {
  chrome.runtime.sendMessage(
    {
      type: 'QUERY',
      payload: {
        query: editorContentArea.innerText,
      },
    },
    (response) => {
      if (response.message.includes('```')) {
        response.message = response.message.split('```')[1].replace(/\n/, '');
      }

      console.log(response.message);
    }
  );
};

function addConvertButton(buttonCallback) {
  const runButton = document.querySelectorAll('[data-test-id="run-query-button"]')[0];

  //find element by innerText
  const clone = runButton.cloneNode(true);
  clone.firstChild.firstChild.innerText = "Convert with ChatGPT"
  clone.addEventListener('click', () => {
    buttonCallback();
  });
  clone.classList.add('submit-button-clone');
  runButton.parentNode.insertBefore(clone, runButton.nextSibling);
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
    clearInterval(interval);
    addConvertButton(() => {
      runQuery(editorContentArea);
    })
  }
}, 1000);
