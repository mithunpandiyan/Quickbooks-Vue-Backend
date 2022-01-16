const router = require("express").Router();

router.use("/inventory", require("./inventory.js"));
router.use("/noninventory", require("./noninventory.js"));
router.use("/service", require("./service.js"));
router.use("/bundle", require("./bundle.js"));


module.exports = router;
