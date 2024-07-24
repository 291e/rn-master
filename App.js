import { useCallback, useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Root />
    </NavigationContainer>
  );
}
