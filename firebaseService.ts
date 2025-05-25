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
import { auth } from "./firebaseConfig";

const getUserWishlistRef = () => {
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("No user logged in");
  return collection(db, "users", userId, "wishlist");
};

export const fetchWishlistItems = async (): Promise<WishlistItem[]> => {
  const ref = getUserWishlistRef();
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((docSnap) => ({
    ...(docSnap.data() as WishlistItem),
    id: docSnap.id,
  }));
};

export const addWishlistItem = async (item: Omit<WishlistItem, "id">) => {
  const user = auth.currentUser;
  if (!user || user.isAnonymous) {
    return;
  }

  const ref = collection(db, "users", user.uid, "wishlist");
  await addDoc(ref, item);
};


export const deleteWishlistItem = async (id: string) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  await deleteDoc(doc(db, "users", userId, "wishlist", id));
};

export const toggleBoughtInFirestore = async (id: string, current: boolean) => {
  const userId = auth.currentUser?.uid;
  if (!userId) return;
  await updateDoc(doc(db, "users", userId, "wishlist", id), { bought: !current });
};
