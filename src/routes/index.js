const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to thinkBooks" });
});

router.use("/login", require("./login"));
router.use("/register", require("./register"));
router.use("/sales", require("./sales"));
router.use("/products", require("./products"));
router.use("/expenses", require("./expenses"));
router.use("/fileUpload", require("./fileUpload"));

module.exports = router;
