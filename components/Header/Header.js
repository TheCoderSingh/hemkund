import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Redirect } from "react-router-native";
import firebase from "firebase/app";
import logout from "../../assets/logout.png";

const Header = () => {
	const [isLoggedOut, setIsLoggedOut] = useState(false);

	const logOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				setIsLoggedOut(true);
			})
			.catch((error) => {
				// An error happened.
			});
	};
	return isLoggedOut ? (
		<Redirect to="/" />
	) : (
		<View style={styles.container}>
			<View></View>
			<View style={styles.appHeadCont}>
				<Text style={styles.appHead}>Hemkund Developments</Text>
			</View>
			<TouchableOpacity style={styles.iconCont} onPress={logOut}>
				<Image source={logout} style={styles.icon} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 100,
		width: "100%",
		backgroundColor: "#333",
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
		paddingBottom: 20,
	},
	appHead: {
		color: "#fff",
		marginLeft: 15,
		fontSize: 20,
	},
	appHeadCont: {
		marginLeft: 15,
	},
	icon: {
		width: 25,
		height: 25,
	},
	iconCont: {
		justifyContent: "flex-end",
		marginRight: 15,
	},
});

export default Header;
