import { View, Text, Image } from "react-native";
import { s } from "./style";
import { colors } from "@/styles/theme";

export default function Welcome() {
  return (
    <View>
      <Image source={require("@/assets/logo.png")} style={s.logo} />
      <Text style={s.title}>Boas Vindas ao Nearby!</Text>
      <Text style={s.subtitle}>
        Tenha cupons de vantagens para usar em seus estabelecimentos favoritos.
      </Text>
    </View>
  );
}
