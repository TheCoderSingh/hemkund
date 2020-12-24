import React from "react";
import { StyleSheet, View } from "react-native";
// import Login from "./screens/Login/Login";
// import Projects from "./screens/Projects/Projects";
// import NewProject from "./screens/NewProject/NewProject";
import Project from "./screens/Projects/Project";

export default function App() {
	return (
		<View style={styles.container}>
			{/* <Login /> */}
			{/* <Projects /> */}
			{/* <NewProject /> */}
			<Project />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
