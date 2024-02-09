import React from "react";
import { StyleSheet, View } from "react-native";
import ArticleComponent from "../components/article-parser";

const Article = ({ route }) => {
  const { articleUrl } = route.params;

  return (
    <View style={styles.body}>
      <ArticleComponent articleUrl={articleUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
});

export default Article;
