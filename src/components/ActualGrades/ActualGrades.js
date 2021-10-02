import React from "react";
import { Text, View, ScrollView } from "react-native";

import { DataTable } from "react-native-paper";

const ActualGrades = (props) => {
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
            <DataTable.Title style={{ flex: 3 }}>Term</DataTable.Title>
            <DataTable.Title>Course</DataTable.Title>
            <DataTable.Title numeric>Final Grade</DataTable.Title>
          </DataTable.Header>
          {props.records.map((data) => {
            return (
              <DataTable.Row key={data.id}>
                <DataTable.Cell style={{ flex: 3 }}>{data.term}</DataTable.Cell>
                <DataTable.Cell>{data.courseCode}</DataTable.Cell>
                <DataTable.Cell numeric>{data.finalGrade}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default ActualGrades;
