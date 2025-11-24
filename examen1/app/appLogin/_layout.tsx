import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeIcon, LoginIcon, ToDoListIcon } from "../../components/ui/icons";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <Tabs screenOptions={{ headerShown: false, headerTitle: "Hola" }}>
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
            }}
          ></Tabs.Screen>
          <Tabs.Screen
            name="perfil"
            options={{
              title: "Perfil",
              tabBarLabel: "perfil",
              tabBarIcon: ({ color }) => <LoginIcon color={color} size={24} />,
            }}
          />
          <Tabs.Screen
            name="todolist"
            options={{
              title: "To Do List",
              tabBarLabel: "To Do",
              tabBarIcon: ({ color }) => (
                <ToDoListIcon color={color} size={24} />
              ),
            }}
          />
        </Tabs>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
