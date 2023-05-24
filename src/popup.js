'use strict';

import './popup.css';

(function () {
  // We will make use of Storage API to get and store `apiKey` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const apiKeyStorage = {
    get: (cb) => {
      chrome.storage.sync.get(['apiKey'], (result) => {
        console.log('Got apiKey = %s', result.apiKey)
        cb(result.apiKey);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        {
          apiKey: value,
        },
        () => {
          cb();
        }
      );
    },
  };

  function setupApiKey(initialValue = '') {
    document.getElementById('apiKey').value = initialValue;
    document.getElementById('saveBtn').addEventListener('click', () => {
      updateApiKey();
    });
  }

  function updateApiKey() {
    const newApiKey = document.getElementById('apiKey').value;

    apiKeyStorage.set(newApiKey, () => {
      console.log('Set apiKey to %s', newApiKey)
    });
  }

  function restoreApiKey() {
    // Restore apiKey value
    apiKeyStorage.get((apiKey) => {
      if (typeof apiKey === 'undefined') {
        // Set apiKey value as ''
        apiKeyStorage.set('', () => {
          setupApiKey('');
        });
      } else {
        setupApiKey(apiKey);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', restoreApiKey);
})();
