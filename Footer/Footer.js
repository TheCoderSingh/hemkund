import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import home from "../assets/home.png";
import people from "../assets/people.png";
import profile from "../assets/profile.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import { Link, Redirect } from "react-router-native";
import firebase from "firebase/app";
import "firebase/auth";

const Footer = (props) => {
	const [isLoggedOut, setIsLoggedOut] = useState(false);

	return isLoggedOut ? (
		<Redirect to="/" />
	) : (
		<View style={styles.footer}>
			<Link to="/projects" style={styles.item}>
				<View>
					<Image source={home} style={styles.icon} />
					<Text style={styles.footerText}>Home</Text>
				</View>
			</Link>
			{/* <View style={styles.item}>
				<Image source={people} style={styles.icon} />
				<Text style={styles.footerText}>Plans</Text>
			</View> */}
			<Link to={"/tasks-view/" + props.projectid} style={styles.item}>
				<View>
					<Image source={profile} style={styles.icon} />
					<Text style={styles.footerText}>Tasks</Text>
				</View>
			</Link>
			<Link to={"/calendar-view/" + props.projectid} style={styles.item}>
				<View>
					<Image source={settings} style={styles.icon} />
					<Text style={styles.footerText}>Calendar</Text>
				</View>
			</Link>

			<TouchableOpacity
				style={styles.item}
				onPress={() => {
					firebase
						.auth()
						.signOut()
						.then(() => {
							setIsLoggedOut(true);
						})
						.catch((error) => {
							// An error happened.
						});
				}}
			>
				<Image source={logout} style={styles.icon} />
				<Text style={styles.footerText}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		backgroundColor: "#333",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		height: 90,
		alignItems: "flex-start",
		paddingTop: 10,
		width: "100%",
	},
	item: {
		justifyContent: "center",
	},
	icon: {
		alignSelf: "center",
		width: 25,
		height: 25,
		resizeMode: "contain",
	},
	footerText: {
		fontSize: 12,
		marginTop: 5,
		color: "#fff",
	},
});

export default Footer;
