'use strict';

import './popup.css';

(function () {
  const { getApiKey, setApiKey } = require('./storage');

  function setupApiKey(initialValue = '') {
    document.getElementById('apiKey').value = initialValue;
    document.getElementById('saveBtn').addEventListener('click', () => {
      updateApiKey();
    });
  }

  async function updateApiKey() {
    const newApiKey = document.getElementById('apiKey').value;

    await setApiKey(newApiKey);
    document.getElementById('logMessage').innerHTML = "The key was saved :)"
    document.getElementById('logMessage').style.display = 'flex';
  }

  async function restoreApiKey() {
    // Restore apiKey value
    const apiKey = await getApiKey();
    if (typeof apiKey === 'undefined') {
      setupApiKey('');
    } else {
      setupApiKey(apiKey);
    }
  }

  document.addEventListener('DOMContentLoaded', restoreApiKey);

  function clearTextField() {
    document.getElementById('apiKey').value = '';
    document.getElementById('logMessage').style.display = "none";
    setApiKey('');
  }

  const clearBtb = document.getElementById('clearBtn');
  clearBtb.addEventListener('click', clearTextField);
})();