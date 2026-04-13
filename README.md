# Darija Translator – LLM-powered RESTful Web Service

## Project Overview

This project implements a RESTful web service that translates English text into Moroccan Darija using a Large Language Model (LLM).

The backend is built using Java (Jakarta RESTful Web Services) and deployed on WildFly. The system integrates with Google Gemini to generate translations.

The project demonstrates a multi-client architecture where multiple applications interact with the same secured API.

---

## Features

- English to Moroccan Darija translation using Gemini
- Secure REST API with Basic Authentication
- Chrome Extension (side panel + right-click translation)
- Python client
- PHP client
- React Native mobile app
- Read-aloud feature (Text-to-Speech)

---

## System Architecture

The system is composed of:

- Backend:
  - Java REST API deployed on WildFly

- Clients:
  - Chrome Extension
  - Python script
  - PHP script
  - React Native mobile app

- External Service:
  - Google Gemini API

All clients communicate with the same REST endpoint.

---

## Technologies Used

- Java (Jakarta REST)
- WildFly
- Google Gemini API
- JavaScript (Chrome Extension)
- Python
- PHP
- React Native
- HTML / CSS

---

##  Authentication

The API is secured using Basic Authentication.

Example header:

Authorization: Basic base64(username:password)

---

## How to Run

1. Set Gemini API Key

Windows:
set GEMINI_API_KEY=your_api_key_here

PowerShell:
$env:GEMINI_API_KEY="your_api_key_here"

2. Build the project

mvn clean package

3. Deploy to WildFly

Copy WAR file to:
wildfly/standalone/deployments/

Start server:
standalone.bat 

4. Test API

http://localhost:8080/translator_service/api/translate/test

---

## API Endpoints

GET /api/translate/test

POST /api/translate

---

## Code Structure

### Backend

TranslatorResource.java – Main REST endpoint  
GeminiTranslationService.java – Handles translation logic  
BasicAuthFilter.java – Handles authentication  
CORSFilter.java – Enables browser access  
RestApplication.java – Registers components  

### Chrome Extension

manifest.json – Configuration  
background.js – Right-click logic  
sidepanel.html – UI  
sidepanel.js – API calls + read aloud  
style.css – Styling  

### Clients

client.py – Python client  
client.php – PHP client  
App.js – React Native client  

---

## UML Diagrams

Class, Deployment, and Sequence diagrams included in /diagrams/

---

## Challenges

- CORS issues  
- Authentication across clients  
- Network debugging  
- Localhost vs IP  
- Gemini latency  

---

