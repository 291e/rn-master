import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

const HMovie = styled.View`
  padding: 0 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: black;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  font-size: 12px;
  color: black;
  font-weight: 500;
  opacity: 0.6;
  margin-vertical: 10px;
`;

const Title = styled.Text`
  font-weight: 600;
  margin-top: 7px;
`;

interface HMediaProps {
  poster_Path: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  poster_Path,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  return (
    <HMovie>
      <Poster path={poster_Path} />
      <HColumn>
        <Title>{originalTitle}</Title>
        {releaseDate ? (
          <Release>
            {new Date(releaseDate).toLocaleDateString("ko", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Release>
        ) : null}
        {voteAverage ? <Votes votes={voteAverage} /> : null}
        <Overview>
          {overview !== "" && overview.length > 13
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;
