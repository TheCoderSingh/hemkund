import React, { useState } from "react";
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
import axios from "axios";

import background from "../../assets/background.jpg";
import logo from "../../assets/logo-green.png";

const Signup = () => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

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

	const register = (fname, lname, emailAdd, pass, cPass) => {
		let user = {
			fname: fname,
			lname: lname,
			email: emailAdd,
			password: pass,
			cPass: cPass,
		};

		axios({
			method: "post",
			url: "http://10.0.0.33:8080/create-user",
			headers: { "Content-Type": "application/json" },
			data: user,
			body: JSON.stringify(user),
		})
			.then((response) => {
				console.log(response);
			})
			.catch(function (response) {
				console.log(response);
			});
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={"padding"}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ImageBackground source={background} style={styles.background}>
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
						<TextInput
							placeholder="Last Name"
							textContentType="familyName"
							autoCompleteType="name"
							placeholderTextColor="grey"
							onChangeText={handleLastName}
							style={styles.input}
						/>
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
						<TextInput
							placeholder="Confirm Password"
							secureTextEntry
							textContentType="newPassword"
							autoCompleteType="password"
							placeholderTextColor="grey"
							onChangeText={handleConfirmPassword}
							style={styles.input}
						/>
						<TouchableOpacity
							style={styles.button}
							onPress={() =>
								register(
									firstName,
									lastName,
									email,
									password,
									confirmPassword
								)
							}
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
		marginBottom: 15,
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
});

export default Signup;
