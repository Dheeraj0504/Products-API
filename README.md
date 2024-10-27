
# Product API

A simple RESTful API built with Express.js and SQLite for managing product information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Add Products](#add-products)
  - [Calculate Total Value](#calculate-total-value)
  - [Delete Product](#delete-product)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Make sure you have [Node.js](https://nodejs.org/) and [SQLite3](https://www.sqlite.org/index.html) installed on your machine.

4. Create the database file `productAPI.db` and the necessary table structure. The following SQL statement can be used to create the `products` table:

   ```sql
   CREATE TABLE products (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       price REAL NOT NULL,
       quantity INTEGER NOT NULL
   );
   ```

## Usage

1. Start the server:
   ```bash
   node index.js
   ```
   The server will run at `http://localhost:3000`.

## API Endpoints

### Add Products

- **POST** `/add-products`
  
  Adds one or more products to the database.

  **Request Body:**
  ```json
  {
      "products": [
          {
              "name": "Product Name",
              "price": 10.99,
              "quantity": 5
          }
      ]
  }
  ```

  **Response:**
  ```json
  {
      "message": "Products Added Successfully",
      "addedProducts": [
          {
              "name": "Product Name",
              "price": 10.99,
              "quantity": 5
          }
      ]
  }
  ```

### Calculate Total Value

- **GET** `/calculate-total`
  
  Calculates the total value of all products in the database.

  **Response:**
  ```json
  {
      "totalValue": 54.95
  }
  ```

### Delete Product

- **DELETE** `/delete-product/:id`
  
  Deletes a product by its ID.

  **URL Parameters:**
  - `id`: The ID of the product to delete.

  **Response:**
  ```json
  {
      "message": "Product Deleted Successfully"
  }
  ```

## Error Handling

The API handles errors and responds with appropriate status codes and messages. Common errors include:

- **400 Bad Request**: Returned when the request body is invalid.
- **404 Not Found**: Returned when a product with the specified ID is not found.
- **500 Internal Server Error**: Returned for unexpected errors.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
