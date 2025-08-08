import { SplashScreen, Stack } from "expo-router";
import "./global.css"
import { useFonts } from "expo-font"
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';
import { useAuthStore } from "store/auth.store";

Sentry.init({
  dsn: 'https://ea79b86be25ac939faa271f14ea70006@o4509808297181184.ingest.de.sentry.io/4509808297640016',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
  });

  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error])

  useEffect(() => {
    fetchAuthenticatedUser()
  }, [])

  if (!fontsLoaded || isLoading) return null;

  return (
    <Stack
      screenOptions={{ headerShown: false }}
    />
  );
});