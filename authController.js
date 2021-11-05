const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .writeHead(400, { "Content-Type": "text/html" })
          .end("<span>Пользователь уже существует</span>");
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res
        .writeHead(200, { "Content-Type": "text/html" })
        .end("<span>Регистрация прошла успешно</span>");
    } catch (e) {
      console.log(e);
      res
        .writeHead(400, { "Content-Type": "text/html" })
        .end("<span>Ошибка регистрации</span>");
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .writeHead(400, { "Content-Type": "text/html" })
          .end("<span>Пользователь не найден</span>");
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .writeHead(400, { "Content-Type": "text/html" })
          .end("<span>Введен неверный пароль</span>");
      }
      const token = generateAccessToken(user._id, user.roles);
      return token, res.writeHead(200, { "Content-Type": "text/html" }).end("");
    } catch (e) {
      console.log(e);
      res
        .writeHead(400, { "Content-Type": "text/html" })
        .end("<span>Ошибка входа</span>");
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
