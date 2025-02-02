import express from "express";
import axios from "axios";

const router = express.Router();
const jsonServerUrl = "http://localhost:4000"; // Adjust if necessary

// Route to get all posts from JSON Server
router.get("/", async (req, res) => {
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

export default router;
