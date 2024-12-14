import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
  container: {
    maxHeight: 36,
    position: "absolute",
    top: 44,
    zIndex: 1,
  },
  content: {
    gap: 8,
    paddingHorizontal: 24,
  },
});
