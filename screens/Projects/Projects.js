import React, { useEffect, useState } from "react";
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Link } from "react-router-native";
import firebase from "firebase/app";
import background from "../../assets/background.jpg";
import Project from "../../components/Project";
import Header from "../../components/Header/Header";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [currUserId, setCurrUserId] = useState();

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				let projectsRef = firebase.database().ref("projects");

				projectsRef
					.orderByChild("created_by")
					.equalTo(user.uid)
					.on(
						"value",
						(snapshot) => {
							snapshot.forEach((project) => {
								setProjects((projects) => [
									...projects,
									project.val().project_id,
								]);
							});
						},
						(error) => {
							console.log("Error: " + error.code);
						}
					);
			}
		});
	}, []);

	return (
		<View style={styles.container}>
			<Header />
			<ImageBackground source={background} style={styles.background}>
				<Link to="/new-project" style={styles.button}>
					<Text style={styles.buttonText}>New Project</Text>
				</Link>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 40 }}
				>
					{projects.map((projectId) => {
						return <Project id={projectId} key={projectId} />;
					})}
				</ScrollView>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	background: {
		alignItems: "center",
		flex: 1,
	},
	button: {
		alignSelf: "center",
		marginTop: 80,
		backgroundColor: "#03989E",
		borderRadius: 6,
		height: 40,
		width: 320,
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		paddingTop: 10,
	},
});

export default Projects;
