import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, View, Image } from "react-native";

interface Props {
  getData(text: string): Promise<void>;
}

const SearchInput = ({ getData }: Props) => {
  const [textSearch, setTextSearch] = useState<string>("");

  const handleSearch = (text: string) => setTextSearch(text);

  useEffect(() => {
    if (textSearch.length) {
      const delayDebounceFn = setTimeout(() => {
        getData(textSearch);
      }, 650);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [textSearch]);

  return (
    <View>
      <View style={styles.searchSection}>
        <Image
          style={styles.searchIcon}
          source={require("../imgs/search.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Search by countries, cities, etc..."
          underlineColorAndroid="transparent"
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 7,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    height: 65,
    color: "#424242",
  },
});

export default SearchInput;
