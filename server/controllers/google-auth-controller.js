const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { getTokens } = require("../actions/google-auth-actions");
const {
  GOOGLE_AUTH,
  SERVER_URL,
  JWT_SECRET,
  COOKIE_NAME,
  CLIENT_URL,
} = require("../config");

const redirectURI = "api/auth/google/code";

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
  console.log("stringified:", `${rootUrl}?${queryString.stringify(options)}`);
  return res.send(`${rootUrl}?${queryString.stringify(options)}`);
};

const getGoogleUserWithCode = async (req, res, next) => {
  const code = req.query.code;
  const { id_token, access_token } = await getTokens({
    code,
    clientId: GOOGLE_AUTH.CLIENT_ID,
    clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
    redirectUri: `${SERVER_URL}/${redirectURI}`,
  });

  // Fetch the user's profile with the access token and bearer
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });

  const token = jwt.sign(googleUser, JWT_SECRET);

  res.cookie(COOKIE_NAME, token, {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
  });

  res.redirect(CLIENT_URL);
};

exports.getGoogleAuthUrl = getGoogleAuthUrl;
exports.getGoogleUserWithCode = getGoogleUserWithCode;
