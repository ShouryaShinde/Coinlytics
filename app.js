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
    const [globalRes , coinsRes , trendingRes , fngRes , btcRes] = await Promise.all ([
      axios.get("https://api.coingecko.com/api/v3/global") ,
      axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      }),
      axios.get("https://api.coingecko.com/api/v3/search/trending"),
      axios.get("https://api.alternative.me/fng/"),
      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin")
    ]) ;
    const global = globalRes.data.data ;
    const coin = coinsRes.data ;
    const trend = trendingRes.data ;
    const fng = fngRes.data.data[0] ;
    const btcData = btcRes.data[0]
    res.render("index.ejs" , {global , coin , trend , fng , btcData}) ;
  }  catch(error) {
    console.log("Error")
    res.render("index.ejs" , {global : null , coin : [] , trend : [] , fng : [] , btcData : []})
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));