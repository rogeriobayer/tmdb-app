import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  FlatList,
  View,
  Text,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import tmdb from "../api/tmdb";

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState("movie");

  useEffect(() => {
    searchTmdb("", "movie");
  }, []);

  async function searchTmdb(query, category) {
    if (category) {
      setCategory(category);
    }

    let urlToCall;
    urlToCall = query ? `/search/${category}` : `/trending/${category}/day`;

    await tmdb
      .get(urlToCall, {
        params: {
          query,
          include_adult: false,
        },
      })
      .then((response) => {
        console.log(response);
        setResults(response.data.results);
      })
      .catch((error) => {
        console.log(err);
      });
  }

  function getURIImage(item) {
    return category == "person"
      ? "https://image.tmdb.org/t/p/w500" + item.profile_path
      : "https://image.tmdb.org/t/p/w500" + item.poster_path;
  }

  function getButtonColor(selected) {
    return selected == category ? "#cc8899" : "#e6c4cc";
  }

  function getName(item) {
    return category == "movie" && item.original_title
      ? item.original_title
      : item.name;
  }

  function getDate(item) {
    if (category == "movie" && item.release_date) {
      return item.release_date.slice(0, 4);
    } else if (item.first_air_date) {
      return item.first_air_date.slice(0, 4);
    } else {
      return "";
    }
  }

  function getRating(item) {
    return category == "person" ? item.popularity : item.vote_average;
  }

  return (
    <>
      <SearchBar
        value={text}
        onTextChange={(t) => setText(t)}
        onTextSubmit={(t) => searchTmdb(t, category)}
      />
      <View style={styles.fixToText}>
        <Button
          color={getButtonColor("movie")}
          title="Filmes"
          onPress={() => {
            searchTmdb(text, "movie");
          }}
        />
        <Button
          color={getButtonColor("tv")}
          title="TV"
          onPress={() => {
            searchTmdb(text, "tv");
          }}
        />
        <Button
          color={getButtonColor("person")}
          title="Pessoa"
          onPress={() => {
            searchTmdb(text, "person");
          }}
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("Details", {
                  id: item.id,
                  category,
                  title: item.original_title,
                })
              }
            >
              <View style={styles.containerItems}>
                <Image
                  style={styles.filmLogo}
                  source={{
                    uri: getURIImage(item),
                  }}
                />
                <View style={styles.titles}>
                  <Text style={styles.filmTitle}>{getName(item)}</Text>
                  <Text>{getDate(item)}</Text>
                </View>
              </View>

              <View style={styles.rating}>
                <Feather
                  style={styles.starIcon}
                  name="star"
                  size={13}
                  color="#d4a017"
                />
                <Text style={styles.textRating}>{getRating(item)}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  filmLogo: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    backgroundColor: "#B0E0E6",
    borderRadius: 25,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    padding: 5,
    borderRadius: 15,
  },
  titles: {
    marginLeft: 5,
  },
  filmTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
  },
  starIcon: { marginTop: 3, marginRight: 4 },
  textRating: {
    fontWeight: "bold",
    color: "#d4a017",
  },
  containerItems: {
    flexDirection: "row",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  categoryButtonActive: {
    color: "#cc8899",
  },
  categoryButtonInactive: {
    color: "#e6c4cc",
  },
});

export default HomeScreen;
