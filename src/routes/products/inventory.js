const router = require("express").Router();
const sql = require("../../db/connection.js");

router.get("/", async (req, res) => {
  try {
    const results = await sql(`select * from sales_products_inventory`);
    if (results) return res.send(results);
    throw new Error("Couldn't get inventory Data");
  } catch (err){
    res.status(400).send(err.message);
  }
});

router.get("/datatable/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await sql(
    `select ID,name,sku,hsn_sac,type,description,sales_price,cost,initial_quantity,created_at from sales_products_inventory
    union all
    select ID,name,sku,hsn_sac,type,description,sales_price,cost,initial_quantity,created_at from sales_products_service
    union all
    select ID,name,sku,hsn_sac,type,description,sales_price,cost,initial_quantity,created_at from sales_products_non_inventory
    union all
    select ID,name,sku,hsn_sac,type,description,sales_price,cost,initial_quantity,created_at from sales_products_bundle order by created_at`,
      [user_id]
    );
    // console.log(results)
    if (results) return res.send(results);
    throw new Error("Couldn't get inventory Data");
  } catch(err) {
    res.status(400).send(err.message);
  }
});

router.get("/:ID", async (req, res) => {
  try {
    const results = await sql(
      `select * from sales_products_inventory where ID = ?`,
      [req.params.ID]
    );
    if (results) return res.send(results);
    throw new Error("Couldn't get inventory Data");
  } catch (err){
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await sql(`INSERT into sales_products_inventory SET ?`, [
      req.body,
    ]);
    return res.send("added inventory successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await sql(`Update sales_products_inventory SET ? where ID = ?`, [
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
    await sql(`DELETE from sales_products_inventory WHERE ID = ?`, [ID]);
    return res.send(`Deleted id:${ID} successfully!!`);
  } catch (err){
    res.status(400).send(err.message);
  }
});

router.delete("/:type/:id", async (req, res) => {
  const ID = req.params.id;
  const type = req.params.type;
  try {
    await sql(`DELETE from sales_products_${type.toLowerCase()} WHERE ID = ?`, [
      ID,
    ]);
     return res.send(`Deleted id:${ID} successfully!!`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


module.exports = router;
