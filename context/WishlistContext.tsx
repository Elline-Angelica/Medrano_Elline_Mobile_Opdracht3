import React, { createContext, useContext, useState } from "react";
import { WishlistItem } from "../types/wishlist";
import { WISHLIST } from "../data/dummy-data";

type WishlistContextType = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => boolean; // returns false if title exists
  toggleBought: (id: string) => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<WishlistItem[]>(WISHLIST);

  const addItem = (item: WishlistItem): boolean => {
    const exists = items.some(
      (i) => i.title.toLowerCase().trim() === item.title.toLowerCase().trim()
    );
    if (exists) return false;

    setItems((prev) => [...prev, item]);
    return true;
  };

  const toggleBought = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  };

  return (
    <WishlistContext.Provider value={{ items, addItem, toggleBought }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context)
    throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
