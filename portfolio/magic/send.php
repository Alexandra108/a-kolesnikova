<?php
$to  = "<admin@example.com>, " ;
$to .= "admin@example.com>";

$subject = "Запись на сеанс";
$name    = $_POST['name'];
$phone   = $_POST['phone'];
$email   = $_POST['email'];

$message = "Имя: {$name}, Телефон: {$phone}, Email: {$email}";

$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: От кого письмоа {$email}\r\n";

mail($to, $subject, $message, $headers);
?>