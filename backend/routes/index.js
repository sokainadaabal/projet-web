const express=require('express')
const router =express.Router()
var path = require('path');


/* GET Article. */
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

module.exports = router;
