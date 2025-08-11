import { CartButton } from "components/CartButton";
import { useLocalSearchParams } from "expo-router";
import { getCategories, getMenu } from "lib/appwrite";
import useAppwrite from "lib/useAppwrite";
import { useEffect } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native"
import cn from "clsx";
import { MenuCard } from "components/MenuCard";
import { Category, MenuItem } from "type";
import { SearchBar } from "components/SearchBar";
import { Filter } from "components/Filter";

const Search = () => {
  const { query, category } = useLocalSearchParams<{ query: string, category: string }>();
  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      limit: 6,
      query,
      category,
    }
  })
  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 })
  }, [query, category])

  return (
    <SafeAreaView
      className="bg-white h-full"
    >
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;

          return (
            <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? 'mt-10' : 'mt-0')}>
              <MenuCard item={item as unknown as MenuItem} />
            </View>
          )
        }}
        keyExtractor={item => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">Search</Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                </View>
              </View>

              <CartButton />
            </View>

            <SearchBar />

            <Filter categories={categories as unknown as Category[]} />
          </View>
        )}
        ListEmptyComponent={() => !loading && <Text>No results</Text>}
      />
      {/* <Button title="Seed" onPress={() => seed().catch(err => console.log(err))}/> */}
    </SafeAreaView>
  )
}

export default Search;