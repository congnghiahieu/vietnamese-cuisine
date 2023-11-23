import { Dimensions, Keyboard } from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export const wp = (percent: number) => (percent / 100) * width;
export const hp = (percent: number) => (percent / 100) * height;

export const dismissKeyboard = () => {
    Keyboard.dismiss();
    return false;
};

export const getCurrentTimeString = (): string => {
    return new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
};
