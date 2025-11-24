import { Text } from "react-native";

export default function Parrafo({ contenido }: { contenido: string }) {
  return (
    <Text
      style={{
        color: "white",
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center",
      }}
    >
      {contenido}
    </Text>
  );
}
