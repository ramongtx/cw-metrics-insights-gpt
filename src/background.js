'use strict';

const { PROMPT_SUFFIX, PROMPT_PREFIX } = require("./constants");
const browser = require("webextension-polyfill");
const { getApiKey } = require('./storage');

require("regenerator-runtime/runtime");

async function requestPrompt(apiKey, prompt) {
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
  return responseJson;
}

browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'QUERY') {
    const apiKey = await getApiKey();
    const userQuery = request.payload.query;

    const prompt = `${PROMPT_PREFIX} ${userQuery} ${PROMPT_SUFFIX}`;

    const responseJson = await requestPrompt(apiKey, prompt);
    console.log("Prepared response", responseJson);
    sendResponse(responseJson);
    console.log("Sent response", responseJson);
    return responseJson;
  }
  return false;
});
