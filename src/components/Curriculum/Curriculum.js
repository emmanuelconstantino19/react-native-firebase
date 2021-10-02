import React from "react";
import { Text, View, ScrollView } from "react-native";

import { DataTable } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const Curriculum = (props) => {
  return (
    <ScrollView>
      <View
        style={{
          padding: 20,
          backgroundColor: "#F0F0F0",
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}> First Year - 1st Semester </Text>
        <Text style={{ fontSize: 16 }}> </Text>
        <DataTable>
          <DataTable.Header>
            {/* <DataTable.Title>Term</DataTable.Title> */}
            <DataTable.Title></DataTable.Title>
            <DataTable.Title>Course</DataTable.Title>
            <DataTable.Title numeric>Final Grade</DataTable.Title>
          </DataTable.Header>
          {/* {records &&
            records.map((data) => {
              return (
                <DataTable.Row key={data.id}>
                  <DataTable.Cell>
                    <FontAwesome
                      name="check-square-o"
                      size={24}
                      color="green"
                    />
                  </DataTable.Cell>
                  <DataTable.Cell>{data.courseCode}</DataTable.Cell>
                  <DataTable.Cell numeric>{data.finalGrade}</DataTable.Cell>
                </DataTable.Row>
              );
            })} */}

          {props.curriculum["First Year"]["1st Semester"].map((course) => (
            <DataTable.Row>
              <DataTable.Cell>
                {props.acadRecords[course.courseCode] ? (
                  <FontAwesome name="check-square-o" size={24} color="green" />
                ) : (
                  <FontAwesome name="square-o" size={24} color="green" />
                )}{" "}
              </DataTable.Cell>
              <DataTable.Cell>{course.courseCode}</DataTable.Cell>
              <DataTable.Cell numeric>
                {props.acadRecords[course.courseCode]
                  ? props.acadRecords[course.courseCode]
                  : "--"}{" "}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: "#F0F0F0",
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}> First Year - 2nd Semester </Text>
        {props.curriculum["First Year"]["2nd Semester"].map((course) => (
          <DataTable.Row>
            <DataTable.Cell>
              {props.acadRecords[course.courseCode] ? (
                <FontAwesome name="check-square-o" size={24} color="green" />
              ) : (
                <FontAwesome name="square-o" size={24} color="green" />
              )}{" "}
            </DataTable.Cell>
            <DataTable.Cell>{course.courseCode}</DataTable.Cell>
            <DataTable.Cell numeric>
              {props.acadRecords[course.courseCode]
                ? props.acadRecords[course.courseCode]
                : "--"}{" "}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </View>

      <View
        style={{
          padding: 20,
          backgroundColor: "#F0F0F0",
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}> Second Year - 1st Semester </Text>
        {props.curriculum["Second Year"]["1st Semester"].map((course) => (
          <DataTable.Row>
            <DataTable.Cell>
              {props.acadRecords[course.courseCode] ? (
                <FontAwesome name="check-square-o" size={24} color="green" />
              ) : (
                <FontAwesome name="square-o" size={24} color="green" />
              )}{" "}
            </DataTable.Cell>
            <DataTable.Cell>{course.courseCode}</DataTable.Cell>
            <DataTable.Cell numeric>
              {props.acadRecords[course.courseCode]
                ? props.acadRecords[course.courseCode]
                : "--"}{" "}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </View>

      <View
        style={{
          padding: 20,
          backgroundColor: "#F0F0F0",
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontSize: 16 }}> Second Year - 2nd Semester </Text>
        {props.curriculum["Second Year"]["2nd Semester"].map((course) => (
          <DataTable.Row>
            <DataTable.Cell>
              {props.acadRecords[course.courseCode] ? (
                <FontAwesome name="check-square-o" size={24} color="green" />
              ) : (
                <FontAwesome name="square-o" size={24} color="green" />
              )}{" "}
            </DataTable.Cell>
            <DataTable.Cell>{course.courseCode}</DataTable.Cell>
            <DataTable.Cell numeric>
              {props.acadRecords[course.courseCode]
                ? props.acadRecords[course.courseCode]
                : "--"}{" "}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </View>
    </ScrollView>
  );
};

export default Curriculum;
