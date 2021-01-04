import React from "react";
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { Link } from "react-router-native";
import background from "../../assets/background.jpg";
import logo from "../../assets/logo-green.png";

const Login = () => {
	return (
		<View style={styles.container}>
			<ImageBackground source={background} style={styles.background}>
				<View style={styles.content}>
					<Image source={logo} style={styles.logo} />
					<TextInput
						placeholder="Email"
						textContentType="emailAddress"
						autoCompleteType="email"
						keyboardType="email-address"
						placeholderTextColor="grey"
						style={styles.input}
					/>
					<TextInput
						placeholder="Password"
						secureTextEntry
						textContentType="password"
						autoCompleteType="password"
						placeholderTextColor="grey"
						style={styles.input}
					/>
				</View>
				<View style={styles.buttons}>
					<Link to="/login" style={styles.button}>
						<Text style={styles.buttonText}>Login</Text>
					</Link>
					<Link to="/signup" style={styles.button}>
						<Text style={styles.buttonText}>Sign Up</Text>
					</Link>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	content: {
		marginTop: 250,
		flex: 1,
		justifyContent: "center",
	},
	background: {
		alignItems: "center",
		flex: 1,
	},
	logo: {
		marginBottom: 30,
		alignSelf: "center",
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: "#03989E",
		borderRadius: 6,
		width: 255,
		marginBottom: 15,
		paddingLeft: 13,
	},
	buttons: {
		flex: 1,
		justifyContent: "center",
	},
	button: {
		backgroundColor: "#03989E",
		height: 60,
		width: 320,
		borderRadius: 6,
		marginBottom: 13,
	},
	buttonText: {
		textAlign: "center",
		paddingTop: 20,
		color: "#fff",
	},
});

export default Login;
