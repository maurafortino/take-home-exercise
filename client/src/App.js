import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import FilterMenu from "./components/FilterMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Product from "./components/Product";
import { Container, Alert } from "react-bootstrap";
import LoadingPage from "./pages/LoadingPage";
import ErrorPage from "./pages/ErrorPage";

const BASE_API_URL = "http://localhost:3005";

const App = () => {
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const hasSetFilters = useRef(false);
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let characteristicsArr = [
      "Unhealthy",
      "Healthy",
      "Wasteful",
      "Plastic-Free",
      "Vegan",
      "Humane",
      "Locally Produced",
    ];
    const filtersArr = [];
    characteristicsArr.forEach((characteristic) => {
      const filter = {
        name: characteristic,
        value: characteristic.toLowerCase(),
        checked: false,
      };
      filtersArr.push(filter);
    });
    setFilters(filtersArr);
    hasSetFilters.current = true;
  }, []);

  const fetchProducts = async (query, value) => {
    setIsLoading(true);
    try {
      if (query && value) {
        const response = await axios.get(
          `${BASE_API_URL}/products?${query}=${value}`
        );
        setProducts(response.data);
        setIsLoading(false);
      } else if (query) {
        <Alert variant="primary">
          You must include parameters with your query
        </Alert>;
        console.error("Must include and query param and value"); //future todo: instead of console.log error  using observability tool
      } else {
        const response = await axios.get(`${BASE_API_URL}/products/scores`);
        setProducts(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      setErrMessage(error.message);
      console.error("Error fetching products:", error); //future todo: instead of console.log error  using observability tool
    }
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;

    setFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      const filterIndex = newFilters.findIndex(
        (filter) => filter.value === value
      );

      if (filterIndex !== -1) {
        const filter = newFilters[filterIndex];

        newFilters[filterIndex] = { ...filter, checked: !filter.checked };
      }

      return newFilters;
    });
  };

  const handleFilters = async () => {
    const checkedFilters = [];
    filters.forEach((f) => f.checked && checkedFilters.push(f.value));

    const params = checkedFilters?.join(",");
    params ? fetchProducts("characteristic", params) : fetchProducts();
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container>
      {errMessage && <ErrorPage message={errMessage} />}
      {!errMessage && (
        <>
          <h1>Product Compass</h1>
          {isLoading && <LoadingPage />}
          {!isLoading && (
            <>
              <div>
                <span className="heading" onClick={handleShowMenu}>
                  <FontAwesomeIcon icon={faFilter} /> <h6>Filter Products</h6>
                </span>
                <FilterMenu
                  isClicked={showMenu}
                  filters={filters}
                  onChange={handleCheckboxChange}
                  onClick={handleFilters}
                />
              </div>
              {products.length > 0 ? (
                <div className="grid">
                  {products.map((product) => (
                    <Product product={product} key={product.id} />
                  ))}
                </div>
              ) : (
                <p>No products to show</p>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
