const router = require("express").Router();
const sql = require("../../db/connection.js");

router.get("/", async (req, res) => {
  try {
    const results = await sql(`select * from sales_invoices`);
    if (results) return res.send(results);
    throw new Error("Couldn't get invoices data");
  } catch (err){
    res.status(400).send(err.message);
  }
});

router.get("/datatable/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await sql(
    `select * from mydb.sales_invoices where user_id = ?`,
      [user_id]
    );
    
    if (results) return res.send(results);
    throw new Error("Couldn't get inventory Data");
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await sql(
      `select * from sales_invoices where user_id = ?`,
      [user_id]
    );
    if (results) return res.send(results);
    throw new Error("Couldn't get invoices data");
  } catch (err){
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    await sql(`INSERT into sales_invoices SET ?`, [req.body]);
    return res.send("added sales_invoices successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`Update sales_invoices SET ? where ID = ?`, [req.body, ID]);
    return res.send("Updated sales_invoices successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`DELETE from sales_invoices WHERE ID = ?`, [ID]);
    return res.send("Deleted sales_invoice successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
