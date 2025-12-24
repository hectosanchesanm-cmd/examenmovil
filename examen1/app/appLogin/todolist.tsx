import Titulo from "@/components/Titulo";

import { Button, Image, TouchableOpacity, View } from "react-native";
import styles from "../../styles/indexStyles";
import todoStyle from "@/styles/todolistStyle";
import TaskItem from "@/components/TaskItem";
import Parrafo from "@/components/Parrafo";
import EntradaTexto from "@/components/EntradaTexto";
import { AddIcon } from "@/components/ui/icons";
import { useTodoHook } from "@/hooks/todoListHook";

export default function TodoList() {
  const {
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
  } = useTodoHook();

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
