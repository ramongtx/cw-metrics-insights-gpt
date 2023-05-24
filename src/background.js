'use strict';

require("regenerator-runtime/runtime");

async function requestPrompt(apiKey, prompt, callback) {
  const openAiRequest = {
    model: "gpt-3.5-turbo",
    prompt,
    temperature: 0.5,
    max_tokens: 1000,
  };
  const response = await fetch('https://api.openai.com/v1/completions',
    {
        body: JSON.stringify(openAiRequest),
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer  ${apiKey}`,
        },
    });
  const responseJson = await response.json();
  console.log(responseJson);
  callback(responseJson);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'QUERY') {
    chrome.storage.sync.get(['apiKey'], (result) => {
      const apiKey = result.apiKey;
      const userQuery = request.payload.query;

      console.log("q", userQuery);
      console.log("k", apiKey);

      const prompt = `Translate this to CloudWatch Metrics Insights query language: ${userQuery}. Respond with only the query.`;

      requestPrompt(apiKey, prompt, (responseJson) => {
        sendResponse(responseJson);
      });
    });
  }
  return true;
});
