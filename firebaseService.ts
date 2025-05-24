// firebaseService.ts
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { WishlistItem } from "./store/types";

const wishlistRef = collection(db, "wishlist");

export const fetchWishlistItems = async (): Promise<WishlistItem[]> => {
  const snapshot = await getDocs(wishlistRef);
  return snapshot.docs.map((docSnap) => ({
    ...(docSnap.data() as WishlistItem),
    id: docSnap.id,
  }));
};

export const addWishlistItem = async (item: Omit<WishlistItem, "id">) => {
  await addDoc(wishlistRef, item);
};

export const deleteWishlistItem = async (id: string) => {
  await deleteDoc(doc(db, "wishlist", id));
};

export const toggleBoughtInFirestore = async (id: string, current: boolean) => {
  await updateDoc(doc(db, "wishlist", id), { bought: !current });
};
