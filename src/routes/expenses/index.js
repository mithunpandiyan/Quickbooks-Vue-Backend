const router = require("express").Router();

router.use("/expense", require("./expense.js"));
router.use("/supplier", require("./supplier.js"));

module.exports = router;
