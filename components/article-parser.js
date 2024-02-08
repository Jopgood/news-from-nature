import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, useWindowDimensions, ScrollView, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { useTheme } from '@react-navigation/native';

const ArticleComponent = ({ articleUrl }) => {
  const [articleContent, setArticleContent] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const content = await getNatureArticle();
      setArticleContent(content);
    };

    fetchArticle();
  }, [articleUrl]);

  async function getNatureArticle() {
    if(articleUrl) {
      try {
        const response = await fetch(articleUrl);
        const body = await response.text();
        const $ = cheerio.load(body);
    
        // Modify the selector based on the structure of the website
        const titleSelector = "#content > div.container-type-article > main > article > div.c-article-header > header > div.c-article-header__restrict > .c-article-magazine-title";
        const contentSelector = '#content > div.container-type-article > main > article > div.c-article-body.main-content';

        // Exclude figure elements
        $(`${contentSelector} figure`).remove();
        $(`${contentSelector} img`).remove();
    
        let title = `<h1>${$(titleSelector).html().toString()}</h1>`;
        const contentHTML = $(contentSelector).html()
        let content;
        if (!contentHTML) {
          title = '<h2>This article is unavailable.</h2>'
          content = '<em style="text-align:center;">Hopefully this will be fixed soon.</em>'
        } else {
          content = contentHTML.toString()
        }

        return { content: { html: content }, title: { html: title } };
      } catch (error) {
        console.error('Error fetching article:', error.message);
      }
    }
  }

  
  const { colors } = useTheme();

  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    p: {
      color: colors.text, // make links coloured pink
    },
    h1: {
      color: colors.text, // make links coloured pink
    },
    h2: {
      color: colors.text, // make links coloured pink
    },
  });
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {articleContent ? (
        <ScrollView>
        <RenderHtml contentWidth={width} source={articleContent.title} tagsStyles={styles} />
        <RenderHtml contentWidth={width} source={articleContent.content} tagsStyles={styles} />
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};



export default ArticleComponent;
