// import { createApiInstance } from "./createApiInstance";

// const extendedApi = createApiInstance.injectEndpoints({
//   endpoints: (build) => ({
//     getAllOrders: build.query({
//       query: (query) => "/orders",
//     }),
//   }),
//   overrideExisting: true,
// });

// export const { useGetAllOrdersQuery } = extendedApi;
import { createApiInstance } from "./createApiInstance";

const sampleOrders = [
  {
    "_id": "672714db6de279183c7279cc",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696d2",
          "itemName": "Vegetable Platters",
          "itemPrice": 21.9,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/jyhtn3wmkszmsfiponxy.jpg"
        },
        "quantity": 2
      }
    ],
    "customerDetails": {
      "firstName": "Shiv",
      "lastName": "KADIWALA",
      "email": "abc@gmail.com",
      "phoneNo": "8849723042"
    },
    "status": "Paid",
    "createdAt": "2024-11-03T06:14:51.335Z",
    "totalPrice": 44
  },
  {
    "_id": "672714db6de279183c7279cd",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696d3",
          "itemName": "Fruit Salad",
          "itemPrice": 15.5,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/fruit-salad.jpg"
        },
        "quantity": 1
      },
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696d4",
          "itemName": "Pasta Primavera",
          "itemPrice": 12.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/pasta-primavera.jpg"
        },
        "quantity": 1
      }
    ],
    "customerDetails": {
      "firstName": "John",
      "lastName": "DOE",
      "email": "john.doe@gmail.com",
      "phoneNo": "1234567890"
    },
    "status": "Pending",
    "createdAt": "2024-11-03T07:00:00.000Z",
    "totalPrice": 27.5
  },
  {
    "_id": "672714db6de279183c7279ce",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696d5",
          "itemName": "Cheese Pizza",
          "itemPrice": 18.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/cheese-pizza.jpg"
        },
        "quantity": 2
      }
    ],
    "customerDetails": {
      "firstName": "Alice",
      "lastName": "SMITH",
      "email": "alice.smith@gmail.com",
      "phoneNo": "0987654321"
    },
    "status": "Shipped",
    "createdAt": "2024-11-03T08:00:00.000Z",
    "totalPrice": 36.0
  },
  {
    "_id": "672714db6de279183c7279cf",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696d6",
          "itemName": "Chocolate Cake",
          "itemPrice": 22.5,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/chocolate-cake.jpg"
        },
        "quantity": 3
      }
    ],
    "customerDetails": {
      "firstName": "Bob",
      "lastName": "JOHNSON",
      "email": "bob.johnson@gmail.com",
      "phoneNo": "5678901234"
    },
    "status": "Delivered",
    "createdAt": "2024-11-03T09:00:00.000Z",
    "totalPrice": 67.5
  },
  {
    "_id": "672714db6de279183c7279d0",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696d7",
          "itemName": "Caesar Salad",
          "itemPrice": 14.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/caesar-salad.jpg"
        },
        "quantity": 1
      }
    ],
    "customerDetails": {
      "firstName": "Emily",
      "lastName": "DAVIS",
      "email": "emily.davis@gmail.com",
      "phoneNo": "2345678901"
    },
    "status": "Paid",
    "createdAt": "2024-11-03T10:00:00.000Z",
    "totalPrice": 14.0
  },
  {
    "_id": "672714db6de279183c7279d1",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696d8",
          "itemName": "Spaghetti Bolognese",
          "itemPrice": 17.5,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/spaghetti-bolognese.jpg"
        },
        "quantity": 1
      }
    ],
    "customerDetails": {
      "firstName": "Michael",
      "lastName": "WILSON",
      "email": "michael.wilson@gmail.com",
      "phoneNo": "3456789012"
    },
    "status": "Pending",
    "createdAt": "2024-11-03T11:00:00.000Z",
    "totalPrice": 17.5
  },
  {
    "_id": "672714db6de279183c7279d2",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696d9",
          "itemName": "Taco Salad",
          "itemPrice": 16.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/taco-salad.jpg"
        },
        "quantity": 2
      }
    ],
    "customerDetails": {
      "firstName": "Sarah",
      "lastName": "JOHNSON",
      "email": "sarah.johnson@gmail.com",
      "phoneNo": "4567890123"
    },
    "status": "Shipped",
    "createdAt": "2024-11-03T12:00:00.000Z",
    "totalPrice": 32.0
  },
  {
    "_id": "672714db6de279183c7279d3",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696da",
          "itemName": "BBQ Chicken Wings",
          "itemPrice": 25.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/bbq-chicken-wings.jpg"
        },
        "quantity": 1
      }
    ],
    "customerDetails": {
      "firstName": "Daniel",
      "lastName": "BROWN",
      "email": "daniel.brown@gmail.com",
      "phoneNo": "5678901234"
    },
    "status": "Delivered",
    "createdAt": "2024-11-03T13:00:00.000Z",
    "totalPrice": 25.0
  },
  {
    "_id": "672714db6de279183c7279d4",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696db",
          "itemName": "Vegetable Stir Fry",
          "itemPrice": 19.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/vegetable-stir-fry.jpg"
        },
        "quantity": 3
      }
    ],
    "customerDetails": {
      "firstName": "Sophia",
      "lastName": "MILLER",
      "email": "sophia.miller@gmail.com",
      "phoneNo": "6789012345"
    },
    "status": "Paid",
    "createdAt": "2024-11-03T14:00:00.000Z",
    "totalPrice": 57.0
  },
  {
    "_id": "672714db6de279183c7279d5",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696dc",
          "itemName": "Steak Frites",
          "itemPrice": 30.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/steak-frites.jpg"
        },
        "quantity": 1
      }
    ],
    "customerDetails": {
      "firstName": "Lucas",
      "lastName": "GARCIA",
      "email": "lucas.garcia@gmail.com",
      "phoneNo": "7890123456"
    },
    "status": "Pending",
    "createdAt": "2024-11-03T15:00:00.000Z",
    "totalPrice": 30.0
  },
  {
    "_id": "672714db6de279183c7279d6",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696dd",
          "itemName": "Grilled Salmon",
          "itemPrice": 27.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/grilled-salmon.jpg"
        },
        "quantity": 1
      }
    ],
    "customerDetails": {
      "firstName": "Olivia",
      "lastName": "LOPEZ",
      "email": "olivia.lopez@gmail.com",
      "phoneNo": "8901234567"
    },
    "status": "Shipped",
    "createdAt": "2024-11-03T16:00:00.000Z",
    "totalPrice": 27.0
  },
  {
    "_id": "672714db6de279183c7279d7",
    "cart": [
      {
        "item": {
          "_id": "67096a0ef53dccbe2b6696de",
          "itemName": "Shrimp Tacos",
          "itemPrice": 24.0,
          "itemImagePath": "https://res.cloudinary.com/domcmqnwn/image/upload/v1728670221/Production-Restaurant-Menu/shrimp-tacos.jpg"
        },
        "quantity": 2
      }
    ],
    "customerDetails": {
      "firstName": "Mia",
      "lastName": "HERNANDEZ",
      "email": "mia.hernandez@gmail.com",
      "phoneNo": "9012345678"
    },
    "status": "Delivered",
    "createdAt": "2024-11-03T17:00:00.000Z",
    "totalPrice": 48.0
  }
];

const extendedApi = createApiInstance.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      queryFn: async () => {
        
        await new Promise(resolve => setTimeout(resolve, 100));
      
        return { data: sampleOrders };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllOrdersQuery } = extendedApi;
