import React, { useEffect, useState } from "react";
import {
  Image,
  FlatList,
  Keyboard,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

import Curriculum from "../../components/Curriculum/Curriculum";
import ActualGrades from "../../components/ActualGrades/ActualGrades";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function HomeScreen(props) {
  //   const [entityText, setEntityText] = useState("");
  //   const [entities, setEntities] = useState([]);
  const [records, setRecords] = useState([]);

  const [acadRecords, setAcadRecords] = useState({});
  const [curriculum, setCurriculum] = useState({
    "First Year": {
      "1st Semester": [],
      "2nd Semester": [],
      Midyear: [],
    },
    "Second Year": {
      "1st Semester": [],
      "2nd Semester": [],
      Midyear: [],
    },
  });

  //   const entityRef = firebase.firestore().collection("entities");
  const academicRecordsRef = firebase
    .firestore()
    .collection("users")
    .doc(props.extraData.uid)
    .collection("academicRecords");

  const curriculumRef = firebase
    .firestore()
    .collection("programs")
    .doc(props.extraData.degreeProgramId)
    .collection("curriculum");
  //   const userID = props.extraData.uid;

  useEffect(() => {
    // entityRef
    //   .where("authorID", "==", userID)
    //   .orderBy("createdAt", "desc")
    //   .onSnapshot(
    //     (querySnapshot) => {
    //       const newEntities = [];
    //       querySnapshot.forEach((doc) => {
    //         const entity = doc.data();
    //         entity.id = doc.id;
    //         newEntities.push(entity);
    //       });
    //       setEntities(newEntities);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );

    academicRecordsRef
      //   .where("authorID", "==", userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const acadRecords = {};
          const newRecords = [];
          querySnapshot.forEach((doc) => {
            acadRecords[doc.data().courseCode] = doc.data().finalGrade;
            const record = doc.data();
            record.id = doc.id;
            newRecords.push(record);
          });
          setAcadRecords(acadRecords);
          setRecords(newRecords);
        },
        (error) => {
          console.log(error);
        }
      );

    curriculumRef.orderBy("createdAt", "asc").onSnapshot(
      (querySnapshot) => {
        const curriculum = {
          "First Year": {
            "1st Semester": [],
            "2nd Semester": [],
            Midyear: [],
          },
          "Second Year": {
            "1st Semester": [],
            "2nd Semester": [],
            Midyear: [],
          },
        };
        querySnapshot.forEach((doc) => {
          curriculum[doc.data().year][doc.data().term].push({
            ...doc.data(),
            uid: doc.id,
          });
        });
        setCurriculum(curriculum);
      },
      (error) => {
        console.log(error);
      }
    );

    // academicRecordsRef
    //   //   .where("authorID", "==", userID)
    //   .orderBy("createdAt", "desc")
    //   .onSnapshot(
    //     (querySnapshot) => {
    //       const newRecords = [];
    //       querySnapshot.forEach((doc) => {
    //         const record = doc.data();
    //         record.id = doc.id;
    //         newRecords.push(record);
    //       });
    //       setRecords(newRecords);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }, []);

  const onAddButtonPress = () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        authorID: userID,
        createdAt: timestamp,
      };
      entityRef
        .add(data)
        .then((_doc) => {
          setEntityText("");
          Keyboard.dismiss();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {index}. {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={"#5A0000"} />
      <View style={{ backgroundColor: "#5A0000" }}>
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* <TouchableOpacity
          onPress={() => firebase.auth().signOut()}
          title="Info"
          color="#fff"
          style={{ marginRight: 20 }}
        >
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity> */}
          <Image
            // style={styles.logo}
            style={{ width: 30, height: 30 }}
            source={require("../../../assets/icon.png")}
          />
          <Text style={{ color: "white", fontSize: 20, margin: "auto" }}>
            {"Student Progress Monitoring"}
          </Text>
          <TouchableOpacity
            onPress={() => firebase.auth().signOut()}
            title="Info"
            color="#646464"
            // style={{ marginRight: 20 }}
          >
            <MaterialIcons
              name="logout"
              size={20}
              color="white"
              style={{ margin: "auto" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#800000",
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        }}
      >
        <View style={{ padding: 40 }}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
            {"Hello, "}
            {props.extraData.fname}
            {"!"}
          </Text>
          <Text style={{ color: "white", fontSize: 16, marginTop: 16 }}>
            {props.extraData.stdNumber}
            {"\n"}
            {props.extraData.degreeProgram}
          </Text>
        </View>
      </View>

      {/* <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 6,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#5A0000", //#385400
          borderRadius: 20,
          marginVertical: 20,
          marginHorizontal: 16,
          alignitems: "center",
        }}
      >
        <MaterialIcons name="search" size={24} color="white" />
      </View> */}

      {/* <View
        style={{
          borderBottomColor: "#E6E6E6",
          borderBottomWidth: 1,
        }}
      /> */}

      {/* Insert code here to get curriculum */}
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen
            name="Plan of Study"
            options={{
              tabBarActiveTintColor: "green",
              tabBarInactiveTintColor: "gray",
              tabBarIcon: ({ focused, color, size }) => (
                <Octicons name="checklist" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <Curriculum curriculum={curriculum} acadRecords={acadRecords} />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Actual Courses Taken"
            options={{
              tabBarActiveTintColor: "green",
              tabBarInactiveTintColor: "gray",
              tabBarIcon: ({ focused, color, size }) => (
                <FontAwesome name="list-ul" size={size} color={color} />
              ),
            }}
          >
            {() => <ActualGrades records={records} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>

      {/* <View
        style={{
          padding: 20,
          backgroundColor: "white",
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 24 }}> Academic Records </Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Course Taken</DataTable.Title>
            <DataTable.Title numeric>Final Grade</DataTable.Title>
          </DataTable.Header>
          {records &&
            records.map((data) => {
              return (
                <DataTable.Row key={data.id}>
                  <DataTable.Cell>{data.courseCode}</DataTable.Cell>
                  <DataTable.Cell numeric>{data.finalGrade}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable>
      </View> */}

      {/* <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new entity"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEntityText(text)}
          value={entityText}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )} */}

      {/* <View style={{ padding: "20px" }}>
        <Text>
          Name: {props.extraData.fname} {props.extraData.lname}
        </Text>
        <Text>Student Number: {props.extraData.stdNumber}</Text>
        <Text>Degree Program: {props.extraData.degreeProgram}</Text>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Course Taken</DataTable.Title>
          <DataTable.Title numeric>Final Grade</DataTable.Title>
        </DataTable.Header>
        {records &&
          records.map((data) => {
            return (
              <DataTable.Row key={data.id}>
                <DataTable.Cell>{data.courseCode}</DataTable.Cell>
                <DataTable.Cell numeric>{data.finalGrade}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable> */}

      {/* {records && (
        <View style={styles.listContainer}>
          <FlatList
            data={records}
            renderItem={renderRecord}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )} */}
    </View>
  );
}
