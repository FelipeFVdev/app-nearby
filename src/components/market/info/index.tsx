import { View, Text } from "react-native";
import { IconProps } from "@tabler/icons-react-native";
import { s } from "./style";
import { colors } from "@/styles/colors";

type Props = {
  description: string;
  icon: React.ComponentType<IconProps>;
};

export function Info({ icon: Icon, description }: Props) {
  return (
    <View style={s.container}>
      <Icon size={24} color={colors.gray[500]} />
      <Text style={s.text}>{description}</Text>
    </View>
  );
}
