import { View, Text } from "react-native";
import { IconProps } from "@tabler/icons-react-native";
import { s } from "./style";
import { colors } from "@/styles/theme";

type Props = {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
};

export default function Step({ title, description, icon: Icon }: Props) {
  return (
    <View style={s.container}>
      {Icon && <Icon color={colors.red.base} size={32} />}
      <View style={s.details}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.description}>{description}</Text>
      </View>
    </View>
  );
}
