import express from "express" ;
import bodyparser from "body-parser" ;
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/" , (req,res)=> {
  res.render("index.ejs") ;
})


app.listen(port, () => console.log(`Listening on port ${port}`));