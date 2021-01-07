import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";
import check from "../../assets/check.png";
import Footer from "../../Footer/Footer";

const Tasks = (props) => {
	console.log(props.match.params.id);
	return (
		<View style={styles.container}>
			<Text style={styles.tasksHead}>Tasks</Text>

			<View>
				<Link
					to={"/new-task/" + props.match.params.id}
					style={styles.button}
				>
					<Text style={styles.buttonText}>New Task</Text>
				</Link>
				<View style={styles.tasks}>
					<View style={styles.task}>
						<View style={styles.checkbox}>
							<Image source={check} style={styles.checkmark} />
						</View>
						<Text style={styles.taskTxt}>Task 1</Text>
					</View>
					<View style={styles.task}>
						<View style={styles.checkbox}>
							<Image source={check} style={styles.checkmark} />
						</View>

						<Text style={styles.taskTxt}>Task 1</Text>
					</View>
					<View style={styles.task}>
						<View style={styles.checkbox}>
							<Image source={check} style={styles.checkmark} />
						</View>

						<Text style={styles.taskTxt}>Task 1</Text>
					</View>
					<View style={styles.task}>
						<View style={styles.checkbox}>
							<Image source={check} style={styles.checkmark} />
						</View>

						<Text style={styles.taskTxt}>Task 1</Text>
					</View>
				</View>
			</View>
			<Footer />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03989E",
		flex: 1,
		alignItems: "center",
		paddingTop: 70,
	},
	tasksHead: {
		fontSize: 36,
	},
	button: {
		alignSelf: "center",
		marginTop: 30,
		backgroundColor: "#fff",
		borderRadius: 6,
		height: 40,
		width: 255,
	},
	buttonText: {
		color: "#03989E",
		textAlign: "center",
		paddingTop: 10,
	},
	tasks: {
		marginTop: 20,
	},
	task: {
		marginBottom: 15,
		paddingBottom: 10,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	taskTxt: {
		fontSize: 18,
		textAlign: "right",
	},
	checkbox: {
		height: 25,
		width: 25,
		borderWidth: 1,
		borderRadius: 6,
		position: "relative",
	},
	checkmark: {
		position: "absolute",
		width: 30,
		height: 30,
	},
});

export default Tasks;
