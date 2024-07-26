import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  margin-top: 7px;
  margin-bottom: 5px;
  font-weight: 600;
`;

interface VMediaProps {
  poster_Path: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  poster_Path,
  originalTitle,
  voteAverage,
}) => (
  <Movie>
    <Poster path={poster_Path} />
    <Title>
      {originalTitle.slice(0, 13)}
      {originalTitle.length > 13 ? "..." : null}
    </Title>
    <Votes votes={voteAverage} />
  </Movie>
);

export default VMedia;
