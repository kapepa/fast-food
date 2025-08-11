import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { images } from "../constants/index"
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState<string>(params.query || "");

  // const debouncedSearch = useDebouncedCallback(
  //   (text: string) => router.push(`/search?query=${text}`),
  //   500,
  // )

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) router.setParams({ query: undefined })
    // debouncedSearch(text)
  }

  const handlerSubmit = () => {
    if (query.trim()) router.setParams({ query })
  }

  return (
    <View
      className="searchbar"
    >
      <TextInput
        value={query}
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers ..."
        onChangeText={handleSearch}
        onSubmitEditing={handlerSubmit}
        placeholderTextColor="#A0A0A0"
        returnKeyType="search"
      />
      <TouchableOpacity
        onPress={() => router.setParams({ query })}
        className="pr-5"
      >
        <Image
          source={images.search}
          className="size-6"
          tintColor="#5D5F6D"
        />
      </TouchableOpacity>
    </View>
  )
}

export { SearchBar }