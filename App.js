import React from "react";
import { StyleSheet, View } from "react-native";
// import Login from "./screens/Login/Login";
import Projects from "./screens/Projects/Projects";
import NewProject from "./screens/NewProject/NewProject";
import Project from "./screens/Projects/Project";
import { NativeRouter, Route } from "react-router-native";

export default function App() {
	return (
		<NativeRouter>
			<View style={styles.container}>
				{/* <Route exact path="/" component={Login} /> */}
				<Route exact path="/" component={Projects} />
				<Route path="/projects" component={Projects} />
				<Route path="/new-project" component={NewProject} />
				<Route path="/project" component={Project} />
			</View>
		</NativeRouter>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
