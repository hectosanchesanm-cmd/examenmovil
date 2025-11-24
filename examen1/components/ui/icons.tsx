import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

export function HomeIcon({ color, size }: { color: string; size: number }) {
  return <MaterialIcons name="home" color={color} size={size} />;
}

export function LoginIcon({ color, size }: { color: string; size: number }) {
  return <MaterialIcons name="login" color={color} size={size} />;
}

export function ToDoListIcon({ color, size }: { color: string; size: number }) {
  return (
    <MaterialIcons name="format-list-bulleted" size={size} color={color} />
  );
}

export function TrashIcon({ color, size }: { color: string; size: number }) {
  return <Ionicons name="trash-outline" size={size} color={color} />;
}

export function AddIcon({ color, size }: { color: string; size: number }) {
  return <Ionicons name="add-circle-sharp" size={size} color={color} />;
}
