import { Redirect, Slot } from "expo-router";
import "../global.css"

export default function TabsLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />

  return (
    <Slot />
  )
}