const router = require("express").Router();
const sql = require("../../db/connection.js");

router.get("/", async (req, res) => {
  try {
    const results = await sql(`select * from expense`);
    if (results) return res.send(results);
    throw new Error("Couldn't get expense Data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await sql(`select * from expense where user_id = ?`, [
      user_id,
    ]);
    if (results) return res.send(results);
    throw new Error("Couldn't get expense Data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await sql(`INSERT into expense SET ?`, [req.body]);
    return res.send("added expense successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`Update expense SET ? where ID = ?`, [req.body, ID]);
    return res.send(`updated id:${ID} successfully!!`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`DELETE from expense WHERE ID = ?`, [ID]);
    return res.send(`Deleted id:${ID} successfully!!`);
  } catch {
    res.status(400).send(err.message);
  }
});

module.exports = router;
