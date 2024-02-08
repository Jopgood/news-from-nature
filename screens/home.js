import React, {useState} from "react";
import { StyleSheet, View } from "react-native";

import RSSFeedComponent from "../components/rss-parser";


const Home = ({ navigation, route }) => {

    const { onValueChange } = route.params;

    const handleLinkClick = (url) => {
        onValueChange(url);
        navigation.navigate('Article', { articleUrl: url });
    };
    
    return <HomeLayout onLinkClick={handleLinkClick} />;
};

const HomeLayout = ({ onLinkClick }) => (
  <View style={styles.body}>
      <RSSFeedComponent feedUrl="https://www.nature.com/nature.rss" onLinkClick={onLinkClick} />
  </View>
);

const styles = StyleSheet.create({
});

export default Home;
