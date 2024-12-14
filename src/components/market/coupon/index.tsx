import { View, Text } from "react-native";
import { IconTicket } from "@tabler/icons-react-native";
import { s } from "./style";
import { colors } from "@/styles/colors";

type Props = {
  code: string;
};

export function Coupon({ code }: Props) {
  return (
    <View style={s.container}>
      <Text style={s.title}>Utilize este cupom</Text>

      <View style={s.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={s.code}>{code}</Text>
      </View>
    </View>
  );
}