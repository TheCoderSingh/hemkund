import React, { useEffect, useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import plus from "../../assets/plus.png";
import cross from "../../assets/cross.png";
import { Link, Redirect } from "react-router-native";

const NewProject = () => {
	const [projectName, setProjectName] = useState();
	const [projectCode, setProjectCode] = useState();
	const [currUserId, setCurrUserId] = useState();
	const [isProjectCreated, setIsProjectCreated] = useState(false);
	const [projectId, setProjectId] = useState();
	// let currUser;
	// const [project, setProject] = useState();

	useEffect(() => {
		// setProject("Select Project");
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrUserId(user.uid);
			}
		});
	}, []);

	const validate = () => {
		if (projectName) {
			let projectsRef = firebase.database().ref().child("projects");
			let newProjectRef = projectsRef.push();

			if (
				!projectCode ||
				projectCode === "undefined" ||
				typeof projectCode === undefined ||
				projectCode.trim().length === 0
			) {
				newProjectRef.set({
					project_name: projectName,
					created_by: currUserId,
					status: "active",
					created_on: new Date().toLocaleString(),
					project_id: newProjectRef.key,
				});

				setProjectId(newProjectRef.key);
			} else {
				newProjectRef.set({
					project_name: projectName,
					project_code: projectCode,
					created_by: currUserId,
					status: "active",
					created_on: new Date().toLocaleString(),
					project_id: newProjectRef.key,
				});
				setProjectId(newProjectRef.key);
			}

			setIsProjectCreated(true);
		}
	};

	const handleProjectName = (projName) => setProjectName(projName);

	const handleProjectCode = (projCode) => setProjectCode(projCode);

	return isProjectCreated ? (
		<Redirect to={"/project/" + projectId} />
	) : (
		<View style={styles.container}>
			<Link to="/projects" style={styles.crossContainer}>
				<Image source={cross} style={styles.cross} />
			</Link>
			<View style={styles.topArea}>
				<Image source={plus} style={styles.plus} />
				<Text style={styles.title}>New Project</Text>
				<TextInput
					placeholder="Project Name"
					style={styles.input}
					placeholderTextColor="#fff"
					onChangeText={handleProjectName}
				/>
				<TextInput
					placeholder="Project Code (Optional)"
					style={styles.input}
					placeholderTextColor="#fff"
					onChangeText={handleProjectCode}
				/>
				{/* <Text style={styles.cloneText}>Clone existing project</Text> */}
			</View>
			{/* <Picker
				selectedValue={project}
				onValueChange={(itemValue, itemIndex) => setProject(itemValue)}
				style={styles.picker}
			>
				<Picker.Item label="Select Project" value="select-project" />
				<Picker.Item label="Camrose Checkpoint" value="checkpoint" />
				<Picker.Item label="Camrose Walmart" value="walmart" />
				<Picker.Item label="Chapelle" value="chapelle" />
			</Picker> */}
			<TouchableOpacity
				style={styles.bottomArea}
				onPress={() => {
					validate();
				}}
			>
				<Text style={styles.createText}>Create</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03989E",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	crossContainer: {
		position: "absolute",
		top: 50,
		right: 15,
	},
	cross: {
		width: 30,
		height: 30,
		alignSelf: "flex-end",
	},
	topArea: {
		alignItems: "center",
	},
	plus: {
		marginBottom: 30,
	},
	title: {
		fontSize: 36,
		marginBottom: 30,
		color: "#fff",
	},
	input: {
		borderWidth: 1,
		borderColor: "#fff",
		borderRadius: 6,
		width: 255,
		height: 45,
		marginBottom: 20,
		paddingLeft: 13,
	},
	cloneText: {
		color: "#fff",
		alignSelf: "flex-start",
		marginLeft: 80,
		fontSize: 18,
		marginTop: 15,
	},
	bottomArea: {
		alignSelf: "center",
		backgroundColor: "#fff",
		width: 255,
		height: 45,
		borderRadius: 6,
	},
	createText: {
		textAlign: "center",
		paddingTop: 13,
		fontSize: 18,
		color: "#03989E",
	},
});

export default NewProject;
