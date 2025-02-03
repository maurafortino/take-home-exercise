# Full-Stack Engineering Take-Home Exercise

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Git

### Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Set up and start the backend:

   ```bash
   cd api
   yarn install
   yarn start
   ```

   The API server will start on port 3005, and the JSON server on port 4000.

3. In a new terminal, set up and start the frontend:
   ```bash
   cd client
   yarn install
   yarn start
   ```
   The React development server will start on port 3000 and should automatically open in your default browser.

### Verifying Setup

- Backend API should be accessible at: http://localhost:3005
- JSON Server should be accessible at: http://localhost:4000/products and should return product data
  <details>
    <summary>Example response (click to expand) - Shows 6 products including "Sprockets", "Cogs", etc.</summary>

  ```json
  [
    {
      "name": "Sprockets",
      "characteristics": ["Plastic-Free", "Locally Produced"],
      "id": "dcea"
    },
    {
      "name": "Cogs",
      "characteristics": ["Plastic-Free", "Wasteful"],
      "id": "0f8f"
    },
    {
      "name": "Face Cream",
      "characteristics": ["Humane", "Vegan", "Locally Produced"],
      "id": "9880"
    },
    {
      "name": "Muskers",
      "characteristics": ["Wasteful", "Unhealthy"],
      "id": "5015"
    },
    {
      "name": "Hand Sanitizer",
      "characteristics": ["Vegan", "Humane"],
      "id": "04dd"
    },
    {
      "name": "Lettuce",
      "characteristics": ["Vegan", "Humane", "Healthy"],
      "id": "0219"
    }
  ]
  ```

  </details>

- Frontend should be accessible at: http://localhost:3000

### Port Configuration

- Express Server: 3005
- JSON Server: 4000
- React App: 3000

## Design Decisions

1. Components
   a. Filter Menu

- wanted to hide the filter menu when users are looking at results so that they can see results easier
- chose checkboxes so users could choose multiple characteristics
- when users click on Filter Products it will show, when the click on it again it will disapear
- future consideration: hide the filter menu again after user clicks filter products

  b. Filter

  - separated out from the filter menu so that a checkbox could be rendered for each filter item
    -future consideration: moving the characteristics arr to a DB and preloading array for better performance and make code cleaner when filter options become larger

  c. Product

  - added a product component to render each product separateley - this allows for more products to be added seamlessly

2. Bootstrap for css

- went with Bootstrap as I'm most familiar with the Bootstrap framework
- it's easy to implement and quickly make a clean UI
- Cards keep items contained and easy to read
- future TODO: make grid more responsive to different size grids

3. fetchProductsWithScores in products.js

- added this as middleware so as both requests require the score to be added to the product so that users can see the score

4. Node-cache

- chose node-cache for the caching option for simplicity and ease of use
- future consideration: use Redis for better scalability

## Performance Considerations

- How to get state of components more localized - currently passing down from App
- consider using a CDN for products, especially if users are only reading from DB

## Future Considerations

1. Pagination of the products for faster reqs, especially with more data
2. Make paginated requests run in parallel
3. Add observability tool to track error messages and responses statuses
4. UI is pretty bare bones - would enhance it to make it stand out more
5. Add page buttons to UI for pagination
6. Making a HomePage component so I can move some of the state and logic to that to make App.js cleaner

## Troubleshooting

If you encounter port conflicts:

1. Check if the ports (3000, 3005, 4000) are available
2. Modify the port numbers in the respective configuration files
3. Update the `BASE_API_URL` in the frontend accordingly

For any questions, please reach out to blake@berrystreet.co
