import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import home from "../assets/home.png";
import people from "../assets/people.png";
import profile from "../assets/profile.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";
import { Link } from "react-router-native";

const Footer = (props) => {
	return (
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
			<Link to="/logout" style={styles.item}>
				<View>
					<Image source={logout} style={styles.icon} />
					<Text style={styles.footerText}>Logout</Text>
				</View>
			</Link>
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
