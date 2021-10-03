import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TextInput, Button } from "react-native";

import { DataTable } from "react-native-paper";
import { firebase } from "../../firebase/config";

const Advisees = (props) => {
  const navigation = props.navigation;
  const [advisees, setAdvisees] = useState([]);

  const adviseesRef = firebase
    .firestore()
    .collection("users")
    .doc(props.uid)
    .collection("advisees");

  useEffect(() => {
    adviseesRef
      //   .where("authorID", "==", userID)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (querySnapshot) => {
          const adviseesList = [];
          querySnapshot.forEach((doc) => {
            const record = doc.data();
            record.id = doc.id;
            adviseesList.push(record);
          });
          setAdvisees(adviseesList);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const displayData = (data) => {
    alert(data);
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "#F0F0F0",
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 20,
        }}
      >
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Std Number</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Name</DataTable.Title>
            <DataTable.Title></DataTable.Title>
            {/* <DataTable.Title numeric>Final Grade</DataTable.Title> */}
          </DataTable.Header>
          {advisees.map((data) => {
            return (
              <DataTable.Row key={data.id}>
                <DataTable.Cell>{data.stdNumber}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2 }}>
                  {data.fname} {data.lname}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <Button
                    onPress={() =>
                      navigation.navigate("Advisee Grades", {
                        adviseeId: data.id,
                        degreeProgramId: data.degreeProgramId,
                        stdNumber: data.stdNumber,
                        fullName:
                          data.fname.toUpperCase() +
                          " " +
                          data.lname.toUpperCase(),
                        degreeProgram: data.degreeProgram,
                      })
                    }
                    title="VIEW"
                    color="green"
                    accessibilityLabel="View advisee"
                  />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default Advisees;
