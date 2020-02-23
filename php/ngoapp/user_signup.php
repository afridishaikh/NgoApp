<?php
$link = mysqli_connect('localhost','root','','ngo');

$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$name = $obj['name'];
$mo_no = $obj['mo_no'];
$email = $obj['email'];
$username = $obj['username'];
$password = $obj['password'];

$query= "INSERT INTO `userdata`( `name`, `mo_no`, `email`, `username`, `password`) VALUES ('$name','$mo_no','$email','$username','$password')";
// $query= "INSERT INTO `userdata`( `name`, `mo_no`, `email`, `username`, `password`) VALUES ('addy','123','asd','asd','ads')";


if( mysqli_query($link,$query) )
{
	echo json_encode('Registered');
}
else 
{
	echo json_encode('Try Again');
}

mysqli_close($link);
?>