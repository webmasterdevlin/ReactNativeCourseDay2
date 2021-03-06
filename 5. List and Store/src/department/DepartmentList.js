import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import {
  Container,
  Footer,
  Content,
  View,
  Text,
  Button,
  Icon,
  SwipeRow,
  Fab
} from "native-base";

import { inject, observer } from "mobx-react";
import DepartmentStore from "./DepartmentStore";

class DepartmentList extends Component {
  async componentDidMount() {
    await DepartmentStore.loadDepartments();
  }

  handleEditDepartment = id => {
    alert("handleEditDepartment");
  };

  handleDeleteDepartment = department => {
    Alert.alert(
      "Deleting Department",
      "Are you sure you want to delete this department?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            await DepartmentStore.removeDepartment(department);
          },
          styles: "destructive"
        }
      ]
    );
  };
  render() {
    return (
      <Container>
        <Content scrollEnabled={true}>
          {DepartmentStore.departments.map(d => (
            <SwipeRow
              key={d.id}
              leftOpenValue={75}
              rightOpenValue={-75}
              left={
                <Button success onPress={() => this.handleEditDepartment(d.id)}>
                  <Icon active name="create" />
                </Button>
              }
              body={
                <View style={styles.cell}>
                  <View>
                    <Text>{d.name}</Text>
                    <Text note>{d.description}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text>{d.head}</Text>
                  </View>
                </View>
              }
              right={
                <Button danger onPress={() => this.handleDeleteDepartment(d)}>
                  <Icon active name="trash" />
                </Button>
              }
            />
          ))}
        </Content>
        <View style={{ flex: 0.2 }}>
          <Fab
            position="bottomRight"
            onPress={() => alert("onPress of Fab")}
            style={{ backgroundColor: "#9C27B0" }}
          >
            <Icon name="star" />
          </Fab>
        </View>
        <Footer style={styles.footer}>
          <Text style={styles.footerText} note>
            Total number of departments: {DepartmentStore.departments.length}
          </Text>
        </Footer>
      </Container>
    );
  }
}

export default inject("DepartmentStore")(observer(DepartmentList));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 20
  },
  cell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  footer: {
    backgroundColor: "#9C27B0",
    alignItems: "center"
  },
  footerText: {
    color: "white"
  }
});
