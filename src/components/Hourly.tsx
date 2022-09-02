import React from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import { ForecastData } from "../utils";
import moment from "moment";

interface Props {
  forecast: ForecastData[];
}

const Hourly = ({ forecast }: Props) => (
  <View style={styles.mainView}>
    {forecast.length ? (
      <ScrollView horizontal={true}>
        {forecast.map(({ main, temp, dt_txt, icon }, i) => {
          return (
            <View key={i} style={styles.viewRow}>
              <Text style={styles.subText}>{moment(dt_txt).format("LT")}</Text>
              <View style={styles.viewWeather}>
                <Image
                  style={styles.weatherIcon}
                  source={{
                    uri: icon,
                  }}
                />
                <Text style={styles.temp}>{Math.trunc(temp)} °C</Text>
              </View>
              <Text style={styles.subText}>{main}</Text>
            </View>
          );
        })}
      </ScrollView>
    ) : (
      <></>
    )}
  </View>
);

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    justifyContent: "center",
    marginTop: 18,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  viewRow: {
    display: "flex",
    flex: 1,
    paddingTop: 35,
    paddingBottom: 35,
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherIcon: {
    width: 90,
    height: 60,
    marginTop: 20,
  },
  viewWeather: {
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  temp: {
    marginBottom: 5,
    color: "#fff",
    fontWeight: "bold",
  },
  subText: {
    color: "#ddd",
  },
});

export default Hourly;
