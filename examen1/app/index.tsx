import auth from "@/infraestructure/auth";
import EntradaTexto from "@/components/EntradaTexto";
import Parrafo from "@/components/Parrafo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, View } from "react-native";
import styles from "../styles/indexStyles";

export default function Index() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const validateLogin = async () => {
    let response = await auth.login(usuario, password);
    if (response.success) {
      router.replace("/appLogin/home");
    } else alert("Login fallido");
  };
  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <View style={{ ...styles.box }}>
        <View style={{ ...styles.boxTitulo }}>
          <Parrafo contenido="🔐 Iniciar Sesión" />
        </View>
        <EntradaTexto
          placeholder="Correo Electrónico"
          keyboardType="email-address"
          key={"user"}
          onChangeText={setUsuario}
          value={usuario}
        />
        <EntradaTexto
          placeholder="Contraseña"
          keyboardType="email-address"
          secureTextEntry
          key={"password"}
          value={password}
          onChangeText={setPassword}
        />
        <View style={{ ...styles.btnBox }}>
          <Button title="ENTRAR" onPress={validateLogin} />
        </View>
        <View style={{ ...styles.boxTitulo }}>
          <Parrafo contenido="Contraseña: 1234" />
        </View>
      </View>
    </View>
  );
}
