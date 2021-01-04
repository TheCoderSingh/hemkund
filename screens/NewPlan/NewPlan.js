import React, { useState, useEffect } from "react";
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
import { Link, Redirect } from "react-router-native";
import plus from "../../assets/plus.png";
import cross from "../../assets/cross.png";

const NewPlan = (props) => {
	console.log(props);
	const [planName, setPlanName] = useState();
	const [categoryName, setCategoryName] = useState();
	const [isPlanCreated, setIsPlanCreated] = useState(false);
	const [currUserId, setCurrUserId] = useState();
	const [planId, setPlanId] = useState();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrUserId(user.uid);
			}
		});
	}, []);

	const validate = () => {
		if (planName) {
			let plansRef = firebase.database().ref().child("plans");
			let newPlanRef = plansRef.push();

			newPlanRef.set({
				plan_id: newPlanRef.key,
				plan_name: planName,
				created_by: currUserId,
				project_id: props.match.params.id,
				status: "active",
				category: categoryName || "uncategorized",
			});

			setPlanId(newPlanRef.key);
			setIsPlanCreated(true);
		}
	};

	const handlePlanName = (_planName) => setPlanName(_planName);

	const handlePlanCategory = (_planCategory) =>
		setCategoryName(_planCategory);

	return isPlanCreated ? (
		<Redirect to={"/plan/" + planId} />
	) : (
		<View style={styles.container}>
			<Link
				to={"/project/" + props.match.params.id}
				style={styles.crossContainer}
			>
				<Image source={cross} style={styles.cross} />
			</Link>
			<View style={styles.topArea}>
				<Image source={plus} style={styles.plus} />
				<Text style={styles.title}>New Plan</Text>
				<TextInput
					placeholder="Plan Name"
					style={styles.input}
					placeholderTextColor="#fff"
					onChangeText={handlePlanName}
				/>
				{/* <TextInput
					placeholder="Plan Category"
					style={styles.input}
					placeholderTextColor="#fff"
					onChangeText={handlePlanCategory}
				/> */}
				<Text style={styles.cloneText}>Plan Category</Text>
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

export default NewPlan;
