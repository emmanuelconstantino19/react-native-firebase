import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import {decode, encode} from 'base-64'
import { Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    const authListener = firebase.auth().onAuthStateChanged(user => {
      // user logged in
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setUser(null)
        setLoading(false)
      }
    });

    return authListener;
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
            <Stack.Screen 
              name="Home" 
              options={{
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => firebase.auth().signOut()}
                    title="Info"
                    color="#fff"
                    style={{marginRight: 20}}
                  >
                    <MaterialIcons name="logout" size={24} color="black" />
                  </TouchableOpacity>
                ),
              }}
            >
              {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            {/* <Stack.Screen name="Cash In" component={CashInScreen} />
            <Stack.Screen name="Pay Bills" component={PayBillsScreen} />
            <Stack.Screen name="Select Biller" component={PayBillsScreenBiller} />
            <Stack.Screen name="Buy Load" component={BuyLoadScreen} />
            <Stack.Screen name="Bank Transfer" component={BankTransferScreen} />
            <Stack.Screen name="Pockket Trace" component={PockketTraceScreen} />
            <Stack.Screen name="Pockket Bits" component={PockketBitsScreen} />
            <Stack.Screen name="Fund Transfer" component={FundTransferScreen} />
            <Stack.Screen name="Pay QR" component={PayQRScreen} />
            <Stack.Screen name="Scan QR" component={ScanQRScreen} />
            <Stack.Screen name="My Pockket QR" component={MyPockketQRScreen} /> */}
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{headerShown: false}}/>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
