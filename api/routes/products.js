import express from "express";
import axios from "axios";
import NodeCache from "node-cache";

const router = express.Router();
const jsonServerUrl = "http://localhost:4000";

// Cache - expires every 10 minutes
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const createProductWithScore = (product) => {
  let score = 0;
  product.characteristics?.forEach((c) => {
    if (
      c === "Humane" ||
      c === "Locally Produced" ||
      c === "Healthy" ||
      c === "Vegan"
    ) {
      score++;
    } else if (c === "Plastic-Free") {
      score += 2;
    } else if (c === "Unhealthy" || c === "Wasteful") {
      score--;
    }
  });

  return {
    product,
    score,
  };
};

// Middleware to fetch and cache products
const fetchProductsWithScores = async (req, res, next) => {
  try {
    const cachedProducts = cache.get("products");

    if (cachedProducts) {
      console.log("Serving from cache..."); //future todo: instead of console.log  using observability tool and only use for debug/dev environments not for prod
      req.products = cachedProducts;
    } else {
      console.log("Fetching from API..."); //future todo: instead of console.log  using observability tool and only use for debug/dev environments not for prod
      const response = await axios.get(`${jsonServerUrl}/products`);
      const products = response.data?.map(createProductWithScore);

      cache.set("products", products);
      //Future TODO: pagination of req.products so request isn't overloadded with data
      req.products = products;
    }

    next();
  } catch (error) {
    //Future TODO: using observability tool to track errors and response statuses instead of console.log
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
};

// Route to get all products with scores
router.get("/scores", fetchProductsWithScores, (req, res) => {
  res.status(200).json(req.products);
});

// Route to get filtered products
router.get("/", fetchProductsWithScores, (req, res) => {
  const queryString = req.query.characteristic;
  const characteristics = queryString && queryString.split(",");

  let products = req.products?.map((productWithScore) => ({
    ...productWithScore,
    characteristics:
      productWithScore.product.characteristics?.map((item) =>
        item.toLowerCase()
      ) || [],
  }));

  if (characteristics.length > 0) {
    products = products?.filter((product) =>
      characteristics.every((c) => product.characteristics?.includes(c))
    );
  }

  res.status(200).json(products);
});

export default router;
