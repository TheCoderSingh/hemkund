import React, { useEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Link, Redirect } from "react-router-native";
import firebase from "firebase/app";
import background from "../../assets/background.jpg";
import logo from "../../assets/logo-green.png";

const Login = () => {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [isUserValid, setIsUserValid] = useState(true);
	const [isSignedIn, setIsSignedIn] = useState();

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				setIsSignedIn(true);
			} else {
				setIsSignedIn(false);
			}
		});
	}, []);

	const handleEmail = (emailAdd) => {
		setEmail(emailAdd);
		console.log(emailAdd);
	};

	const handlePassword = (pass) => {
		setPassword(pass);
	};

	const signIn = () => {
		if (email && password) {
			setEmail(email.trim().toLowerCase());

			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((user) => {
					setIsUserValid(true);
				})
				.then(() => {
					setIsSignedIn(true);
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					setIsUserValid(false);
				});
		} else setIsUserValid(false);
	};

	return isSignedIn ? (
		<Redirect to="/projects" />
	) : (
		<View style={styles.container}>
			<ImageBackground source={background} style={styles.background}>
				<View style={styles.content}>
					<Image source={logo} style={styles.logo} />
					{!isUserValid ? (
						<Text style={styles.errorText}>
							Invalid email or password.
						</Text>
					) : null}
					<TextInput
						placeholder="Email"
						textContentType="emailAddress"
						autoCompleteType="email"
						keyboardType="email-address"
						placeholderTextColor="grey"
						onChangeText={handleEmail}
						style={styles.input}
					/>
					<TextInput
						placeholder="Password"
						secureTextEntry
						textContentType="password"
						autoCompleteType="password"
						placeholderTextColor="grey"
						onChangeText={handlePassword}
						style={styles.input}
					/>
				</View>
				<View style={styles.buttons}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => signIn()}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
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
	errorText: {
		color: "#000",
		alignSelf: "flex-start",
		backgroundColor: "red",
		padding: 2,
	},
});

export default Login;
