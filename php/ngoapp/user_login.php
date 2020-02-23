<?php
$conn = mysqli_connect("localhost","root","","ngo");

//  Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

$username = $obj['username'];
$password = $obj['password'];
 
//Applying User Login query with email and password match.
// SELECT * FROM `user_tbl` WHERE `email_id` LIKE 'ritenpatel1997@gmail.com' AND `password` LIKE 'riten' 
$Sql_Query = "SELECT * FROM userdata where username = '$username' and password = '$password' ";
// $Sql_Query = "SELECT * FROM `user_tbl` where email_id = '$email' and password = '$pwd' ";

// Executing SQL Query.
$check = mysqli_fetch_array(mysqli_query($conn,$Sql_Query));
 
 
if(isset($check)){
 
 $SuccessLoginMsg = 'Data Matched';
 
 // Converting the message into JSON format.
$SuccessLoginJson = json_encode($SuccessLoginMsg);
 
// Echo the message.
 echo $SuccessLoginJson ; 
 
 }
 
 else{
 
 // If the record inserted successfully then show the message.
$InvalidMSG = 'Invalid Username or Password Please Try Again' ;
 
// Converting the message into JSON format.
$InvalidMSGJSon = json_encode($InvalidMSG);
 
// Echo the message.
 echo $InvalidMSGJSon ;
 
 }
 
 mysqli_close($conn);
?>