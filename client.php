<?php

$url = "http://localhost:8080/translator_service/api/translate";

$username = "user";
$password = "password123";

$text = "I am a computer science student";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $text);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: text/plain"
]);

// Basic Auth
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

echo "Status: $status\n";
echo "Response:\n$response\n";

?>