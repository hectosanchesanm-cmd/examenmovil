import { TaskResponse } from "@/constants/types";
import image from "@/infraestructure/image";
import todos from "@/infraestructure/todos";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

interface UseTodohookReturn {
  tasks: TaskResponse[];
  photoUri: string;
  refreshTask: () => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  handleTakePhoto: () => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  addTask: () => Promise<void>;
  newTaskTitle: string;
  showAddNewTask: boolean;
  setNewTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  setShowAddNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useTodoHook = (): UseTodohookReturn => {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
  const [photoUri, setPhotoUri] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showAddNewTask, setShowAddNewTask] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const refreshTask = useCallback(async (): Promise<void> => {
    try {
      const response = await todos.getAll();
      if (response.data) {
        setTasks(response.data);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.log(err);
      setTasks([]);

      Alert.alert(
        "Error de conexión",
        "No se pudieron cargar las tareas. Verifica tu conexión e intenta nuevamente."
      );
    }
  }, []);

  useEffect(() => {
    refreshTask();
  }, [refreshTask]);

  const toggleTask = useCallback(
    async (id: string, completed: boolean): Promise<void> => {
      try {
        let response = await todos.partialUpdate({
          id: id,
          completed: !completed,
        });
        if (!response.success) throw new Error("Error al completar tarea");
      } catch (e) {
        Alert.alert("Error", "Error al completar tarea");
      }

      await refreshTask();
    },
    [refreshTask]
  );

  const handleTakePhoto = useCallback(async () => {
    if (isCapturingPhoto) return;
    try {
      setIsCapturingPhoto(true);
      const { status } = await requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permiso denegado",
          "Para tomar fotos necesitas permitirlo"
        );
        setIsCapturingPhoto(false);
        return;
      }

      const result = await launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.3,
        allowsEditing: false,
        exif: false,
      });
      if (!result.canceled && result.assets.length > 0) {
        let response = await image.UPLOAD(
          result.assets[0].mimeType !== undefined
            ? result.assets[0].mimeType
            : "image/jpeg",
          result.assets[0].uri
        );
        if (!response.success) throw new Error("Error al subir imagenes");
        if (response.data != null && response.data.url != null) {
          setPhotoUri(response.data.url);
        }

        return;
      }
      throw new Error("Error al obtener foto");
    } catch (e) {
      console.error("error al tomar foto", e);
      Alert.alert("Error", "No se pudo tomar la foto");
    } finally {
      setIsCapturingPhoto(false);
    }
  }, [isCapturingPhoto]);

  const removeTask = useCallback(
    async (id: string) => {
      try {
        let response = await todos.delete(id);
        if (!response.success) throw new Error("Error al eliminar la tarea");
      } catch (e) {
        Alert.alert("Error", "No se pudo eliminar la tarea");
      } finally {
        refreshTask();
      }
    },
    [refreshTask]
  );

  const addTask = useCallback(async () => {
    if (isSaving) return;
    let location = null;
    const title = newTaskTitle;
    try {
      setIsSaving(true);
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        const locationResult = await getCurrentPositionAsync({
          accuracy: Accuracy.Lowest,
        });
        location = {
          latitude: Math.round(locationResult.coords.latitude),
          longitude: Math.round(locationResult.coords.longitude),
        };
      }

      const newTask: TaskResponse = {
        title: title,
        completed: false,
        photoUri: photoUri,
        location: location ? location : undefined,
      };
      let response = await todos.create(newTask);
      if (!response.success)
        throw new Error(
          response.error != null ? response.error : "Error al guardar task"
        );
    } catch (e) {
      Alert.alert("Error", "Error al guardar tarea");
    } finally {
      refreshTask();
      setIsSaving(false);
      setShowAddNewTask(false);
    }
  }, [refreshTask, isSaving, newTaskTitle, photoUri]);

  return {
    tasks,
    refreshTask,
    toggleTask,
    handleTakePhoto,
    photoUri,
    removeTask,
    addTask,
    newTaskTitle,
    showAddNewTask,
    setNewTaskTitle,
    setShowAddNewTask,
  };
};
