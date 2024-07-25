import React from "react";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../untills";
import { BlurView } from "expo-blur";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;
const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdrop_path) }}
      />
      <BlurView intensity={80} style={StyleSheet.absoluteFill}>
        <Wrapper>
          <Poster path={poster_path} />
          <Column>
            <Title>{original_title}</Title>
            {vote_average > 0 ? (
              <Votes>⭐️{vote_average.toFixed(1)}/10</Votes>
            ) : null}
            <Overview>
              {overview ? overview.slice(0, 90) : "No overview available"}...
            </Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
