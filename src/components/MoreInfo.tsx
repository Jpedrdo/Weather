import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, ScrollView, Text } from "react-native";
import {
  MoreInfoData,
  MoreInfo,
  moreInfosImgs,
  firstLetterUpperCase,
  nameMoreInfos,
  specialCharacterInfo,
} from "../utils";

interface Props {
  current: MoreInfoData | null;
}

const MainInfos = ({ current }: Props) => {
  const [moreInfo, setMoreInfo] = useState<MoreInfo[]>([]);

  useEffect(() => {
    if (current) {
      const infos: any = Object.entries(Object.assign({}, current))
        .filter((data) => nameMoreInfos.includes(data[0]))
        .map((data, i) => {
          return {
            value: data[1],
            name: firstLetterUpperCase(
              data[0] === "speed" ? "wind" : data[0].replace(/_/g, " ")
            ),
            icon: moreInfosImgs[i],
            specialCharacter: specialCharacterInfo[i],
          } as MoreInfo;
        });
      setMoreInfo(infos);
    }
  }, [current]);

  return (
    <View style={styles.mainView}>
      {moreInfo.length ? (
        <ScrollView horizontal={true}>
          {moreInfo.map(({ name, icon, value, specialCharacter }, i) => {
            return (
              <View key={i} style={styles.viewRow}>
                <Text style={styles.subText}>{name}</Text>
                <Image style={styles.weatherIcon} source={icon} />
                <Text style={styles.valueText}>{`${Math.trunc(
                  value
                )}${specialCharacter}`}</Text>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  viewRow: {
    display: "flex",
    flex: 1,
    paddingTop: 35,
    paddingBottom: 35,
    paddingRight: 28,
    paddingLeft: 28,
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: -2,
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginTop: 20,
  },
  subText: {
    color: "#ddd",
  },
  valueText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 6,
  },
});

export default MainInfos;
