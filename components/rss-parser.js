import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Linking } from 'react-native';
import RssParser from 'react-native-rss-parser';
import { useTheme } from '@react-navigation/native';

import OpenLinkText from './link-opener';


const RSSFeedComponent = ({ feedUrl, onLinkClick  }) => {
  const [feedData, setFeedData] = useState([]);

  const onPress = (url) => {
    onLinkClick(url)
  }

  const { colors } = useTheme();

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const response = await fetch(feedUrl);
        const text = await response.text();
        const parsedData = await RssParser.parse(text);

        // Filter items based on the URL condition
        const filteredItems = parsedData.items.filter(
          (item) => item.links[0].url.startsWith('https://www.nature.com/articles/d')
        );

        setFeedData(filteredItems);
      } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
      }
    };

    fetchRSSFeed();
  }, [feedUrl]);

  return (
    <View style={{padding: 10}}>
      <FlatList
        data={feedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
            return (
          <View style={{ marginBottom: 10 }}>
            <OpenLinkText text={item.title} url={item.links[0].url} style={{ fontSize: 16, color: colors.text }} onPress={onPress} />
            <Text>{item.description}</Text>
          </View>
        )}
            }
      />
    </View>
  );
};

export default RSSFeedComponent;
