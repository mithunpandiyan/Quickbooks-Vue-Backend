const router = require("express").Router();
const sql = require("../../db/connection.js");

router.get("/", async (req, res) => {
  try {
    const results = await sql(`select * from sales_products_non_inventory`);
    if (results) return res.send(results);
    throw new Error("Couldn't get non-inventory Data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.get("/:ID", async (req, res) => {
  try {
    const results = await sql(
      `select * from sales_products_non_inventory where ID = ?`,
      [req.params.ID]
    );
    if (results) return res.send(results);
    throw new Error("Couldn't get non-inventory Data");
  } catch (err){
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await sql(`INSERT into sales_products_non_inventory SET ?`, [req.body]);
    return res.send("added non-inventory successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`Update sales_products_non_inventory SET ? where ID = ?`, [
      req.body,
      ID,
    ]);
    return res.send(`updated id:${ID} successfully!!`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:type/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`DELETE from sales_products_non_inventory WHERE ID = ?`, [
      ID,
    ]);
    return res.send(`Deleted id:${ID} successfully!!`);
  } catch {
    res.status(400).send(err.message);
  }
});

module.exports = router;
