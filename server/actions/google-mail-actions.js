const { google } = require("googleapis");

const makeBody = (to, from, subject, message) => {
  var str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ",
    to,
    "\n",
    "from: ",
    from,
    "\n",
    "subject: ",
    subject,
    "\n\n",
    message,
  ].join("");

  var encodedMail = new Buffer(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return encodedMail;
};

const sendMessage = (auth, emailFields) => {
  const gmail = google.gmail({ version: "v1", auth });
  var raw = makeBody(
    emailFields.to,
    emailFields.from,
    emailFields.subject,
    emailFields.message
  );
  gmail.users.messages.send(
    {
      auth: auth,
      userId: "me",
      resource: {
        raw: raw,
      },
    },
    function (err, response) {
      return err || response;
    }
  );
};

const createDraft = (auth, emailFields) => {
  const gmail = google.gmail({ version: "v1", auth });
  var raw = makeBody(
    emailFields.to,
    emailFields.from,
    emailFields.subject,
    emailFields.message
  );
  console.log("email fields:", emailFields);
  gmail.users.drafts.create(
    {
      auth: auth,
      userId: "me",
      resource: {
        message: {
          raw: raw,
        },
      },
    },
    function (err, response) {
      console.log("msg:", err || response);
      return err || response;
    }
  );
};

exports.sendMessage = sendMessage;
exports.createDraft = createDraft;
