'use strict';

const { PROMPT_SUBFIX, PROMPT_PREFIX } = require("./constants");

require("regenerator-runtime/runtime");

async function requestPrompt(apiKey, prompt, callback) {
  const openAiRequest = {
    model: "gpt-3.5-turbo",
    messages: [
        {
            role: "user",
            content: prompt
        }
    ],
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: false,
    max_tokens: 250,
    presence_penalty: 0,
    frequency_penalty: 0
  };
  const response = await fetch('https://api.openai.com/v1/chat/completions',
    {
        body: JSON.stringify(openAiRequest),
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer  ${apiKey}`,
        },
    });
  const responseJson = await response.json();
  callback(responseJson);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'QUERY') {
    chrome.storage.sync.get(['apiKey'], (result) => {
      const apiKey = result.apiKey;
      const userQuery = request.payload.query;

      const prompt = `${PROMPT_PREFIX} ${userQuery} ${PROMPT_SUBFIX}`;

      requestPrompt(apiKey, prompt, (responseJson) => {
        sendResponse(responseJson);
      });
    });
  }
  return true;
});
