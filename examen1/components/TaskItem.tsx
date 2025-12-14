import { Task, TaskResponse } from "@/constants/types";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "../styles/taskItemStyle";
import { TrashIcon } from "./ui/icons";
import { cache, useState } from "react";
import { nanoid } from "nanoid/non-secure";

interface TaskItemProps {
  task: TaskResponse;
  onToggle?: (id: string, completed: boolean) => void;
  onRemove?: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  const [isLoadingIMG, setIsLoadingIMG] = useState<boolean>(true);
  return (
    <View key={task.id} style={styles.View}>
      <TouchableOpacity
        onPress={() =>
          onToggle?.(
            task.id != null ? task.id : "",
            task.completed != null ? task.completed : false
          )
        }
      >
        <View
          style={{
            ...styles.Circle,
            backgroundColor: task.completed ? "green" : "trasparent",
          }}
        ></View>
      </TouchableOpacity>
      <View style={styles.centerItem}>
        <View>
          <Text
            style={{ ...styles.Text, color: task.completed ? "gray" : "white" }}
          >
            {task.title}
          </Text>
        </View>
        <View>
          <Text
            style={{ ...styles.Text, color: task.completed ? "gray" : "white" }}
          >
            {`Lat: ${
              task.location?.latitude !== undefined
                ? Math.round(task.location?.latitude)
                : 0
            } Lng: ${
              task.location?.longitude !== undefined
                ? Math.round(task.location.longitude)
                : 0
            }`}
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            height: 50,
            width: 100,
          }}
        >
          {isLoadingIMG && (
            <View style={{ position: "absolute", left: 40 }}>
              <ActivityIndicator size="small" color="#999" />
            </View>
          )}
          <Image
            key={nanoid()}
            source={{ uri: task.photoUri, cache: "force-cache" }}
            style={{ width: "100%", height: 50, borderRadius: 4 }}
            resizeMode="contain"
            onLoadStart={() => {
              setIsLoadingIMG(true);
            }}
            onLoadEnd={() => {
              setIsLoadingIMG(false);
            }}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{ marginHorizontal: 10 }}
          onPress={() => onRemove?.(task.id != null ? task.id : "")}
        >
          <TrashIcon size={32} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
