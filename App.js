import React from "react";
import { StyleSheet, View } from "react-native";
// import Login from "./screens/Login/Login";
import Projects from "./screens/Projects/Projects";

export default function App() {
	return (
		<View style={styles.container}>
			{/* <Login /> */}
			<Projects />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
