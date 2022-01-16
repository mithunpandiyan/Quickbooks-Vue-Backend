const router = require("express").Router();

router.use("/customer", require("./customer.js"));
router.use("/allsales", require("./allsales.js"));
router.use("/invoice", require("./invoice.js"));
router.use("/gstComplaintInvoice", require("./gstComplaintInvoice.js"));



module.exports = router;
