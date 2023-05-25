const browser = require("webextension-polyfill");

export async function getApiKey() {
  const response = await browser.storage.sync.get(['apiKey']);
  return response.apiKey;
}

export async function setApiKey(apiKey) {
  return browser.storage.sync.set({ apiKey });
}
