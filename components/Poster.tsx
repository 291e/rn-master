import React from "react";
import styled from "styled-components";
import { Image as RNImage } from "react-native";
import { makeImgPath } from "../untills";

const Image = styled(RNImage)`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Image source={{ uri: makeImgPath(path) }} />
);

export default Poster;
