const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (res, req, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .writeHead(403, { "Content-Type": "text/html" })
        .end("<span>Пользователь не авторизован</span>");
    }

    const decodedData = jwt.verify(token, secret);
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res
      .writeHead(403, { "Content-Type": "text/html" })
      .end("<span>Пользователь не авторизован</span>");
  }
};
