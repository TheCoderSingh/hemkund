import React, { useEffect, useState } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import firebase from "firebase/app";
import DateTimePicker from "@react-native-community/datetimepicker";
import plus from "../../assets/plus.png";
import cross from "../../assets/cross.png";
import { Link, Redirect } from "react-router-native";

const NewTask = (props) => {
	const [isTaskCreated, setIsTaskCreated] = useState(false);
	const [taskName, setTaskName] = useState();
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [currUserId, setCurrUserId] = useState();
	const [showDate, setShowDate] = useState(false);
	const [showTime, setShowTime] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrUserId(user.uid);
			}
		});
	}, []);

	const handleTaskName = (taskName) => setTaskName(taskName);

	const handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
	};

	const handleTimeChange = (event, selectedTime) => {
		const currentTime = selectedTime || time;
		setTime(currentTime);

		console.log(currentTime);
	};

	const showDatePicker = () => {
		setShowDate(true);
	};

	const showTimePicker = () => {
		setShowTime(true);
	};

	const validate = () => {
		if (taskName) {
			let tasksRef = firebase.database().ref().child("tasks");
			let newTaskRef = tasksRef.push();

			console.log(date);

			newTaskRef.set({
				task_name: taskName,
				created_by: currUserId,
				status: "active",
				created_on: new Date().toLocaleString(),
				project_id: props.match.params.id,
				task_id: newTaskRef.key,
				complete: false,
				due_date: date.toString().substr(0, 15),
				due_time: time.toString().substring(16, 24),
			});
			setIsTaskCreated(true);
		}
	};

	return isTaskCreated ? (
		<Redirect to={"/tasks-view/" + props.match.params.id} />
	) : (
		<View style={styles.container}>
			<Link
				to={"/tasks-view/" + props.match.params.id}
				style={styles.crossContainer}
			>
				<Image source={cross} style={styles.cross} />
			</Link>
			<View style={styles.topArea}>
				<Image source={plus} style={styles.plus} />
				<Text style={styles.title}>New Task</Text>
				<TextInput
					placeholder="Task Name"
					style={styles.input}
					placeholderTextColor="#fff"
					onChangeText={handleTaskName}
				/>
				<TouchableOpacity
					style={styles.choose}
					onPress={showDatePicker}
				>
					<Text>Choose Date</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.choose}
					onPress={showTimePicker}
				>
					<Text>Choose Time</Text>
				</TouchableOpacity>
			</View>
			{showDate && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="date"
					is24Hour={true}
					display="spinner"
					onChange={handleDateChange}
				/>
			)}
			{showTime && (
				<DateTimePicker
					testID="dateTimePicker"
					value={time}
					mode="time"
					is24Hour={true}
					display="spinner"
					onChange={handleTimeChange}
				/>
			)}
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
	choose: {
		backgroundColor: "#fff",
		width: 255,
		alignItems: "center",
		padding: 10,
		borderRadius: 6,
		marginBottom: 15,
	},
});

export default NewTask;
