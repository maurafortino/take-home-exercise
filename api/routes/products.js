import express from "express";
import axios from "axios";

const router = express.Router();
const jsonServerUrl = "http://localhost:4000"; // Adjust if necessary
function ProductWithScore(product, score) {
  this.product = product;
  this.score = score;
}
// Route to get all posts from JSON Server
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${jsonServerUrl}/products`);

    res.send(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

router.get("/products", async (req, res) => {
  const characteristic = req.query.characteristic?.toLowerCase();

  try {
    const response = await axios.get(`${jsonServerUrl}/products`);

    let products = response.data;

    //convert each characteristic to lowercase so that it will match the query param
    products = products.map((product) => ({
      ...product,
      characteristics:
        product.characteristics?.map((item) => item.toLowerCase()) || [],
    }));

    if (characteristic) {
      products = products?.filter((product) => {
        return product.characteristics?.includes(characteristic);
      });
    }
    res.send(products);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

router.get("/products/scores", async (req, res) => {
  try {
    const response = await axios.get(`${jsonServerUrl}/products`);
    const products = response.data;
    let productsWithScore = [];
    products?.forEach((product) => {
      let score = 0;
      product.characteristics?.forEach((c) => {
        if (c === "Humane" || c === "Locally Produced" || c === "Healthy") {
          score++;
        } else if (c === "Plastic-Free") {
          score += 2;
        } else {
          score--;
        }
      });
      productsWithScore.push(new ProductWithScore(product, score));
    });
    res.send(productsWithScore);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

export default router;
