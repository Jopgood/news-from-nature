// link-opener.js
import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';

const OpenLinkText = ({ text, url, style, onPress }) => {
  const handlePress = async () => {
    try {
      // Check if the device supports the given URL
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Open the URL with the default browser
        //await Linking.openURL(url);
        onPress(url)
      } else {
        console.error("Don't know how to open URI: ", url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{textDecorationLine: 'underline', ...style }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default OpenLinkText;
