import Titulo from "@/components/Titulo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Button,
  Image,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
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
import { Task } from "@/constants/types";
import TaskItem from "@/components/TaskItem";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid/non-secure";
import Parrafo from "@/components/Parrafo";
import EntradaTexto from "@/components/EntradaTexto";
import { AddIcon } from "@/components/ui/icons";
import { useAppContext } from "@/hooks/globalContext";

const setAsyncData = async (name: string, data: object) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(name, jsonValue);
  } catch (e) {
    Alert.alert("Error", "Error al gardar en DB");
    console.log("Error al guardar en DB");
  }
};

const getAsyncData = async (name: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    Alert.alert("Error", "Error al leer DB");
    console.log("Error al leer DB");
  }
};

const initaldata: Task[] = [
  { id: nanoid(), title: "Tarea", completed: false, user: "Usuario" },
];

export default function TodoList() {
  const { globalState, setGlobalState } = useAppContext();
  const [tasks, setTasks] = useState<Task[]>(initaldata);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [showAddNewTask, setShowAddNewTask] = useState<boolean>(false);
  const [photoUri, setPhotoUri] = useState<string | null>();
  const [isCapturingPhoto, setIsCapturingPhoto] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const initialDB = await getAsyncData("tasks");
      console.log(tasks);
      console.log(initialDB);
      if (initialDB) {
        setTasks(initialDB);
      }
    };

    init();
  }, []);

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
        quality: 0.7,
        allowsEditing: false,
        exif: false,
      });
      if (!result.canceled && result.assets.length > 0)
        setPhotoUri(result.assets[0].uri);
    } catch (e) {
      console.error("error al tomar foto", e);
      Alert.alert("Error", "No se pudo tomar la foto");
    } finally {
      setIsCapturingPhoto(false);
    }
  }

  const toggleTask = async (id: string) => {
    let dbTask = await getAsyncData("tasks");
    dbTask = dbTask.map((task: Task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    await setAsyncData("tasks", dbTask);
    setTasks(dbTask);
  };

  const removeTask = async (id: string) => {
    //setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
    let dbTask = await getAsyncData("tasks");
    dbTask = dbTask.filter((task: Task) => task.id !== id);
    await setAsyncData("tasks", dbTask);
    const initalDB = await getAsyncData("tasks");
    console.log(initalDB);
    setTasks(dbTask);
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
          accuracy: Accuracy.Balanced,
        });
        location = {
          latitude: locationResult.coords.latitude,
          longitude: locationResult.coords.longitude,
        };
      }

      const newTask: Task = {
        id: nanoid(),
        title: title,
        completed: false,
        user: globalState.usuario,
        photouri: photoUri ? photoUri : undefined,
        coordinates: location ? location : undefined,
      };

      setAsyncData("tasks", tasks);
      let dbTask = await getAsyncData("tasks");
      dbTask = [...dbTask, newTask];
      await setAsyncData("tasks", dbTask);
      console.log(dbTask);
      setTasks(dbTask);
    } catch (e) {
      console.log("Error al guardar task", e);
      Alert.alert("Error", "Error al guardar tarea");
    } finally {
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
          {tasks.map((todo) =>
            todo.user === globalState.usuario ? (
              <TaskItem
                task={todo}
                key={todo.id}
                onToggle={toggleTask}
                onRemove={removeTask}
              />
            ) : null
          )}
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
