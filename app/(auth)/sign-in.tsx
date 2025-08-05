import { useRouter } from "expo-router"
import { Button, Text, View } from "react-native"

export default function SignIn() {
  const router = useRouter();

  return (
    <View>
      <Text>
        SignIn
      </Text>
      <Button
        title="Sign In"
        onPress={() => router.push("/(auth)/sign-up")}
      />
    </View>
  )
}