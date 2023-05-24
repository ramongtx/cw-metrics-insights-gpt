'use strict';
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios").default;
const fetchAdapter = require("@vespaiach/axios-fetch-adapter").default;
require("regenerator-runtime/runtime");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'QUERY') {
    chrome.storage.sync.get(['apiKey'], (result) => {
      const apiKey = result.apiKey;

      console.log("q", request.payload.query);
      console.log("k", apiKey);
      const configuration = new Configuration({
        apiKey: apiKey,
      });
      const instance = axios.create({
        adapter: fetchAdapter
      });
      const openai = new OpenAIApi(configuration, undefined, instance);
      const prompt = `Translate this to CloudWatch Metrics Insights query language: ${request.payload.query}`;

      const openAiRequest = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Translate this to CloudWatch Metrics Insights query language: ${request.payload.query}. Respond with only the query.`,
          }
        ],
        temperature: 0.5,
        max_tokens: 1000
      };
      openai.createChatCompletion(openAiRequest).then((data) => {
        sendResponse({ message: data.data.choices[0].message.content, prompt });
      });
    });
  }
  return true;
});
