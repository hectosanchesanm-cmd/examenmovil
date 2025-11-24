import { ContextProvider } from "@/hooks/globalContext";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    <ContextProvider>
      <SafeAreaProvider>
        <ThemeProvider value={DarkTheme}>
          <Stack screenOptions={{ headerShown: false }}></Stack>
        </ThemeProvider>
      </SafeAreaProvider>
    </ContextProvider>
  );
}
