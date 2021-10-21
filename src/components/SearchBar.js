import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ onTextChange, onTextSubmit, value }) => {
  return (
    <View style={styles.container}>
      <Feather name="search" size={25} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Busca"
        style={styles.textInput}
        value={value}
        onChangeText={(newText) => onTextChange(newText)}
        onEndEditing={() => onTextSubmit(value)}
        onBlur={() => onTextSubmit(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "lightgray",
    margin: 10,
    alignItems: "center",
  },
  textInput: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
});

export default SearchBar;
