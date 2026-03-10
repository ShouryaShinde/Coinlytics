import express from "express";
import path from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

let cache = {
  global: null,
  coin: [],
  trend: [],
  fng: null,
  btcData: null,
  lastFetch: 0
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes


async function fetchCryptoData() {

  const now = Date.now();

  if (cache.lastFetch && (now - cache.lastFetch < CACHE_DURATION)) {
    return cache;
  }

  try {

    const [globalRes, coinsRes, trendingRes, fngRes, btcRes] = await Promise.all([

      axios.get("https://api.coingecko.com/api/v3/global"),

      axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1
        }
      }),

      axios.get("https://api.coingecko.com/api/v3/search/trending"),

      axios.get("https://api.alternative.me/fng/"),

      axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: "bitcoin"
        }
      })

    ]);

    cache = {
      global: globalRes?.data?.data || null,
      coin: coinsRes?.data || [],
      trend: trendingRes?.data?.coins || [],
      fng: fngRes?.data?.data?.[0] || null,
      btcData: btcRes?.data?.[0] || null,
      lastFetch: now
    };

    return cache;

  } catch (error) {

    console.error("API Fetch Error:", error.message);

    return cache;
  }

}


app.get("/", async (req, res) => {

  try {

    const data = await fetchCryptoData();

    res.render("index.ejs", {
      global: data.global || {},
      coin: data.coin || [],
      trend: data.trend || [],
      fng: data.fng || {},
      btcData: data.btcData || {}
    });

  } catch (error) {

    console.log("Error loading homepage:", error.message);

    res.render("index.ejs", {
      global: {},
      coin: [],
      trend: [],
      fng: {},
      btcData: {}
    });

  }

});


app.get("/searchcoin", async (req, res) => {

  try {

    const query = req.query.coin_name;

    const coin = await axios.get(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );

    res.render("coinsearch.ejs", {
      coindata: coin.data.coins,
      searchText: query
    });

  } catch (error) {

    console.error("Error searching:", error.message);

    res.render("coinsearch.ejs", {
      coindata: [],
      searchText: req.query.coin_name
    });

  }

});


app.get("/coin/:id", async (req, res) => {

  try {

    const coinId = req.params.id;

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          ids: coinId
        }
      }
    );

    res.render("coin.ejs", {
      coin: response.data[0] || {}
    });

  } catch (error) {

    console.error("Error getting coin:", error.message);

    res.render("coin.ejs", {
      coin: {}
    });

  }

});


app.get("/news", async (req, res) => {

  try {

    if (!process.env.NEWS_API_KEY) {
      throw new Error("NEWS_API_KEY not set");
    }

    const response = await axios.get(
      `https://newsdata.io/api/1/news`,
      {
        params: {
          apikey: process.env.NEWS_API_KEY,
          q: "cryptocurrency",
          language: "en"
        }
      }
    );

    res.render("news.ejs", {
      news: response.data.results || []
    });

  } catch (error) {

    console.log("Error getting News updates:", error.message);

    res.render("news.ejs", {
      news: []
    });

  }

});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});