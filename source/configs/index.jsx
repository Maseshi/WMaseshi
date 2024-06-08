import languages from './languages.json'

const configs = {
  SERVER: {
    API_KEY: import.meta.env.VITE_API_KEY,
    AUTH_DOMAIN: import.meta.env.VITE_AUTH_DOMAIN,
    DATABASE_URL: import.meta.env.VITE_DATABSE_URL,
    PROJECT_ID: import.meta.env.VITE_PROJECT_ID,
    STORAGE_BUCKET: import.meta.env.VITE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: import.meta.env.VITE_MESSAGING_SENDER_ID,
    APP_ID: import.meta.env.VITE_APP_ID,
    MEASUREMENT_ID: import.meta.env.VITE_MEASUREMENT_ID
  },
  SMTP: {
    HOST: import.meta.env.VITE_SMTP_HOST,
    PORT: import.meta.env.VITE_SMTP_PORT,
    USERNAME: import.meta.env.VITE_SMTP_USERNAME,
    PASSWORD: import.meta.env.VITE_SMTP_PASSWORD
  },
  RECAPTCHA_V3_PROVIDER: import.meta.env.VITE_RECAPTCHA_V3_PROVIDER,
  OCTOKIT: import.meta.env.VITE_OCTOKIT,
  HF_ACCESS_TOKEN: import.meta.env.VITE_HF_ACCESS_TOKEN,
  LANGUAGES: languages,
  SITE: {
    NAME: "Maseshi",
    URL: 'https://maseshi.web.app',
    COPYRIGHTS: "Chaiwat Suwannarat",
    EMAIL: "dermhioasw123@gmail.com",
    PHONE: "+66835254110",
    PRONUNCIATION: "マセし",
    SOCIAL_MEDIA: {
      GITHUB: 'Maseshi',
      FACEBOOK: 'maseshi2005',
      INSTAGRAM: 'maseshi2005',
      X: 'maseshi2005',
      GOOGLE: 'maseshi'
    },
    PRIVACY_POLICY: {
      LAST_CHANGE: '2021/01/10',
      EFFECTIVE: '2021/02/01'
    },
    TERMS_OF_SERVICE: {
      LAST_CHANGE: '2021/01/10',
      EFFECTIVE: '2021/02/01'
    }
  }
}

export default configs
