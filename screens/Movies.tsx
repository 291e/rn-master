import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const SOME_API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTAxZmFjYjYwZDNmMGI0MTJiZWFjMDM0ZDFlNjE5MiIsIm5iZiI6MTcyMTg4MDEyNS4yNzkzNzMsInN1YiI6IjY2YTBjOTZhZmQ1ZDVjOWJmZWRkNzlmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4p4lJ5x5lJZDSQT-ZwevVLEgW_HtdsSjOVsUhGqyapE";

const Container = styled.ScrollView`
  background-color: ivory;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  font-size: 10px;
  opacity: 80;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0 30px;
  flex-direction: row;
`;

const HColumn = styled.View``;

const Movies: React.FC<NativeStackScreenProps<any, "movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpconming] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);

  const getTrending = async () => {
    const url = "https://api.themoviedb.org/3/trending/movie/week?";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${SOME_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json: MovieApiResponse = await response.json();
      setTrending(json.results);
    } catch (err) {
      console.error("error:" + err);
    }
  };

  const getUpcoming = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${SOME_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json: MovieApiResponse = await response.json();
      setUpconming(json.results);
    } catch (err) {
      console.error("error:" + err);
    }
  };
  const getNowPlaying = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${SOME_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json: MovieApiResponse = await response.json();
      setNowPlaying(json.results);
    } catch (err) {
      console.error("error:" + err);
    }
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        autoplay
        showsButtons={false}
        showsPagination={false}
        autoplayTimeout={3.5}
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>Trending Movies</ListTitle>
      <ListContainer>
        <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path}></Poster>
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              <Votes>
                {movie.vote_average > 0
                  ? `⭐️${movie.vote_average.toFixed(1)}/10`
                  : `Coming Soon`}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListTitle>Coming Soon</ListTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title></Title>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};
export default Movies;
