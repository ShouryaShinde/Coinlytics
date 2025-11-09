import express from "express" ;
import bodyparser from "body-parser" ;
import path from "path";
import fs from "fs";
import axios from "axios" ;
import dotenv from "dotenv";
dotenv.config();


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
      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"),
      axios.get("https://api.alternative.me/fng/"),
      axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin")
    ]) ;
    const global = globalRes?.data?.data || {};
    const coin = coinsRes.data ;
    const trend = trendingRes.data ;
    const fng = fngRes.data.data[0] ;
    const btcData = btcRes.data[0]
    res.render("index.ejs" , {global , coin , trend , fng , btcData}) ;
  }  catch(error) {
    console.log("Error")
    res.render("index.ejs" , {global : {} , coin : [] , trend : {} , fng : {} , btcData : {}})
  }
});

app.get("/searchcoin" , async(req , res)=> {
  try {
    const query = req.query.coin_name ;
    const coin = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`) ;
    res.render("coinsearch.ejs" , {coindata : coin.data.coins , searchText : query}) ;
  } catch(error) {
    const query = req.query.coin_name ;
    console.error("Error searching:", error.message);
    res.render("coinsearch.ejs", { coindata : [], searchText : query});
  }
});

app.get("/coin/:id" , async(req ,res) => {
  try {
    const coinId = req.params.id ;
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`) ;
    const coinData = response.data ;
    res.render("coin.ejs" , {coin : coinData[0]}) ;
  } catch(error) {
    console.error("Error searching:", error.message);
    res.render("coin.ejs", { coin : []});
  }
});

app.get("/news" , async(req,res) => {
  try{
    const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&q=cryptocurrency&language=en`) ;
    const newsData = response.data.results ;
    res.render("news.ejs" , {news : newsData})
  } catch(error) {
    console.log("Error getting News updates :" , error.message) ;
    res.render("news.ejs" , {news : []}) ;
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));