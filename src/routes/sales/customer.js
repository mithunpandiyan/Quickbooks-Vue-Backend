const { type } = require("express/lib/response");
const sql = require("../../db/connection.js");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const results = await sql(`select * from sales_customer`);
    if (results) return res.send(results);
    throw new Error("Couldn't get customers data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await sql(
      `select * from sales_customer where user_id = ?`,
      [user_id]
    );
    if (results) return res.send(results);
    throw new Error("Couldn't get customer data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await sql(`INSERT into sales_customer SET ?`, [req.body]);
    return res.send("Customer added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`Update sales_customer SET ? where ID= ?`, [req.body, ID]);
    return res.send(`updated id:${ID} successfully!!`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`DELETE from sales_customer WHERE ID = ?`, [ID]);
    return res.send(`Deleted id:${ID} successfully!!`);
  } catch {
    res.status(400).send(err.message);
  }
});

module.exports = router;
