import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class DepartmentList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DepartmentList works!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40
  }
});
