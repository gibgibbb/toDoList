import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="todo" options={{ title: "To-Do List" }}/>
    </Stack>
  );
}
