import languages from './languages.json'

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  SERVER: {
    API_KEY: process.env.REACT_APP_API_KEY,
    AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    DATABASE_URL: process.env.REACT_APP_DATABASE_URL,
    PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
    APP_ID: process.env.REACT_APP_APP_ID,
    MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID
  },
  RECAPTCHA_V3_PROVIDER: process.env.REACT_APP_RECAPTCHA_V3_PROVIDER,
  OCTOKIT: process.env.REACT_APP_OCTOKIT,
  HF_ACCESS_TOKEN: process.env.REACT_APP_HF_ACCESS_TOKEN,
  LANGUAGES: languages
}
