import { useState } from "react"
import { Text, TextInput, TextInputProps, View } from "react-native"
import cn from "clsx"

interface CustomInputProps extends TextInputProps {
  label?: string
}

const CustomInput = (props: CustomInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <View
      className="w-full"
    >
      <Text
        className="label"
      >
        {props.label}
      </Text>

      <TextInput
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        autoCorrect={false}
        autoCapitalize="none"
        className={cn("input", isFocus ? "border-primary" : "border-gray-300")}
        placeholderTextColor="#888"
        {...props}
      />
    </View>
  )
}

export { CustomInput }