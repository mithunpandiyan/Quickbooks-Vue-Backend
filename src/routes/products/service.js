const router = require("express").Router();
const sql = require("../../db/connection.js");

router.get("/", async (req, res) => {
  try {
    const results = await sql(`select * from sales_products_service`);
    if (results) return res.send(results);
    throw new Error("Couldn't get service Data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await sql(
      `select * from sales_products_service where user_id = ?`,
      [user_id]
    );
    if (results) return res.send(results);
    throw new Error("Couldn't get service Data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.get("/:ID", async (req, res) => {
  try {
    const results = await sql(
      `select * from sales_products_service where ID = ?`,
      [req.params.ID]
    );
    if (results) return res.send(results);
    throw new Error("Couldn't get service Data");
  } catch (err){
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await sql(`INSERT into sales_products_service SET ?`, [req.body]);
    return res.send("added service successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`Update sales_products_service SET ? where ID = ?`, [
      req.body,
      ID,
    ]);
    return res.send(`updated id:${ID} successfully!!`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`DELETE from sales_products_service WHERE ID = ?`, [ID]);
    return res.send(`Deleted id:${ID} successfully!!`);
  } catch {
    res.status(400).send(err.message);
  }
});

module.exports = router;
