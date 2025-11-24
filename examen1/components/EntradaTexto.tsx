import { TextInput, View } from "react-native";
import styles from "../styles/entradaStyle";

type EntradaTextoProps = {
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  placeholderTextColor?: string;
  onChangeText?: (text: string) => void;
  value?: string;
};

export default function EntradaTexto(props: EntradaTextoProps) {
  return (
    <View>
      <TextInput
        placeholder={props.placeholder || "Ingresa texto"}
        placeholderTextColor={props.placeholderTextColor || "gray"}
        secureTextEntry={props.secureTextEntry || false}
        keyboardType={props.keyboardType || "default"}
        style={styles.entrada}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
}
