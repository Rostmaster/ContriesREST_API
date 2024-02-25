# 🌍 Country API Exercise

Welcome to the Country API Exercise! This simple API allows you to retrieve information about countries from around the world. Whether you're a beginner learning about APIs or an experienced developer looking for a quick exercise, this project is perfect for you. 🚀

## 📚 Overview

This API provides basic information about countries, including their name, capital, population, area, and more. It's a great way to practice making HTTP requests, handling JSON responses, and exploring the world of APIs.

## 🛠️ Usage

### Base URL

```
ttp://localhost:3000/countries
```

### Endpoints

1. **Get All Countries**

   - Endpoint: `/countries`
   - Method: `GET`
   - Example: `ttp://localhost:3000/countries`

2. **Search Countries**
   - Endpoint: `/countries/{id}`
   - Method: `GET`
   - Example: `http://localhost:3000/countries/id`

3. **Create Country**
   - Endpoint: `/countries
   - Method: `POST
   - 
4. **Update Country**
5. **Delete Country**

## 🌐 Example Responses

### Get All Countries

```json
[
  {
    "name": "United States",
    "capital": "Washington, D.C.",
    "number_of_citizens": 331002651,
    "continent": "America"
  }
  // ... more countries
]
```

### Get Country by ID

```json
{
  "name": "Germany",
  "capital": "Berlin",
  "number_of_citizens": 83149300,
  "continent": "Europe"
}
```

### Search Countries

```json
[
  {
    "name": "Germany",
    "capital": "Berlin",
    "number_of_citizens": 83149300,
    "continent": "Europe"
  }
  // ... other matching countries
]
```
