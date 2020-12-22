import React from "react";
import { StyleSheet, View } from "react-native";
import NewProject from "./screens/Login/NewProject/NewProject";
// import Login from "./screens/Login/Login";
import Projects from "./screens/Projects/Projects";

export default function App() {
	return (
		<View style={styles.container}>
			{/* <Login /> */}
			{/* <Projects /> */}
			<NewProject />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
