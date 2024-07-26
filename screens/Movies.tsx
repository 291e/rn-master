import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";
import HMedia from "../components/HMedia";
import { RootTabParams } from "../navigationType";

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

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeparator = styled.View`
  width: 30px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<
  NativeStackScreenProps<RootTabParams, "Movies">
> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpconming] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  const renderHMedia = ({ item }: { item: Movie }) => (
    <HMedia
      key={item.id}
      poster_Path={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const renderVMedia = ({ item }: { item: Movie }) => (
    <VMedia
      poster_Path={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const moviekeyExtractor = (item: Movie) => item.id + "";
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            showsButtons={false}
            showsPagination={false}
            autoplayTimeout={3.5}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 40,
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
          <ListTitle>현재 상영작</ListTitle>
          <FlatList
            data={trending}
            keyExtractor={moviekeyExtractor}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={VSeparator}
            renderItem={renderVMedia}
          />
          <ListContainer></ListContainer>
          <ComingSoonTitle>출시 예정작</ComingSoonTitle>
        </>
      }
      keyExtractor={moviekeyExtractor}
      ItemSeparatorComponent={HSeparator}
      data={upcoming}
      renderItem={renderHMedia}
    />
  );
};
export default Movies;
