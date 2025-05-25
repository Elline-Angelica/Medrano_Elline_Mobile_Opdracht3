import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem } from './types';

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist(state) {
      state.items = [];
    },
    setItems(state, action: PayloadAction<WishlistItem[]>) {
      state.items = action.payload;
    },
    addItem(state, action: PayloadAction<WishlistItem>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    toggleBought(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.bought = !item.bought;
      }
    },
  },
});

export const { addItem, removeItem, toggleBought, setItems, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
