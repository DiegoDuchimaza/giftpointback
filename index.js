const express = require("express");

const app = express();

app.use("/test", (req, res) =>{
    res.status(200).send("received request");
})

app.listen(3000);