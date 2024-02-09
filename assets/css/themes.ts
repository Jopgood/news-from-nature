// themes.js
import { Theme } from "@react-navigation/native";

export const lightTheme: Theme = {
  dark: false,
  colors: {
    text: "black",
    primary: "blue",
    background: "white",
    notification: "white",
    card: "white",
    border: "white",
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    text: "#ebebeb",
    primary: "#ebebeb",
    background: "#09090b",
    notification: "#09090b",
    card: "#09090b",
    border: "#27272a",
  },
};
