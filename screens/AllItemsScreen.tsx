import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { fetchWishlistItems } from "../firebaseService";
import { setItems } from "../store/wishlistSlice";
import { useAuthUser } from "../context/AuthUserContext";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

type StackNav = NativeStackNavigationProp<RootStackParamList, "AllItems">;

const AllItemsScreen = () => {
  const [activeTab, setActiveTab] = useState<"all" | "bought">("all");
  const translateX = useSharedValue(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && activeTab === "all") {
      setActiveTab("bought");
      translateX.value = withTiming(-Dimensions.get("window").width);
    } else if (direction === "right" && activeTab === "bought") {
      setActiveTab("all");
      translateX.value = withTiming(0);
    }
  };

  const items = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNav>();
  const user = useAuthUser();

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      const loadData = async () => {
        try {
          if (!user.isAnonymous) {
            const firestoreItems = await fetchWishlistItems();
            dispatch(setItems(firestoreItems));
          } else {
            console.log("Anonymous user: skip Firestore fetch");
          }
        } catch (error) {
          console.error("Error loading items from Firestore:", error);
        }
      };
      loadData();
    }, [user])
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleGesture = (event: any) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -50) {
      runOnJS(handleSwipe)("left");
    } else if (translationX > 50) {
      runOnJS(handleSwipe)("right");
    }
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* 🧭 Tab Menu */}
      <View style={styles.tabMenu}>
        <TouchableOpacity onPress={() => handleSwipe("right")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "all" && styles.tabTextActive,
            ]}
          >
            All Items
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSwipe("left")}>
          <Text
            style={[
              styles.tabText,
              activeTab === "bought" && styles.tabTextActive,
            ]}
          >
            Bought
          </Text>
        </TouchableOpacity>
      </View>

      {/* 📋 Swipeable Views */}
      <PanGestureHandler onEnded={handleGesture}>
        <Animated.View
          style={[
            { flexDirection: "row", width: screenWidth * 2 },
            animatedStyle,
          ]}
        >
          {/* All Items View */}
          <View style={{ width: screenWidth }}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>
                    navigation.navigate("ItemDetail", { id: item.id })
                  }
                >
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.brand}>{item.brand}</Text>
                  <Text style={styles.price}>€ {item.price}</Text>
                  <Text style={styles.status}>
                    {item.bought ? "✓ Bought" : "♡ In wishlist"}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.empty}>Your wishlist is empty.</Text>
              }
            />
          </View>

          {/* Bought Items View */}
          <View style={{ width: screenWidth }}>
            <FlatList
              data={items.filter((item) => item.bought)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.brand}>{item.brand}</Text>
                  <Text style={styles.price}>€ {item.price}</Text>
                  <Text style={styles.status}>✓ Bought</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.empty}>You have no bought items.</Text>
              }
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ece4dc" },

  tabMenu: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  tabText: {
    fontSize: 18,
    color: "#c7b299",
    fontWeight: "normal",
  },
  tabTextActive: {
    fontWeight: "bold",
    color: "#b09272",
  },

  item: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  brand: { fontSize: 16, color: "#555" },
  price: { fontSize: 16, color: "#000", marginVertical: 4 },
  status: { fontWeight: "bold", color: "#c7b299" },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});

export default AllItemsScreen;
