import Titulo from "@/components/Titulo";
import { useAppContext } from "@/hooks/globalContext";
import { useRouter } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  const { globalState, setGlobalState } = useAppContext();
  const router = useRouter();
  const textoTitulo = `Bienvenido ${globalState.usuario}`;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Titulo contenido={textoTitulo} />
      <Button
        title="Cerrar sesión"
        onPress={() => {
          setGlobalState({ ...globalState, usuario: "" });
          router.replace("/");
        }}
      />
    </View>
  );
}
