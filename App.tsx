import React, { useState, useMemo } from "react";
import { StyleSheet, View, useColorScheme } from "react-native";

import { NavigationContainer, Theme, useTheme } from "@react-navigation/native";
import { darkTheme, lightTheme } from "./assets/css/themes";
import { createStackNavigator } from "@react-navigation/stack";

import { Marcellus_400Regular } from "@expo-google-fonts/marcellus";
import { useFonts } from "expo-font";
import ArticleScreen from "./screens/article";
import HomeScreen from "./screens/home";

const Stack = createStackNavigator();

const App = () => {
  const [grandparentValue, setGrandparentValue] = useState("");

  const handleParentValueChange = (newValue) => {
    setGrandparentValue(newValue);
  };

  const theme = useTheme();
  const scheme = useColorScheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  let [fontsLoaded] = useFonts({
    Marcellus_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppLayout
      onValueChange={handleParentValueChange}
      articleUrl={grandparentValue}
      theme={theme}
      styles={styles}
      scheme={scheme}
    />
  );
};

const AppLayout = ({ onValueChange, articleUrl, styles, theme, scheme }) => (
  <View style={[styles.body]}>
    <NavigationContainer theme={scheme == "dark" ? darkTheme : lightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: "Latest News" }}
          initialParams={{ onValueChange }}
        >
          {(props) => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          initialParams={{ articleUrl }}
          options={{
            headerBackTitleVisible: false,
            headerTitle: "",
            headerStyle: styles.header,
            headerBackTitleStyle: { color: theme.colors.primary },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </View>
);

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    body: {
      flex: 1,
    },
  });

export default App;
