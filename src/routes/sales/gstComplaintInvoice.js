const router = require("express").Router();
const sql = require("../../db/connection.js");

router.get("/", async (req, res) => {
  try {
    const results = await sql(`select * from gst_complaint_invoice`);
    if (results) return res.send(results);
    throw new Error("Couldn't get invoices data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    const results = await sql(
      `select * from gst_complaint_invoice where user_id = ?`,
      [user_id]
    );
    if (results) return res.send(results);
    throw new Error("Couldn't get invoices data");
  } catch {
    res.status(400).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    await sql(`insert into gst_complaint_invoice SET ?`, [req.body]);
    return res.send("added gst_complaint_invoice successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const user_id = req.params.id;
  try {
    await sql(`Update gst_complaint_invoice SET ?  where user_id = ?`, [
      req.body,
      user_id,
    ]);
    return res.send("Updated gst_complaint_invoice successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    await sql(`DELETE from gst_complaint_invoice WHERE user_id = ?`, [
      user_id,
    ]);
    return res.send("Deleted Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
