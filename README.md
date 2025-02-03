# Full-Stack Engineering Take-Home Exercise

👋 Hello from Berry Street!

Thanks for taking the time to work on our coding exercise. We've designed this to be an engaging way for you to show us how you think about building products that make a difference. Don't worry too much about getting everything perfect - we're more interested in seeing your approach and thought process.

**Time Expectation:** While we suggest spending 3-4 hours on core requirements, feel free to invest more time if you're excited about additional features or improvements that showcase your product thinking. We appreciate your enthusiasm, but also value your time - so no pressure to go overboard!

## Overview

This is a full-stack application built with Node.js/Express backend and React frontend. The backend includes a mock API (powered by `json-server`) that simulates a product catalog service.

### Product Thinking Opportunity

We encourage you to think beyond just the technical implementation. This exercise is intentionally open-ended to allow you to:

- Make thoughtful product decisions about the user experience
- Fill in any gaps in the requirements based on reasonable assumptions
- Add features that you think would benefit the end user
- Document your product decisions and their rationale
- Consider real-world scenarios and edge cases

Strong submissions often go beyond the basic requirements to create a more complete and polished product experience. Feel free to:

- Enhance the UI/UX with additional features that make sense
- Add helpful product metadata or functionality
- Improve error messaging and user feedback
- Consider accessibility and internationalization
- Add data visualizations or analytics features
- Implement any other features you think would be valuable

Just be sure to document your choices and reasoning in your submission.

### Data Structure

Products have the following structure:

```json
{
  "id": "string",
  "name": "string",
  "characteristics": ["string"] // e.g., ["Humane", "Locally Produced", "Healthy"]
}
```

Available characteristics: "Humane", "Locally Produced", "Healthy", "Plastic-Free", "Unhealthy", "Wasteful", "Vegan"

## Tasks

### Backend (Express API)

1. Implement a route that filters products by characteristic:

   - Endpoint: GET `/products?characteristic=value` ✅
   - Should efficiently handle multiple concurrent requests
   - Consider caching strategies for performance ✅

2. Create a product scoring system:
   - Endpoint: GET `/products/scores` ✅
   - Scoring rules:
     - +1: "Humane", "Locally Produced", "Healthy" ✅
     - +2: "Plastic-Free" ✅
     - -1: "Unhealthy", "Wasteful" ✅
   - Return products with their calculated scores ✅
   - Optimize for performance at scale

### Frontend (React)

3. Build a responsive product grid:

   - Display products in a 3-column layout ✅
   - Show product name and score ✅
   - Implement loading states ✅
   - Handle error cases ✅

4. [Bonus] Add characteristic filtering:
   - Create a UI for selecting multiple characteristics ✅
   - Update the product grid based on selected filters ✅
   - Maintain a clean and intuitive user experience ✅

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

## Submission Instructions

1. Fork this repository to your own GitHub account
2. Make your changes in your forked repository
3. Update the README with:
   - Setup instructions
   - Your design decisions
   - Performance considerations
   - What you would do differently with more time
4. Email the link to your forked repository to blake@berrystreet.co
   - Ensure your forked repository is public

## Troubleshooting

If you encounter port conflicts:

1. Check if the ports (3000, 3005, 4000) are available
2. Modify the port numbers in the respective configuration files
3. Update the `BASE_API_URL` in the frontend accordingly

For any questions, please reach out to blake@berrystreet.co
