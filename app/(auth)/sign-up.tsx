import { useRouter } from "expo-router"
import { Button, Text, View } from "react-native"

export default function SignUp() {
  const router = useRouter();

  return (
    <View>
      <Text>
        Sign Up
      </Text>
      <Button
        title="Sign Up"
        onPress={() => router.push("/(auth)/sign-in")}
      />
    </View>
  )
}