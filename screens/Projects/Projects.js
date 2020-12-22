import React from "react";
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import background from "../../assets/background.jpg";
import Project from "./Project";
import Footer from "../../Footer/Footer";

const Projects = () => {
	return (
		<View style={styles.container}>
			<ImageBackground source={background} style={styles.background}>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>New Project</Text>
				</TouchableOpacity>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 40 }}
				>
					<Project />
					<Project />
					<Project />
					<Project />
					<Project />
					<Project />
					<Project />
					<Project />
					<Project />
				</ScrollView>
			</ImageBackground>
			<Footer />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	background: {
		alignItems: "center",
		flex: 1,
	},
	button: {
		alignSelf: "center",
		marginTop: 80,
		backgroundColor: "#03989E",
		borderRadius: 6,
		height: 40,
		width: 320,
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
		paddingTop: 10,
	},
});

export default Projects;
