const router = require("express").Router();
const jwt = require("jsonwebtoken");
const sql = require("../../db/connection.js");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const results = await sql(`select * from user where username = ?`, [
      username,
    ]);

    if (results && results.length) {
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
        "user":results[0],
        token
      });
    }
    throw new Error("Unable to login!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await sql(`select * from user where id =${id}`);
   if(results){
     return res.send(results[0])
   }
  } catch (err) {
    res.status(400).send(err.message);
  }
});
module.exports = router;
