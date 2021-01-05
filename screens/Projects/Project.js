import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import firebase from "firebase/app";
import Plans from "../../components/Plans";
import { Link } from "react-router-native";
import back from "../../assets/back.png";

const Project = (props) => {
	const [projectName, setProjectName] = useState();

	useEffect(() => {
		let projectsRef = firebase.database().ref("projects");
		let mounted = true;

		projectsRef
			.orderByChild("project_id")
			.equalTo(props.match.params.id)
			.on(
				"child_added",
				(data) => {
					if (mounted) setProjectName(data.val().project_name);
				},
				(error) => {
					console.log("Error: " + error.code);
				}
			);

		return () => {
			mounted = false;
		};
	}, []);

	return (
		<View style={styles.container}>
			<Link to="/projects" style={styles.backLink}>
				<Image source={back} style={styles.back} />
			</Link>
			<Text style={styles.projectTitle}>{projectName}</Text>
			<Link
				to={"/new-plan/" + props.match.params.id}
				style={styles.newPlanButton}
			>
				<Text style={styles.newPlanText}>New Plan</Text>
			</Link>
			<ScrollView>
				<View>
					{/* <Text style={styles.sectionText}>
						Base Architectural Plans (8 Plans)
					</Text> */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator="false"
						style={styles.plans}
					>
						<Plans projectid={props.match.params.id} />
					</ScrollView>
				</View>
				{/* <View>
					<Text style={styles.sectionText}>
						Base Architectural Plans (8 Plans)
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator="false"
						style={styles.plans}
					>
						<Plan />
						<Plan />
					</ScrollView>
				</View> */}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03989E",
		flex: 1,
		flexDirection: "column",
	},
	projectTitle: {
		marginTop: 10,
		fontSize: 28,
		marginLeft: 12,
		color: "#fff",
		textAlign: "center",
		fontWeight: "bold",
	},
	newPlanButton: {
		width: 200,
		height: 45,
		backgroundColor: "#fff",
		borderRadius: 6,
		alignSelf: "center",
		marginTop: 30,
		marginBottom: 20,
	},
	newPlanText: {
		textAlign: "center",
		marginTop: 15,
		color: "#03989E",
		fontWeight: "bold",
	},
	sectionText: {
		fontSize: 16,
		marginLeft: 12,
		color: "#D8D8D8",
		marginBottom: 20,
	},
	plans: {
		marginBottom: 25,
	},
	backLink: {
		alignSelf: "flex-start",
		paddingTop: 50,
	},
	back: {
		height: 30,
		width: 30,
		marginLeft: 20,
	},
});

export default Project;
