# ProvrWebsite

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/ProVR-Norway/ProvrWebsite.svg)](https://GitHub.com/Naereen/StrapDown.js/issues/)
[![GitHub stars](https://img.shields.io/github/stars/ProVR-Norway/ProvrWebsite.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/Naereen/StrapDown.js/stargazers/)

## 🧑‍💻 Usage 

### 🛫 Running the web application locally
`ng serve`

### 🤖 Running the protractor test cases
`ng e2e`

## ❗️ Notice

In local development the application must listen on port 4200. If not, the CORS policy on Google Cloud Storage for the bucket used must be updated. Make changes to the `cors-config.json` and type this command in the terminal `gsutil cors set cors-config.json gs://BUCKET_NAME` to update the policy.

## 🚀 Deployment

This Angular webiste is deployed to App Engine and is available here 👉 [ProVR Website](https://vr-collaboration-room.ey.r.appspot.com)

It is automatically deployed each time a push is made to the master branch. We use Google Cloud Build to make this possible, which is a CI/CD service on GCP. The `app.yaml` and `cloudbuild.yaml` files are used to configure this deployment.

## 🚨 CORS policy

When browsers comminicate with external servers they send a CORS preflight request in advance of the actual POST, GET or DELETE, etc. request. This policy needs to be configured explicitly on the bucket `user-cad-models` in Google Cloud Storage. This is the tutorial we used 👉 [CORS Config GCS](https://cloud.google.com/storage/docs/configuring-cors). 

> The JSON file used to configure the CORS policy is found in this repository under the name `cors-config.json`.

## 📚 Documentation

The complete documentation of the website can be found here 👉 https://provr-norway.github.io


