import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { firebase } from "../../firebase/config";

const AddAdvisee = (props) => {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  const studentsRef = firebase.firestore().collection("users");
  const adviseesRef = firebase
    .firestore()
    .collection("users")
    .doc(props.uid)
    .collection("advisees");

  useEffect(() => {
    studentsRef
      //   .where("roles", "==", {ADMIN:'ADMIN'})
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const studentsList = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            const record = doc.data();
            record.id = doc.id;
            studentsList.push(record);
          });
          setStudents(studentsList);
          setFilteredStudents(studentsList);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = students.filter(function (item) {
        const itemData =
          item.stdNumber.toUpperCase() +
          " " +
          item.fname.toUpperCase() +
          " " +
          item.lname.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredStudents(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredStudents(students);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={{ flexDirection: "row", marginLeft: 10, marginRight: 10 }}>
        <Text style={(styles.itemStyle, { flex: 1 })}>{item.stdNumber}</Text>
        <Text style={(styles.itemStyle, { flex: 3 })}>
          {item.fname.toUpperCase() + " " + item.lname.toUpperCase()}
        </Text>
        <Button
          onPress={() => getItem(item)}
          title="Add"
          color="green"
          accessibilityLabel="Add advisee"
        />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          margin: 10,
          height: 0.5,
          //   width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      stdNumber: item.stdNumber,
      fname: item.fname,
      lname: item.lname,
      degreeProgram: item.degreeProgram,
      degreeProgramId: item.degreeProgramId,
      createdAt: timestamp,
    };
    adviseesRef
      .doc(item.id)
      .set(data)
      .then((_doc) => {
        alert("Successfully added " + item.stdNumber + " as advisee");
        setSearch("");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View>
      {/* <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      > */}
      <TextInput
        style={{
          height: 48,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "white",
          margin: 10,
          paddingLeft: 16,
        }}
        placeholderTextColor="#aaaaaa"
        placeholder="Enter name of student"
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        // keyboardType="number-pad"
      />
      <FlatList
        style={{ marginTop: 16 }}
        data={filteredStudents}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
      {/* <TouchableOpacity
          style={{
            backgroundColor: "#788eec",
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            height: 48,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          // onPress={() => cashIn()}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Add
          </Text>
        </TouchableOpacity> */}
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
  },
});

export default AddAdvisee;
