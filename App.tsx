import React, { useState } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Marcellus_400Regular } from "@expo-google-fonts/marcellus";
import { useFonts } from "expo-font";
import ArticleScreen from "./screens/article";
import HomeScreen from "./screens/home";

const Stack = createStackNavigator();


const App = () => {
  const [grandparentValue, setGrandparentValue] = useState('');

  const handleParentValueChange = (newValue) => {
    // Receive the value from the parent and set it in the state
    setGrandparentValue(newValue)
    
  };

  const scheme = useColorScheme();

  DarkTheme.colors.text = 'white'
  
  let [fontsLoaded] = useFonts({
    Marcellus_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  

  return (
    <AppLayout onValueChange={handleParentValueChange} articleUrl={grandparentValue} scheme={scheme} />
  );
};

const AppLayout = ({ onValueChange, articleUrl, scheme }) => (

    <View style={[styles.body]}>
    
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: 'Latest News' }}
          initialParams={{ onValueChange }}
        >
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          initialParams={{ articleUrl }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
    </View>
  
);

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;
