import { ActivityIndicator } from "react-native";
import { s } from "./style";
import { colors } from "@/styles/theme";

export default function Loading() {
  return (
    <ActivityIndicator
      size="large"
      color={colors.green.base}
      style={s.container}
    />
  );
}
