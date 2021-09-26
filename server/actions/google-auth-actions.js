const axios = require("axios");
const queryString = require("query-string");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const getTokens = ({code, clientId, clientSecret, redirectUri}) => {
  // Uses the retrived code to get tokens that can be used to fetch the user's profile

  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };
  console.log(values);
  return new Promise(function (resolve, reject) {
    axios
      .post(url, queryString.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => resolve(res.data))
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`,error.message);
        reject(error)
        throw new Error(error.message);
      });
  });
};


const getTokenViaHttpCookie=(cookie)=>{
  try {
    const decodedToken = jwt.verify(cookie, JWT_SECRET);
    console.log("decoded", decodedToken);
    return decodedToken;
  } catch (err) {
    console.log(err);
    return null;
  }
}

exports.getTokens = getTokens;
exports.getTokenViaHttpCookie=getTokenViaHttpCookie;
