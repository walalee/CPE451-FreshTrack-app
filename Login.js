import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
const [fontsLoaded] = useFonts({
    PromptRegular: require('./assets/Prompt-Regular.ttf'),
    PromptLight: require('./assets/Prompt-Light.ttf'),
    PromptBold: require('./assets/Prompt-Bold.ttf'),
    PromptMedium: require('./assets/Prompt-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#9D0300", "#9D0300"]}
          style={styles.header}
        ></LinearGradient>
        <Image
          source={require("./assets/logoWhite.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* ส่วนขาวตรงกลาง */}
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>ยินดีต้อนรับกลับมา</Text>

        {/* ช่องกรอกอีเมล */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          value={email}
          onChangeText={setEmail}
        />

        {/* ช่องกรอกรหัสผ่าน */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* ปุ่ม Continue */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("MainApp")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* สมัครสมาชิก */}
        <Text style={styles.signupText}>
          ยังไม่มีบัญชีผู้ใช้ใช่หรือไม่?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("Signup")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    backgroundColor: "#9D0300",
  },
  header: {
    height: "33%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 400, // ปรับขนาดโลโก้ตามต้องการ
    height: 200,
    top: -50,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 100,
    fontFamily: "PromptBold",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "PromptRegular",
    color: "black",
    margin: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontFamily: "PromptRegular",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#9D0300",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "PromptRegular",
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "PromptRegular",
  },
  signupLink: {
    color: "#9D0300",
    fontFamily: "PromptRegular",
  },
});
