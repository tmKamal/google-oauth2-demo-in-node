const queryString = require('query-string');
const {GOOGLE_AUTH, SERVER_URL } = require('../config');

const redirectURI = "api/auth/google";

const getGoogleAuthUrl = (req, res, next) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_URL}/${redirectURI}`,
    client_id: GOOGLE_AUTH.CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  console.log('stringified:',`${rootUrl}?${queryString.stringify(options)}`);
  return res.send(`${rootUrl}?${queryString.stringify(options)}`);
};

exports.getGoogleAuthUrl = getGoogleAuthUrl;
