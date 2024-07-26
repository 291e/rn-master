import React from "react";
import styled from "styled-components/native";
import { Image as RNImage } from "react-native";
import { makeImgPath } from "../untills";

const Image = styled(RNImage)`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Image source={{ uri: makeImgPath(path) }} />
);

export default Poster;
