const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User),
      Product: m2s(Product),
    }
  },
  "openapi": "3.0.1",
  "info": {
    "version": "1.0.0",
    "title": "Products CRUD API",
    "description": "Products Project Application API",
    "license": {
      "name": "MIT",
      "url": "https://opensource.org/licenses/MIT"
    }
  },
  "servers": [
    {
      url: 'http://localhost:3000/',
      description: 'Local server'
    },
    {
      url: 'https://api_url_testing',
      description: 'Testing server'
    },
  ],
  // "host": "localhost:3000",
  // "basePath": "/",
  "tags": [
    {
      "name": "Users",
      "description": "API for users in the system"
    },
    {
      "name": "Products",
      "description": "API for Products in the system"
    },
    {
      "name": "Users and Products",
      "description": "API for users in the system and their products"
    }
  ],
  // "schemes": ["http"],
  "consumes": ["application/json"],
  "produces": ["application/json"],
  "paths":{
    "/api/user/findall": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Get all users in system",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      }
    },
    "/api/user/findone/{username}": {
      "get": {
        "tags": [
          "Users"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Username of user that we want to find",
            "type": "string"
          }
        ],
        "summary": "Get user from system with specific username",
        "responses": {
          "200": {
            "description": "User find",
            "schema": {
              "$ref": "#/components/schemas/user"
            }
          }
        }
      }
    },
    "/api/user/create": {
      "post": {
        "tags": [
          "Users"
        ],
        "description": "Create new user in system",
        "parameters": [
          {
            "name": "Create user",
            "in": "body",
            "description": "User that we want to create",
            "schema": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "surname": { "type": "string" },
                "email": { "type": "string" },
                "address": {
                  "type": "object",
                  "properties": {
                    "area": { "type": "string" },
                    "road": { "type": "string" }
                  },
                },
                "phone":{
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "type": { "type": "string" },
                      "number": { "type": "number" }
                    }
                  }
                }
              },
              "required": ["email"]
              // "$ref": "#/definitions/User"
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New user is created",
          }
        }
      } 
    },
    "/api/user/update": {
      "patch": {
        "tags": [
          "Users"
        ],
        "description": "Update user in system",
        "parameters": [{
          "name": "update user in system",
          "in": "body",
          "description": "User that we will update",
          "schema":{
            "type":"object",
            "properties": {
              "username": { "type": "string" },
              "name" : { "type" : "string"},
              "surname": { "type" : "string" },
              "email": { "type" : "string" },
              "address": {
                "type": "object",
                "properties": {
                  "area": { "type" : "string" },
                  "road": { "type" : "string"},
                },
              },
              "phone":{
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "type": { "type" : "string" },
                    "number": { "type" : "string" },
                  },
                },
              },
            },
            "required": ["email"]
          }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Update a user",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      } 
    },
    "/api/user/delete/{username}": {
      "delete": {
        "tags": [
          "Users"
        ],
        "description": "Delete user in system",
        "parameters": [{
            "name": "username",
            "in": "path",
            "description": "User that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a user",
          }
        }
      } 
    },
    "/api/product/findall": {
      "get": {
        "tags": [
          "Products"
        ],
        "summary": "Find all products",
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/product/findone/{id}": {
      "get": {
        "tags": [
          "Products"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "description": "Find product with id",
            "type": "string"
          }
        ],
        "summary": "Get product from system with specific id",
        "responses": {
          "200": {
            "description": "Product find",
          }
        }
      }
    },
    "/api/product/create": {
      "post": {
        "tags": [
          "Products"
        ],
        "description": "Create new product in system",
        "parameters": [
          {
            "name": "Create product",
            "in": "body",
            "description": "Product that we want to create",
            "schema": {
              "$ref": "#/components/schemas/Product",
              "required": ["product", "cost", "quantity"]              
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New product is created",
          }
        }
      } 
    },
    "/api/product/update": {
      "patch": {
        "tags": [
          "Products"
        ],
        "description": "Update product in system, find by id",
        "parameters": [{
          "name": "update product in system",
          "in": "body",
          "description": "Product that we will update",
          "schema":{
            "$ref": "#/components/schemas/Product",
            "required": ["email"]
          }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Update a product",
          }
        }
      } 
    },
    "/api/product/delete/{id}": {
      "delete": {
        "tags": [
          "Products"
        ],
        "description": "Delete product in system",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID of product that we want to delete",
            "schema": {
              "$ref": "#/components/schemas/Product",
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a user"
          }
        }
      } 
    },
    "/api/userproduct/findall": {
      "get": {
        "tags": [
          "Users and Products"
        ],
        "summary": "Find all users with their products",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/components/schemas/User",
            }
          }
        }
      }
    },
    "/api/userproduct/findone/{username}": {
      "get": {
        "tags": [
          "Users and Products"
        ],
        "parameters": [
          {
            "name": "username",
            "in": "path",
            "required": true,
            "description": "Find user with products",
            "type": "string"
          }
        ],
        "summary": "Get a user with the products",
        "responses": {
          "200": {
            "description": "User and Product find",
            "schema": {
              "$ref": "#/definitions/User"
            }
          }
        }
      }
    },
    "/api/userproduct/create": {
      "post": {
        "tags": [
          "Users and Products"
        ],
        "description": "Add new product for user in system",
        "parameters": [
          {
            "name": "Add new product for user",
            "in": "body",
            "description": "Product that we want to add to user",
            "schema": {
              "type": "object",
              "properties": {
                "username": { "type": "string" },
                "product": { "type": "string" },
                "cost": { "type": "number" },
                "quantity": { "type": "number" }
              },
              "required": ["quantity"]
            }
          }
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "New product is added",
          }
        }
      } 
    },
    "/api/userproduct/update": {
      "patch": {
        "tags": [
          "Users and Products"
        ],
        "description": "Update product from user system",
        "parameters": [{
          "name": "update product from user in system",
          "in": "body",
          "description": "Product of user that we will update",
          "schema":{
            "type":"object",
            "properties": {
              "username": { "type": "string" },
              "product": { "type": "string" },
              "cost": { "type": "number" },
              "quantity": { "type": "number" }
            },
            "required": ["quantity"]
          }
        }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Update a product of user",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
          }
        }
      } 
    },
    "/api/userproduct/delete/{username}/{id}": {
      "delete": {
        "tags": [
          "Users and Products"
        ],
        "description": "Delete product from user in system",
        "parameters": [{
            "name": "username",
            "in": "path",
            "description": "Username that we want to find",
            "schema": {
              "$ref": "#/components/schemas/User"
            }
        },{
          "name": "id",
          "in": "path",
          "description": "Id of product that we want to delete",
          "schema": {
            "$ref": "#/components/schemas/User"
          }
      }],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Delete a product from user",
          }
        }
      } 
    },
  }
};