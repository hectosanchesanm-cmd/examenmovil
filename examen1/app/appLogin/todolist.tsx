import Titulo from "@/components/Titulo";
import todos from "@/infraestructure/todos";

import { Alert, Button, Image, TouchableOpacity, View } from "react-native";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from "expo-image-picker";
import {
  Accuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import styles from "../../styles/indexStyles";
import todoStyle from "@/styles/todolistStyle";
import { TaskResponse } from "@/constants/types";
import TaskItem from "@/components/TaskItem";
import { useEffect, useState } from "react";
import Parrafo from "@/components/Parrafo";
import EntradaTexto from "@/components/EntradaTexto";
import { AddIcon } from "@/components/ui/icons";
import image from "@/infraestructure/image";

export default function TodoList() {
  const [tasks, setTasks] = useState<TaskResponse[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [showAddNewTask, setShowAddNewTask] = useState<boolean>(false);
  const [photoUri, setPhotoUri] = useState<string>("");
  const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      await refreshDataHandler();
    };

    init();
  }, []);
  async function refreshDataHandler() {
    try {
      const initialDB = await todos.getAll();
      if (initialDB.data) {
        setTasks(initialDB.data);
      }
    } catch (e) {
      Alert.alert("Error", "Error al traer data");
    }
  }
  async function handleTakePhoto() {
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
  }

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      let response = await todos.partialUpdate({
        id: id,
        completed: !completed,
      });
      if (!response.success) throw new Error("Error al completar tarea");
    } catch (e) {
      Alert.alert("Error", "Error al completar tarea");
    } finally {
      refreshDataHandler();
    }
  };

  const removeTask = async (id: string) => {
    try {
      let response = await todos.delete(id);
      if (!response.success) throw new Error("Error al eliminar la tarea");
    } catch (e) {
      Alert.alert("Error", "No se pudo eliminar la tarea");
    } finally {
      refreshDataHandler();
    }
  };

  const addTask = async () => {
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
      refreshDataHandler();
      setIsSaving(false);
      setShowAddNewTask(false);
    }
  };

  const TextoTitulo = `Todo LIST`;

  if (showAddNewTask) {
    return (
      <View style={{ ...styles.container }}>
        <Titulo contenido="Agregar tarea" />
        <View>
          <View>
            <EntradaTexto
              placeholder="nueva tarea"
              key={12}
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
            />
          </View>
          <View>
            {photoUri ? (
              <View>
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: "100%", height: 200, borderRadius: 4 }}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={{ ...todoStyle.fotovacia }}></View>
            )}

            <View style={{ ...todoStyle.tomarfotoButton }}>
              <Button
                title={photoUri ? "Retomar Foto" : "Tomar Foto"}
                onPress={handleTakePhoto}
              ></Button>
            </View>
          </View>
          <Button title="Agregar" onPress={addTask} />
        </View>
        <TouchableOpacity
          style={{ ...todoStyle.addTask }}
          onPress={() => setShowAddNewTask(false)}
        >
          <AddIcon color={"green"} size={48} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ ...styles.container }}>
      <View>
        <Titulo contenido={TextoTitulo} />
      </View>
      <Parrafo contenido="Tareas" />
      <View>
        <View style={{ alignContent: "flex-start" }}>
          {tasks.map((todo) => (
            <TaskItem
              task={todo}
              key={todo.id}
              onToggle={toggleTask}
              onRemove={removeTask}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={{ ...todoStyle.addTask }}
        onPress={() => setShowAddNewTask(true)}
      >
        <AddIcon color={"green"} size={48} />
      </TouchableOpacity>
    </View>
  );
}
