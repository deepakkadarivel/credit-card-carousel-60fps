import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
  Animated,
  Text,
} from "react-native";
import chip from "./assets/images/chip.png";
import logo from "./assets/images/logo.png";

const cards = [
  {
    key: "visa",
    image: require("./assets/images/visa.png"),
    background: require("./assets/images/bg/visa.png"),
  },
  {
    key: "master",
    image: require("./assets/images/master.png"),
    background: require("./assets/images/bg/master.png"),
  },
  {
    key: "maestro",
    image: require("./assets/images/maestro.png"),
    background: require("./assets/images/bg/maestro.png"),
  },
  {
    key: "paypal",
    image: require("./assets/images/paypal.png"),
    background: require("./assets/images/bg/paypal.png"),
  },
];

export default function App() {
  const { width, height } = useWindowDimensions();
  const cardW = width * 0.7;
  const cardH = cardW * 1.54;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={[StyleSheet.absoluteFillObject]}>
        {cards.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <Animated.Image
              key={item.key}
              source={item.background}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              resizeMode="stretch"
              // blurRadius={10}
            />
          );
        })}
      </View>
      <Animated.FlatList
        data={cards}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          return (
            <View
              style={{
                width,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.View
                style={{
                  width: cardW,
                  height: cardH,
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [
                    {
                      scale,
                    },
                  ],
                }}
              >
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      backgroundColor: "#fff",
                      borderRadius: 20,
                      opacity: 0.3,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: -10,
                        height: 10,
                      },
                      shadowRadius: 10,
                      shadowOpacity: 1,
                      // elevation: 8,
                    },
                  ]}
                />
                <Image
                  style={{
                    width: 32,
                    height: 32,
                    position: "absolute",
                    top: 55,
                    left: 30,
                  }}
                  resizeMode="contain"
                  source={logo}
                />
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    top: 20,
                    right: 20,
                  }}
                  resizeMode="center"
                  source={chip}
                />
                <View
                  style={{
                    color: "white",
                    position: "absolute",
                    bottom: 80,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    0000 0000 1234 1234
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      color: "white",
                      textAlign: "left",
                      marginTop: 10,
                      opacity: 0.5,
                    }}
                  >
                    DEEPAK KADARI VELU
                  </Text>
                </View>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    bottom: 0,
                    right: 20,
                  }}
                  resizeMode="center"
                  source={item.image}
                />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
