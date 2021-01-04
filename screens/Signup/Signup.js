import React, { useState, useEffect } from "react";
import {
	TouchableOpacity,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	View,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import background from "../../assets/background.jpg";
import logo from "../../assets/logo-green.png";
import back from "../../assets/back.png";
import { Link, Redirect } from "react-router-native";

const Signup = () => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [registered, setRegistered] = useState();
	const [isFNameValid, setIsFNameValid] = useState(true);
	const [isLNameValid, setIsLNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isCPasswordValid, setIsCPasswordValid] = useState(true);

	const nameRegex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
	const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;

	const handleFirstName = (fname) => {
		setFirstName(fname);
	};

	const handleLastName = (lname) => {
		setLastName(lname);
	};

	const handleEmail = (emailAdd) => {
		setEmail(emailAdd);
	};

	const handlePassword = (pass) => {
		setPassword(pass);
	};

	const handleConfirmPassword = (cPass) => {
		setConfirmPassword(cPass);
	};

	const validate = () => {
		if (firstName && nameRegex.test(firstName)) {
			setIsFNameValid(true);
			if (lastName && nameRegex.test(lastName)) {
				setIsLNameValid(true);
				if (email && emailRegex.test(email)) {
					setIsEmailValid(true);
					if (password && passwordRegex.test(password)) {
						setIsPasswordValid(true);
						if (confirmPassword === password) {
							setIsCPasswordValid(true);
							register();
						} else setIsCPasswordValid(false);
					} else setIsPasswordValid(false);
				} else setIsEmailValid(false);
			} else setIsLNameValid(false);
		} else return setIsFNameValid(false);
	};

	const register = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				let usersRef = firebase.database().ref().child("users");

				let newUserRef = usersRef.push();
				newUserRef.set({
					uid: user.user.uid,
					first_name: firstName,
					last_name: lastName,
					email: email,
					status: "active",
					registered_on: new Date().toLocaleString(),
				});
			})
			.then(() => {
				setRegistered(1);
			})
			.catch((error) => {
				console.error(error.code + ": " + error.message);
			});
	};

	return registered ? (
		<Redirect to="/projects" />
	) : (
		<KeyboardAvoidingView style={styles.container} behavior={"padding"}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ImageBackground source={background} style={styles.background}>
					<Link to="/" style={styles.backLink}>
						<Image source={back} style={styles.back} />
					</Link>
					<View style={styles.content} onPress={Keyboard.dismiss}>
						<Image source={logo} style={styles.logo} />
						<TextInput
							placeholder="First Name"
							textContentType="givenName"
							autoCompleteType="name"
							placeholderTextColor="grey"
							onChangeText={handleFirstName}
							style={styles.input}
						/>
						{!isFNameValid ? (
							<Text style={styles.errorText}>
								Please enter a valid name.
							</Text>
						) : null}
						<TextInput
							placeholder="Last Name"
							textContentType="familyName"
							autoCompleteType="name"
							placeholderTextColor="grey"
							onChangeText={handleLastName}
							style={styles.input}
						/>
						{isLNameValid ? null : (
							<Text style={styles.errorText}>
								Please enter a valid name.
							</Text>
						)}
						<TextInput
							placeholder="Email"
							textContentType="emailAddress"
							autoCompleteType="email"
							keyboardType="email-address"
							placeholderTextColor="grey"
							onChangeText={handleEmail}
							style={styles.input}
						/>
						{isEmailValid ? null : (
							<Text style={styles.errorText}>
								Please enter a valid email.
							</Text>
						)}
						<TextInput
							placeholder="Password"
							secureTextEntry
							textContentType="password"
							autoCompleteType="password"
							placeholderTextColor="grey"
							onChangeText={handlePassword}
							style={styles.input}
						/>
						{isPasswordValid ? null : (
							<Text style={styles.errorText}>
								Password must contain at least 8 characters, a
								number and both lower and uppercase letters and
								special characters.
							</Text>
						)}
						<TextInput
							placeholder="Confirm Password"
							secureTextEntry
							textContentType="newPassword"
							autoCompleteType="password"
							placeholderTextColor="grey"
							onChangeText={handleConfirmPassword}
							style={styles.input}
						/>
						{isCPasswordValid ? null : (
							<Text style={styles.errorText}>
								Passwords do not match.
							</Text>
						)}
						<TouchableOpacity
							style={styles.button}
							onPress={() => validate()}
						>
							<Text style={styles.buttonText}>Sign Up</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
	},
	content: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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
		height: 50,
		borderColor: "#03989E",
		borderRadius: 6,
		width: 255,
		marginTop: 15,
		marginBottom: 4,
		paddingLeft: 13,
		backgroundColor: "#fff",
	},
	button: {
		backgroundColor: "#03989E",
		height: 60,
		width: 255,
		borderRadius: 6,
		marginBottom: 13,
	},
	buttonText: {
		textAlign: "center",
		paddingTop: 20,
		color: "#fff",
	},
	backLink: {
		alignSelf: "flex-start",
		paddingTop: 50,
	},
	back: {
		height: 30,
		width: 30,
		marginLeft: 20,
	},
	errorText: {
		color: "#000",
		alignSelf: "flex-start",
		backgroundColor: "red",
		padding: 2,
	},
});

export default Signup;
