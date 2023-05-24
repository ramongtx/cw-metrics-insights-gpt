# CloudWatch Metrics Insights ChatGPT 

## Features

- Chrome extension that generates CloudWatch Metrics Insights queries from ChatGPT prompts
- Simply input message you want to ask and type 'Convert to query' button to get MetricsInisghts query

![Demo](./images/demo.gif)

## Install
* Clone this repo
* run `npm install && npm run build`
* Open `chrome://extensions`
* Enable the "Developer mode" toggle 
* Click on the "Load unpacked" button
* Select the folder <project_root>/build

## How to Use
* Go to [OpenAI](https://platform.openai.com/account/api-keys) and create an API key
    * Please notice this is only support via ChatGTP  Plus/4.0 version
* Pin the extension to your chrome tab and click
* Enter the API key you get after you subscribed ChatGPT Plus
* Open AWS/CW Metrics and select Query
* You then can type the human-readable message and click the button 'Convert to query' 


---

This project was bootstrapped with [Chrome Extension CLI](https://github.com/dutiyesh/chrome-extension-cli)

