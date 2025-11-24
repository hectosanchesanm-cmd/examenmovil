import { Task } from "@/constants/types";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/taskItemStyle";
import { TrashIcon } from "./ui/icons";

interface TaskItemProps {
  task: Task;
  onToggle?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <View key={task.id} style={styles.View}>
      <TouchableOpacity onPress={() => onToggle?.(task.id)}>
        <View
          style={{
            ...styles.Circle,
            backgroundColor: task.completed ? "green" : "trasparent",
          }}
        ></View>
      </TouchableOpacity>
      <Text
        style={{ ...styles.Text, color: task.completed ? "gray" : "white" }}
      >
        {task.title}
      </Text>
      <TouchableOpacity
        style={{ marginHorizontal: 10 }}
        onPress={() => onRemove?.(task.id)}
      >
        <TrashIcon size={16} color={"white"} />
      </TouchableOpacity>
    </View>
  );
}
