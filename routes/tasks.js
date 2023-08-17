const express = require("express");

const router = express.Router();

router.get("/list", (req, res, next) => {
    res.status(200).json([
        { name: "File ITR", expiry: 10 },
        { name: "Terminate EC@ instance", expiry: 2 },
    ]);
});

module.exports = router;
