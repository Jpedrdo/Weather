import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SearchInput, Hourly, MainInfo, MoreInfo } from "../components";
import { formattedWeartherData } from "../services";
import { LinearGradient } from "expo-linear-gradient";
import {
  CurrentData,
  ForecastData,
  defaultGradient,
  defaultTextSearch,
} from "../utils";

const Screens = () => {
  const [current, setCurrent] = useState<CurrentData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [gradient, setGradient] = useState<Array<string>>(defaultGradient);
  const [loading, setLoading] = useState<boolean>(true);

  const onError = () => {
    return Alert.alert(
      "Atention",
      "There was an error with the search or with the database. Try again."
    );
  };

  const getData = async (text: string) => {
    setLoading(true);
    const { formatedCurent, formatedForecast } = await formattedWeartherData({
      textSearch: text,
    });

    if (formatedCurent.error) {
      onError();
    } else {
      const { temp } = formatedCurent;
      setCurrent(formatedCurent);
      setForecast(formatedForecast);
      setGradient(temp < 20 ? ["#123699", "#0f648e"] : ["#8a2d09", "#9b5207"]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(defaultTextSearch);
  }, []);

  return (
    <LinearGradient
      colors={loading ? defaultGradient : gradient}
      style={styles.linearGradient}
    >
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <SearchInput getData={getData} />
          {!loading && (
            <View>
              <MainInfo current={current} />
              <Hourly forecast={forecast} />
              <MoreInfo current={current} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      {loading && (
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  viewLoading: {
    flex: 0.93,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Screens;
