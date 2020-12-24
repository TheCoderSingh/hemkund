import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Separator from "./Separator";

const Plan = () => {
	return (
		<View style={styles.container}>
			<View style={styles.plan}></View>
			<Separator />
			<Text style={styles.planText}>A0.1</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		width: 130,
		height: 130,
		marginLeft: 12,
	},
	plan: {
		height: 100,
		width: 100,
	},
	planText: {
		textAlign: "center",
		marginTop: 7,
		color: "#03989E",
	},
});

export default Plan;
