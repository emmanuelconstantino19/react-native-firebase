import React, { useEffect, useState } from "react";

import { Text, View } from "react-native";

import { firebase } from "../../firebase/config";

import Curriculum from "../../components/Curriculum/Curriculum";
import ActualGrades from "../../components/ActualGrades/ActualGrades";

import { FontAwesome, Octicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const AdviseeGrades = (props) => {
  const studentID = props.route.params.adviseeId;
  const degreeProgramID = props.route.params.degreeProgramId;
  const fullName = props.route.params.fullName;
  const stdNumber = props.route.params.stdNumber;
  const degreeProgram = props.route.params.degreeProgram;

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
    .doc(studentID)
    .collection("academicRecords");

  const curriculumRef = firebase
    .firestore()
    .collection("programs")
    .doc(degreeProgramID)
    .collection("curriculum");

  useEffect(() => {
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
  }, []);

  return (
    <NavigationContainer independent={true}>
      <View style={{ paddingHorizontal: 40, paddingVertical: 20 }}>
        <Text>{fullName}</Text>
        <Text>{stdNumber}</Text>
        <Text>{degreeProgram}</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="Plan of Study"
          options={{
            tabBarActiveTintColor: "green",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => (
              <Octicons name="checklist" size={size} color={color} />
            ),
            headerShown: false,
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
            headerShown: false,
          }}
        >
          {() => <ActualGrades records={records} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AdviseeGrades;
