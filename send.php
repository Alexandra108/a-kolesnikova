 ​<?php
	$name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "test@mail.ru";
    $subject = "От поситителя сайта";
    $text =  "Написал(а): {$name}\r\nКонтактный email - {$email}\r\nТекст письма: {$message}\r\n";

    $headers = "Content-type: text/html; charset=utf-8\r\n";
	$headers .= "From: От кого письмо {$email}\r\n";
    
    mail($to, $subject, $text, $headers);

?>