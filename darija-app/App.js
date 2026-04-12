import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const translate = async () => {
    setOutput("Sending request...");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch("http://localhost:8080/translator_service/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
                "Authorization": "Basic dXNlcjpwYXNzd29yZDEyMw=="
            },
            body: input
        });

      clearTimeout(timeout);

      const text = await response.text();
      setOutput(text);
    } catch (error) {
      clearTimeout(timeout);
      setOutput("Request timed out or failed: " + error.message);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Darija Translator</Text>

        <TextInput
            style={styles.input}
            placeholder="Enter text..."
            value={input}
            onChangeText={setInput}
            multiline
        />

        <Button title="Translate" onPress={translate} />

        <Text style={styles.result}>{output}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});