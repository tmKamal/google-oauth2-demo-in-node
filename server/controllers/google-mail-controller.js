const { google } = require("googleapis");
const {
  getTokenViaHttpCookie,
} = require("../actions/google-auth-actions");
const {
  GOOGLE_AUTH,
  SERVER_URL,
  COOKIE_NAME,
} = require("../config");

const { sendMessage, createDraft } = require("../actions/google-mail-actions");

const redirectURI = "api/auth/google/code";

const sendMail = (req, res, next) => {
  const emailFields = req.body;
  // verify user
  const userToken = getTokenViaHttpCookie(req.cookies[COOKIE_NAME]);
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_AUTH.CLIENT_ID,
    GOOGLE_AUTH.CLIENT_SECRET,
    `${SERVER_URL}/${redirectURI}`
  );
  
  if (userToken && userToken.token) {
    oauth2Client.setCredentials(userToken.token);
    const mailResponse = sendMessage(oauth2Client, emailFields);
    res.status(201).json({ response: mailResponse });
  } else {
    res.status(500).json({ error: "Your session has expired" });
  }
};

const createDraftMail = (req, res, next) => {
  const emailFields = req.body;
  // verify user
  const userToken = getTokenViaHttpCookie(req.cookies[COOKIE_NAME]);

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_AUTH.CLIENT_ID,
    GOOGLE_AUTH.CLIENT_SECRET,
    `${SERVER_URL}/${redirectURI}`
  );
  if (userToken && userToken.token) {
    oauth2Client.setCredentials(userToken.token);
    const mailResponse = createDraft(oauth2Client, emailFields);
    res.status(201).json({ response: mailResponse });
  } else {
    res.status(500).json({ response: "Your session has expired" });
  }
};


exports.sendMail = sendMail;
exports.createDraftMail = createDraftMail;
