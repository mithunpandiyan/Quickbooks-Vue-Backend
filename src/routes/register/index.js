const router = require("express").Router();
const bycrypt = require("bcryptjs");
const sql = require("../../db/connection.js");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bycrypt.hashSync(password, 10);
    if (username && email && password && hashedPassword) {
      const results = await sql(
        `select username from user where username = ? or email = ?`,
        [username, email]
      );
      if (!results.length) {
        const response = await sql(
          `insert into user (username, email, password) values (?, ?, ?)`,
          [username, email, hashedPassword]
        );
        const token = jwt.sign(
          {
            id: results.id,
            email: results.email,
          },
          process.env.JWTSECRET,
          {
            algorithm: "HS256",
            expiresIn: 43200,
          }
        );
        if (token) return res.send({
          "user":response[0],
          token
        });
        if(response){
          return res.send("Success")
        }
      }
    }
    throw new Error("Unable to register!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
