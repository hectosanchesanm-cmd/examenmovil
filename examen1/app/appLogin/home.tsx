import Parrafo from "@/components/Parrafo";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Titulo from "../../components/Titulo";

export default function Index() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <Image
        source={require("../../assets/images/vaquitaVistoBueno.jpg")}
        style={{
          width: 150,
          height: 150,
          marginBottom: 20,
          borderRadius: 75,
          borderWidth: 2,
          borderColor: "white",
        }}
      />
      <Titulo contenido="Bienvenido a la App" />
      <Parrafo contenido="Esta es una aplicación de ejemplo utilizando Expo Router y React Native." />
    </View>
  );
}
