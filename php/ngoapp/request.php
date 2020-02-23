<?php
$link = mysqli_connect('localhost','root','','ngo');

$json = file_get_contents('php://input');

$obj = json_decode($json, true);

$problem = $obj['problem'];
$photo = $obj['photo'];
$location = $obj['location'];
$address = $obj['address'];
$mo_no = $obj['mo_no'];


$query= "INSERT INTO `requestdata`( `problem`, `photo`, `location`, `address`, `mo_no`) VALUES ('$problem ','$photo','$location','$address','$mo_no')";
// $query= "INSERT INTO `userdata`( `name`, `mo_no`, `email`, `username`, `password`) VALUES ('addy','123','asd','asd','ads')";


if( mysqli_query($link,$query) )
{
	echo json_encode('Request sent');
}
else 
{
	echo json_encode('Try Again');
}

mysqli_close($link);
?>