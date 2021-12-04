import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import CameraScreen from "../../screens/Camera";
import FeedScreen from "../../screens/Feed";
import ProfileScreen from "../../screens/Profile";

interface Props {}

const Tab = createBottomTabNavigator();

const HomeNavigation = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarLabelStyle: { fontSize: 11 },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "#000" },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={CameraScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="plus-square" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="message-square" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="me"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="user" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;

