import { Text } from "react-native";
import styles from "../styles/tituloStyles";

interface TituloProps {
  contenido: string;
}

export default function Titulo({ contenido }: TituloProps) {
  return <Text style={styles.titulo}>{contenido}</Text>;
}
