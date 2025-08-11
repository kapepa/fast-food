import { CustomButton } from "components/CustomButton";
import { CustomInput } from "components/CustomInput";
import { Link, useRouter } from "expo-router"
import { signIn } from "lib/appwrite";
import { useState } from "react";
import { Alert, Text, View } from "react-native"

export default function SignIn() {
  const router = useRouter();
  const [isSubmitting, setIsSUbmitting] = useState<boolean>(false);
  const [form, setForm] = useState<{ email: string, password: string }>({ email: "kapepayx@gmail.com", password: "Uva56945829!" });

  const handlerSubmit = async () => {
    if (!form.email || !form.password) return Alert.alert("Error", "Please enter valid email or password");
    setIsSUbmitting(true)

    try {
      await signIn(form);
      router.replace("/");
    } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) errorMessage = error.message;
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSUbmitting(false)
    }
  }

  return (
    <View
      className="gap-10 bg-white rounded-lg p-5 mt-5"
    >
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        label="Email"
        onChangeText={(text) => setForm((prev) => ({ email: text, password: prev.password }))}
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        label="Password"
        onChangeText={(text) => setForm((prev) => ({ email: prev.email, password: text }))}
        secureTextEntry={true}
      />
      <CustomButton
        isLoading={isSubmitting}
        onPress={handlerSubmit}
      >
        Sign In
      </CustomButton>

      <View
        className="flex justify-center mt-5 flex-row gap-2"
      >
        <Text
          className="base-regular text-gray-100"
        >
          Don't have an account?
        </Text>
        <Link
          href={"/sign-up"}
          className="base-bold text-primary"
        >
          Sign Up
        </Link>
      </View>
    </View>
  )
}