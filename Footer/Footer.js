import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import home from "../assets/home.png";
import people from "../assets/people.png";
import profile from "../assets/profile.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";

const Footer = () => {
	return (
		<View style={styles.footer}>
			<View style={styles.item}>
				<Image source={home} style={styles.icon} />
				<Text style={styles.footerText}>Home</Text>
			</View>
			<View style={styles.item}>
				<Image source={people} style={styles.icon} />
				<Text style={styles.footerText}>People</Text>
			</View>
			<View style={styles.item}>
				<Image source={profile} style={styles.icon} />
				<Text style={styles.footerText}>Profile</Text>
			</View>
			<View style={styles.item}>
				<Image source={settings} style={styles.icon} />
				<Text style={styles.footerText}>Settings</Text>
			</View>
			<View style={styles.item}>
				<Image source={logout} style={styles.icon} />
				<Text style={styles.footerText}>Logout</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		backgroundColor: "#03989E",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		height: 85,
		alignItems: "flex-start",
		paddingTop: 10,
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
	},
});

export default Footer;
