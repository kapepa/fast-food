import { images } from "../constants/index"
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native"

const CartButton = () => {
  const totalItems = 10;

  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => { }}
    >
      <Image
        source={images.bag}
        className="size-5"
      />
      {totalItems > 0 && (
        <View
          className="card-badge"
        >
          <Text
            className="small-bold text-white"
          >
            {totalItems}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export { CartButton }