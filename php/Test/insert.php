<?php
include 'conn.php';

$json = file_get_contents('php://input');

$obj = json_decode($json, true);


$name = $obj['name'];
$email = $obj['email'];
$phone_no = $obj['phone_no'];



$query = "INSERT INTO `users`(`name`, `email`, `phone_no`) VALUES ('$name','$email','$phone_no') " ;

if( mysqli_query($link,$query) )
{
	echo json_encode('Inserted');
}
else 
{
	echo json_encode('Try Again');
}

mysqli_close($link);
?>