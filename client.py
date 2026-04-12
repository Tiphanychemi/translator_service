import requests

url = "http://localhost:8080/translator_service/api/translate"

username = "user"
password = "password123"

text = "I am a computer science student"

response = requests.post(
    url,
    data=text,
    auth=(username, password),
    headers={"Content-Type": "text/plain"}
)

print("Status:", response.status_code)
print("Response:")
print(response.text)