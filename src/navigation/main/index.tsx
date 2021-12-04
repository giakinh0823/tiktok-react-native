import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  authActions,
  selectAuthLoading,
  selectAuthUser,
} from "../../screens/Auth/authSlice";
import AuthScreen from "../../screens/Auth/index";
import HomeScreen from "../../screens/Home";
import EditProfile from "../../screens/Profile/Edit/EditProfile";
import SavePostScreen from "../../screens/SavePost/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditProfileFiled from '../../screens/Profile/EditProfileFiled';

const Stack = createNativeStackNavigator();

interface Props {}

const Navigation = (props: Props) => {
  const user = useAppSelector(selectAuthUser);
  const loading = useAppSelector(selectAuthLoading);
  const dispatch = useAppDispatch();
  const [currentUser, setCurrentUser] = React.useState(user);

  useEffect(() => {
    dispatch(authActions.getUser());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const currentUser = await AsyncStorage.getItem("user");
      setCurrentUser(JSON.parse(currentUser?? ""));
    })();
  }, [user]);

  return (
    <Stack.Navigator>
      {!Boolean(currentUser?.user?.uid) ? (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SavePost"
            component={SavePostScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfileField"
            component={EditProfileFiled}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
