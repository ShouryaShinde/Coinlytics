import express from "express" ;
import bodyparser from "body-parser" ;
import path from "path";
import fs from "fs";
import axios from "axios" ;

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/" , async (req,res)=> {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/global") ;
    const result = response.data ;
    res.render("index.ejs" , {data : result.data}) ;
  }  catch(error) {
    console.log("Error")
    res.render("index.ejs" , {data : null})
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));