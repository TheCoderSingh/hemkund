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
import plus from "../../../assets/plus.png";
import cross from "../../../assets/cross.png";

const NewProject = () => {
	const [project, setProject] = useState();

	useEffect(() => {
		setProject("Select Project");
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.topArea}>
				<Image source={plus} style={styles.plus} />
				<Text style={styles.title}>New Project</Text>
				<TextInput
					placeholder="Project Name"
					style={styles.input}
					placeholderTextColor="#fff"
				/>
				<TextInput
					placeholder="Project Code (Optional)"
					style={styles.input}
					placeholderTextColor="#fff"
				/>
				<Text style={styles.cloneText}>Clone existing project</Text>
			</View>
			<Picker
				selectedValue={project}
				onValueChange={(itemValue, itemIndex) => setProject(itemValue)}
				style={styles.picker}
			>
				<Picker.Item label="Select Project" value="select-project" />
				<Picker.Item label="Camrose Checkpoint" value="checkpoint" />
				<Picker.Item label="Camrose Walmart" value="walmart" />
				<Picker.Item label="Chapelle" value="chapelle" />
			</Picker>
			<TouchableOpacity style={styles.bottomArea}>
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
	cross: {
		width: 80,
		height: 80,
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
