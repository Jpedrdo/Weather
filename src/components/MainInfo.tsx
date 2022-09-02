import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { CurrentData } from "../utils";
import moment from "moment";

interface Props {
  current: CurrentData | null;
}

const MainInfos = ({ current }: Props) => {
  const [infos, setInfos] = useState<CurrentData>();

  useEffect(() => {
    if (current) {
      setInfos(current);
    }
  }, [current]);

  return (
    <View style={styles.mainView}>
      <View style={styles.infos}>
        <Text style={styles.name}>{`${infos?.name}, ${infos?.country}`}</Text>
        <Text style={styles.subText}>{moment().format("dddd, LL")}</Text>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: infos?.icon,
          }}
        />
        <Text style={styles.temp}>{Math.trunc(infos?.temp || 0)} °C</Text>
        <Text style={styles.subText}>{infos?.details}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: 10,
  },
  infos: {
    display: "flex",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  weatherIcon: {
    width: 120,
    height: 80,
    marginTop: 20,
  },
  temp: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  subText: {
    color: "#ddd",
  },
});

export default MainInfos;
