import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Image, View, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";

import tmdb from "../api/tmdb";

const DetailsScreen = ({ navigation, route }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const categoryParam = route.params.category;

  async function getMovie(id, category) {
    console.log(category);
    try {
      const response = await tmdb.get(`/${category}/${id}`);
      console.log(response.data);
      setMovie(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  function getName() {
    return categoryParam == "movie" && movie.original_title
      ? movie.original_title
      : movie.name;
  }

  function getOverview() {
    return categoryParam == "person" ? movie.biography : movie.overview;
  }

  function getRating() {
    return categoryParam == "person" ? movie.popularity : movie.vote_average;
  }

  function getDate() {
    if (categoryParam == "movie" && movie.release_date) {
      return movie.release_date.slice(0, 4);
    } else if (movie.first_air_date) {
      return movie.first_air_date.slice(0, 4);
    } else {
      return (
        movie.birthday.slice(0, 4) +
        (movie.deathday ? " - " + movie.deathday : "")
      );
    }
  }

  function getURIImage(item) {
    return categoryParam == "person"
      ? "https://image.tmdb.org/t/p/w500" + item.profile_path
      : "https://image.tmdb.org/t/p/w500" + item.poster_path;
  }

  useEffect(() => {
    getMovie(route.params.id, categoryParam);
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Image
            style={styles.filmLogo}
            source={{
              uri: getURIImage(movie),
            }}
          />
          <Text style={styles.filmTitle}>{getName()}</Text>
          <Text style={styles.dateText}>{getDate()}</Text>

          <View style={styles.rating}>
            <Feather
              style={styles.starIcon}
              name="star"
              size={13}
              color="#d4a017"
            />
            <Text style={styles.textRating}>{getRating()}</Text>
          </View>
          {categoryParam != "person" ? (
            <View>
              <Text style={styles.overview}>
                <Text style={styles.bold}>País: </Text>
                {movie.production_countries
                  ? movie.production_countries[0].name
                  : "N/A"}
              </Text>
              <Text style={styles.overview}>
                <Text style={styles.bold}>Produtora: </Text>
                {movie.production_companies
                  ? movie.production_companies[0].name
                  : "N/A"}
              </Text>
            </View>
          ) : (
            <View></View>
          )}
          <Text style={styles.overview}> {getOverview()}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  filmLogo: {
    width: "100%",
    height: "40%",
    resizeMode: "cover",
    backgroundColor: "#B0E0E6",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  filmTitle: {
    margin: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  productionLogo: {
    width: 50,
    height: 50,
  },
  overview: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 15,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 15,
  },
  dateText: {
    fontWeight: "bold",
    marginHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    color: "#808080",
  },
  rating: {
    flexDirection: "row",
  },
  starIcon: { marginLeft: 10, marginRight: 5, marginTop: 6 },
  textRating: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d4a017",
  },
});

export default DetailsScreen;
