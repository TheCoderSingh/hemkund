import React from "react";
import { StyleSheet, View } from "react-native";

const Separator = () => {
	return <View style={styles.separator}></View>;
};

const styles = StyleSheet.create({
	separator: {
		borderBottomColor: "#03989E",
		borderBottomWidth: 1,
		height: 1,
		width: "100%",
	},
});

export default Separator;
