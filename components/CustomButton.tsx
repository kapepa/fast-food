import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { images } from "../constants/index"
import cn from "clsx"

interface CustomButtonProps extends TouchableOpacityProps {
  leftIcon?: keyof typeof images,
  isLoading?: boolean,
  classText?: string
}

const CustomButton = (props: CustomButtonProps) => {
  const { className, style, isLoading = false, classText, children, leftIcon } = props;

  return (
    <TouchableOpacity
      className={cn("flex-center flex-row custom-btn", className)}
      style={style}
      {...props}
    >
      {leftIcon}
      {
        isLoading
          ? (
            <ActivityIndicator
              size="small"
              color="white"
            />
          )
          : (
            <Text
              className={cn('text-white-100 paragraph-semibold', classText)}
            >
              {children}
            </Text>
          )
      }
    </TouchableOpacity>
  )
}

export { CustomButton }