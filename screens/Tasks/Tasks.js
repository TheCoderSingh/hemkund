import React, { useState, useEffect } from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Link } from "react-router-native";
import firebase from "firebase/app";
import check from "../../assets/check.png";
import Footer from "../../Footer/Footer";

const Tasks = (props) => {
	const [tasks, setTasks] = useState([]);
	const [taskChanged, setTaskChanged] = useState(false);

	useEffect(() => {
		setTasks([]);
		let tasksRef = firebase.database().ref("tasks");

		tasksRef
			.orderByChild("project_id")
			.equalTo(props.match.params.id)
			.on(
				"value",
				(snapshot) => {
					snapshot.forEach((task) => {
						setTasks((tasks) => [...tasks, task.val()]);
					});
				},
				(error) => {
					console.log("Error: " + error.code);
				}
			);
	}, [taskChanged]);

	const toggleCheckbox = (taskid, isComplete) => {
		let tasksRef = firebase.database().ref().child("tasks");

		tasksRef.child(taskid).update({ complete: isComplete });

		setTaskChanged(!taskChanged);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.tasksHead}>Tasks</Text>

			<Link
				to={"/new-task/" + props.match.params.id}
				style={styles.button}
			>
				<Text style={styles.buttonText}>New Task</Text>
			</Link>
			<ScrollView style={styles.tasks}>
				{tasks.map((task, index) => {
					return task.complete ? (
						<View style={styles.task} key={index}>
							<TouchableOpacity
								style={styles.checkbox}
								onPress={() => {
									toggleCheckbox(
										task.task_id,
										!task.complete
									);

									task.complete = !task.complete;
								}}
							>
								<Image
									source={check}
									style={styles.checkmark}
								/>
							</TouchableOpacity>
							<View style={styles.cardContent}>
								<Text style={styles.taskTxtCpltd}>
									{task.task_name}
								</Text>
								<Text>Due by: {task.due_date}</Text>
							</View>
						</View>
					) : (
						<View style={styles.task} key={index}>
							<TouchableOpacity
								style={styles.checkbox}
								onPress={() => {
									toggleCheckbox(
										task.task_id,
										!task.complete
									);

									task.complete = !task.complete;
								}}
							></TouchableOpacity>
							<View style={styles.cardContent}>
								<Text style={styles.taskTxt}>
									{task.task_name}
								</Text>
								<Text>
									Due by: {task.due_date} - {task.due_time}
								</Text>
							</View>
						</View>
					);
				})}
			</ScrollView>

			<Footer style={styles.footer} projectid={props.match.params.id} />
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
		width: "80%",
	},
	task: {
		marginBottom: 15,
		paddingBottom: 10,
		display: "flex",
		flexDirection: "row",
		backgroundColor: "#ddd",
		padding: 10,
		height: 80,
		borderRadius: 6,
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
		alignSelf: "center",
	},
	checkmark: {
		position: "absolute",
		width: 30,
		height: 30,
	},
	taskTxtCpltd: {
		fontSize: 18,
		textAlign: "right",
		textDecorationLine: "line-through",
	},
	cardContent: {
		marginLeft: 15,
		justifyContent: "space-around",
	},
});

export default Tasks;
