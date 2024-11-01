import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  // Define the shape of an item in the cart, adjust this according to your needs
  id: string;
  name: string;
  quantity: number;
  price: number;
}

type CartState = CartItem[]; // The cart is an array of CartItems

export const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartState, // Initial state is an empty array
  reducers: {
    modifyCartDetails: (state, action: PayloadAction<CartItem[]>) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      }
      return state;
    },
  },
});

// Action creators
export const { modifyCartDetails } = cartSlice.actions;

// Selector to get cart state from the store
export const cartSelector = (state: { cart: CartState }) => state.cart;

export default cartSlice.reducer;
