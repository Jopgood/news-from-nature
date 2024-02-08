import React from "react";
import { StyleSheet, View } from "react-native";
import ArticleComponent from "../components/article-parser";

const Article = ({ route }) => {
    const { articleUrl } = route.params;
  
    return (
      <View style={{ flex: 1 }}>
        <ArticleComponent articleUrl={articleUrl} />
      </View>
    );
  };

const styles = StyleSheet.create({
  body: {
  },
});

export default Article;
