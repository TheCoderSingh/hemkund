import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Linking,
	TouchableOpacity,
} from "react-native";
import firebase from "firebase/app";
import { Link } from "react-router-native";
import * as WebBrowser from "expo-web-browser";

const Plans = (props) => {
	const [plans, setPlans] = useState([]);

	useEffect(() => {
		let plansRef = firebase.database().ref("plans");
		let mounted = true;

		plansRef
			.orderByChild("project_id")
			.equalTo(props.projectid)
			.on(
				"value",
				(snapshot) => {
					snapshot.forEach((plan) => {
						if (mounted)
							setPlans((plans) => [...plans, plan.val()]);
					});
				},
				(error) => {
					console.log("Error: " + error.code);
				}
			);

		return () => {
			mounted = false;
		};
	}, []);

	return plans.map((plan) => {
		return (
			<TouchableOpacity
				style={styles.container}
				key={plan.plan_id}
				onPress={() => {
					// Linking.openURL(plan.file_url);
					WebBrowser.openBrowserAsync(plan.file_url);
				}}
			>
				<Text style={styles.planText}>{plan.plan_name}</Text>
			</TouchableOpacity>
		);
	});
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		width: 130,
		height: 50,
		borderRadius: 6,
		marginLeft: 12,
		justifyContent: "center",
	},
	plan: {
		height: 100,
		width: 100,
	},
	planText: {
		textAlign: "center",
		marginTop: 7,
		color: "#03989E",
	},
});

export default Plans;
