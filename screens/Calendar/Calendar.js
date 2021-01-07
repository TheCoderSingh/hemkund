import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Calendar = () => {
	return (
		<View style={styles.container}>
			<Text>Calendar View</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03989E",
		flex: 1,
		alignItems: "center",
		paddingTop: 70,
	},
});

export default Calendar;
