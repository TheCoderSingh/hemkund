import React from "react";
import { StyleSheet, View } from "react-native";
import Login from "./screens/Login/Login";
import Projects from "./screens/Projects/Projects";
import NewProject from "./screens/NewProject/NewProject";
import Project from "./screens/Projects/Project";
import NewPlan from "./screens/NewPlan/NewPlan";
import { NativeRouter, Route } from "react-router-native";
import Signup from "./screens/Signup/Signup";
import Tasks from "./screens/Tasks/Tasks";
import NewTask from "./screens/NewTask/NewTask";
// import Calendar from "./screens/Calendar/Calendar";
import "./utils/firebaseConfig";

export default function App() {
	return (
		<NativeRouter>
			<View style={styles.container}>
				<Route path="/tasks-view/:id" component={Tasks} />
				{/* <Route path="/calendar-view" component={Calendar} /> */}
				<Route path="/new-task/:id" component={NewTask} />
				<Route path="/projects" component={Projects} />
				<Route path="/new-project" component={NewProject} />
				<Route path="/project/:id" component={Project} />
				<Route path="/new-plan/:id" component={NewPlan} />
				<Route path="/signup" component={Signup} />
				<Route exact path="/" component={Login} />
			</View>
		</NativeRouter>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
