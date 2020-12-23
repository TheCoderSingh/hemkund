import React from "react";
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import trash from "../assets/trash.png";

const Project = () => {
	return (
		<View style={styles.card}>
			<View style={styles.topArea}>
				<Text style={styles.projectTitle}>Camrose Checkpoint</Text>
				<Image source={trash} style={styles.icon} />
			</View>
			<View style={styles.buttons}>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>New Plan</Text>
				</TouchableOpacity>
				<TouchableOpacity style={{ ...styles.button, marginLeft: 10 }}>
					<Text style={styles.buttonText}>New Task</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.seperator} />
			<View style={styles.bottomArea}>
				<TouchableOpacity style={styles.archiveBtn}>
					<Text>Archive</Text>
				</TouchableOpacity>
				<Text style={styles.date}>December 18, 2020</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#EFEFEF",
		width: 320,
		height: 115,
		borderRadius: 6,
		marginTop: 20,
	},
	topArea: {
		marginLeft: 12,
		marginRight: 12,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	projectTitle: {
		color: "#03989E",
		fontSize: 18,
		marginTop: 10,
	},
	icon: {
		alignSelf: "center",
	},
	buttons: {
		marginLeft: 12,
		marginTop: 15,
		display: "flex",
		flexDirection: "row",
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#03989E",
		borderRadius: 6,
		height: 30,
		width: 80,
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		paddingTop: 5,
	},
	seperator: {
		borderBottomColor: "#D8D8D8",
		borderBottomWidth: 1,
	},
	bottomArea: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: 12,
		marginRight: 12,
		marginTop: 5,
	},
	archiveBtn: {
		color: "#2D2E2C",
	},
	date: {
		color: "#888888",
		fontSize: 12,
	},
});

export default Project;
