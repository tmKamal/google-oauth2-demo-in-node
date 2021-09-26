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
  PUBLIC_COOKIE_NAME,
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
      "https://mail.google.com/",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.compose",
      "https://www.googleapis.com/auth/gmail.send",
    ].join(" "),
  };
  console.log("stringified google consent url:", `${rootUrl}?${queryString.stringify(options)}`);
  return res.send(`${rootUrl}?${queryString.stringify(options)}`);
};

const getGoogleUserWithCode = async (req, res, next) => {
  const code = req.query.code;
  const gTokenResponse = await getTokens({
    code,
    clientId: GOOGLE_AUTH.CLIENT_ID,
    clientSecret: GOOGLE_AUTH.CLIENT_SECRET,
    redirectUri: `${SERVER_URL}/${redirectURI}`,
  });
  console.log("full Response:", gTokenResponse);
  // Fetch the user's profile with the access_token and id_token - (without using googleapis npm library)
  const googleUser = await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${gTokenResponse.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${gTokenResponse.id_token}`,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });

  const combinedToken = { token: gTokenResponse, googleUser };
  const token = jwt.sign(combinedToken, JWT_SECRET);

  res.cookie(PUBLIC_COOKIE_NAME, "Auth_Passed", {
    maxAge: 355000,
    httpOnly: false,
    secure: false,
  });

  res.cookie(COOKIE_NAME, token, {
    maxAge: 358000,
    httpOnly: true,
    secure: false,
  });

  res.redirect(CLIENT_URL);
};

const verifyUser = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies[COOKIE_NAME], JWT_SECRET);
    console.log("decoded", decoded);
    return res.send(decoded.googleUser);
  } catch (err) {
    console.log(err);
    res.send(null);
  }
};

exports.getGoogleAuthUrl = getGoogleAuthUrl;
exports.getGoogleUserWithCode = getGoogleUserWithCode;
exports.verifyUser = verifyUser;
