import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { globalStyles } from "../styles/global";
import jourStyles from "../styles/jour";
import Grid from "../components/Grid";
import Card from "../components/Card";
import CheckDollar from "../icons/CheckDollar";
import { fourth_color } from "../styles/vars";
import Textc from "../components/Textc";
import Wallet from "../icons/Wallet";

export default function Epargne() {
  return (
    <ScrollView style={[globalStyles.pageContainer, jourStyles.jourContainer]}>
      <Grid nCols={2} style={jourStyles.miniCardContainer}>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.left]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.left]}>
            <TouchableOpacity style={jourStyles.miniCardContent}>
              <View style={jourStyles.miniCardContent}>
                <CheckDollar color={fourth_color} size={2} />
                <View>
                  <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                    Budget
                  </Textc>
                  <Textc style={jourStyles.p}>0DT</Textc>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        </ImageBackground>
        <ImageBackground
          source={require("../assets/waves.png")}
          imageStyle={[globalStyles.waveBG, jourStyles.right]}
        >
          <Card style={[jourStyles.miniCard, jourStyles.right]}>
            <View style={[jourStyles.miniCardContent]}>
              <Wallet
                style={{ marginLeft: 4, transform: [{ rotate: "-45deg" }] }}
                color={fourth_color}
                size={1.8}
              />
              <View>
                <Textc style={[jourStyles.p, jourStyles.miniCardTitle]}>
                  Reste
                </Textc>
                <Textc style={jourStyles.p}>0DT</Textc>
              </View>
            </View>
          </Card>
        </ImageBackground>
      </Grid>
    </ScrollView>
  );
}
