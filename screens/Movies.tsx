import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: blue;
`;

const Movies: React.FC<NativeStackScreenProps<any, "movies">> = ({
  navigation: { navigate },
}) => (
  <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
    <Title>Movies</Title>
  </Btn>
);

export default Movies;
