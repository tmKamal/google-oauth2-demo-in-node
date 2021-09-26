module.exports = {
  PORT: process.env.PORT,
  GOOGLE_AUTH: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  CLIENT_URL:process.env.CLIENT_URL,
  SERVER_URL:process.env.SERVER_URL,
  JWT_SECRET:process.env.JWT_SECRET,
  COOKIE_NAME:process.env.COOKIE_NAME,
  PUBLIC_COOKIE_NAME:process.env.PUBLIC_COOKIE_NAME
  
};
