import Titulo from "@/components/Titulo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";

export default function Index() {
  const [usuario, setUsuario] = useState("cargando");
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      let user = await AsyncStorage.getItem("user");
      if (user !== null) {
        let objUser = JSON.parse(user);
        setUsuario(objUser.email);
      }
    };

    init();
  }, []);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Titulo contenido={usuario} />
      <Button title="Cerrar sesión" onPress={logoutHandler} />
    </View>
  );
}
