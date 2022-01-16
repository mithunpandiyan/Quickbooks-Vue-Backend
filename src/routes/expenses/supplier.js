const router = require("express").Router();
const sql = require("../../db/connection.js");

router.get("/", async (req, res) => {
  try {
    const results = await sql(`select * from supplier`);
    if (results) return res.send(results);
    throw new Error("Couldn't get supplier Data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await sql(`select * from supplier where user_id = ?`, [
      user_id,
    ]);
    if (results) return res.send(results);
    throw new Error("Couldn't get supplier Data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await sql(`INSERT into supplier SET ?`, [req.body]);
    return res.send("added supplier successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`Update supplier SET ? where ID = ?`, [req.body, ID]);
    return res.send(`updated id:${ID} successfully!!`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`DELETE from supplier WHERE ID = ?`, [ID]);
    return res.send(`Deleted id:${ID} successfully!!`);
  } catch {
    res.status(400).send(err.message);
  }
});

module.exports = router;
