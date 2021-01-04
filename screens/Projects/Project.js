import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Plan from "../../components/Plan";

const Project = (props) => {
	console.log(props.match.params.id);
	return (
		<View style={styles.container}>
			<Text style={styles.projectTitle}>Chapelle</Text>
			<TouchableOpacity style={styles.newPlanButton}>
				<Text style={styles.newPlanText}>New Plan</Text>
			</TouchableOpacity>
			<ScrollView>
				<View>
					<Text style={styles.sectionText}>
						Base Architectural Plans (8 Plans)
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator="false"
						style={styles.plans}
					>
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
					</ScrollView>
				</View>
				<View>
					<Text style={styles.sectionText}>
						Base Architectural Plans (8 Plans)
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator="false"
						style={styles.plans}
					>
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
					</ScrollView>
				</View>
				<View>
					<Text style={styles.sectionText}>
						Base Architectural Plans (8 Plans)
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator="false"
						style={styles.plans}
					>
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
					</ScrollView>
				</View>
				<View>
					<Text style={styles.sectionText}>
						Base Architectural Plans (8 Plans)
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator="false"
						style={styles.plans}
					>
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
					</ScrollView>
				</View>
				<View>
					<Text style={styles.sectionText}>
						Base Architectural Plans (8 Plans)
					</Text>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator="false"
						style={styles.plans}
					>
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
						<Plan />
					</ScrollView>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#03989E",
		flex: 1,
		flexDirection: "column",
	},
	projectTitle: {
		marginTop: 50,
		fontSize: 24,
		marginLeft: 12,
		color: "#fff",
	},
	newPlanButton: {
		width: 200,
		height: 45,
		backgroundColor: "#fff",
		borderRadius: 6,
		alignSelf: "center",
		marginTop: 30,
		marginBottom: 20,
	},
	newPlanText: {
		textAlign: "center",
		marginTop: 15,
		color: "#03989E",
		fontWeight: "bold",
	},
	sectionText: {
		fontSize: 16,
		marginLeft: 12,
		color: "#D8D8D8",
		marginBottom: 20,
	},
	plans: {
		marginBottom: 25,
	},
});

export default Project;
