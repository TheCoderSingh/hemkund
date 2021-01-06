import React, { useState, useEffect, useRef } from "react";
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
// import { Picker } from "@react-native-picker/picker";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { Link, Redirect } from "react-router-native";
import { getDocumentAsync } from "expo-document-picker";
import plus from "../../assets/plus.png";
import cross from "../../assets/cross.png";

const NewPlan = (props) => {
	const [planName, setPlanName] = useState();
	const [categoryName, setCategoryName] = useState();
	const [isPlanCreated, setIsPlanCreated] = useState(false);
	const [currUserId, setCurrUserId] = useState();
	const [uploadProgress, setUploadProgress] = useState(0);
	const [blob, setBlob] = useState({});
	const [isPlanNameValid, setIsPlanNameValid] = useState(true);
	const [ref, setRef] = useState();

	const mountedRef = useRef(true);

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrUserId(user.uid);
			}
		});

		return () => {
			mountedRef.current = false;
			unsubscribe();
		};
	}, []);

	const validate = () => {
		if (planName) {
			setIsPlanNameValid(true);
			if (Object.keys(blob).length !== 0) uploadFile();
			else createPlan();
		} else {
			setIsPlanNameValid(false);
		}
	};

	const uploadFile = () => {
		let task = ref.put(blob);

		task.on(
			"state_changed",
			(snapshot) => {
				let progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;

				if (firebase.storage.TaskState.RUNNING) {
					if (mountedRef.current) {
						setUploadProgress(progress);
					}
				}
			},
			(error) => {
				console.log("Error uploading file: " + error);
			},
			() => {
				console.log("Should run first");
				task.snapshot.ref.getDownloadURL().then((downloadURL) => {
					setFileUrl(downloadURL);
					createPlan(downloadURL);
				});
			}
		);
	};

	const createPlan = (url) => {
		console.log("Should run second");
		let plansRef = firebase.database().ref().child("plans");
		let newPlanRef = plansRef.push();

		newPlanRef
			.set({
				plan_id: newPlanRef.key,
				plan_name: planName,
				created_by: currUserId,
				project_id: props.match.params.id,
				status: "active",
				category: categoryName || "uncategorized",
				file_url: url || "",
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});

		setIsPlanCreated(true);
	};

	const handlePlanName = (_planName) => setPlanName(_planName);

	// const handlePlanCategory = (_planCategory) =>
	// 	setCategoryName(_planCategory);

	return isPlanCreated ? (
		<Redirect to={"/project/" + props.match.params.id} />
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
				{!isPlanNameValid ? (
					<Text style={styles.errorText}>
						Please enter a valid name.
					</Text>
				) : null}
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
				{/* <Text style={styles.cloneText}>Plan Category</Text> */}
				{uploadProgress > 0 && uploadProgress < 100 ? (
					<Text>Upload Progress: {uploadProgress.toFixed(0)}%</Text>
				) : null}
				{uploadProgress === 100 ? <Text>Upload Complete</Text> : null}
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						getDocumentAsync().then(async (response) => {
							try {
								let storageRef = firebase.storage().ref();
								setRef(
									storageRef.child(
										response.uri.split("/")[14]
									)
								);

								let fetchResponse = await fetch(response.uri);
								let blob = await fetchResponse.blob();

								if (mountedRef.current) {
									setBlob(blob);
								}
							} catch (error) {
								console.log(error.message);
							}
						});
					}}
				>
					<Text style={styles.buttonText}>Upload Plan</Text>
				</TouchableOpacity>
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
	button: {
		alignSelf: "center",
		marginTop: 20,
		backgroundColor: "#fff",
		borderRadius: 6,
		height: 45,
		width: 255,
		marginBottom: 20,
	},
	buttonText: {
		color: "#03989E",
		textAlign: "center",
		paddingTop: 10,
		fontSize: 18,
	},
	errorText: {
		color: "#000",
		// backgroundColor: "red",
		padding: 2,
		marginBottom: 10,
		fontWeight: "bold",
	},
});

export default NewPlan;
