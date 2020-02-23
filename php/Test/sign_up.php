<?php 
$conn = mysqli_connect("localhost","root","","jewellery_db");
 
 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
$obj = json_decode($json,true);

$email_id = $obj['email_id'];
$password = $obj['password'];
$adhar = $obj['adhar'];
$ph_no = $obj['ph_no'];
$gender = $obj['gender'];
 
 // Creating SQL query and insert the record into MySQL database table.
// "INSERT INTO `user_tbl` (`user_id`, `email_id`, `password`, `register_on`, `aadhar_card`, `ph_no`, `gender`, `img_name`) VALUES (NULL, '$email_id', '$password', ".date().", '$adhar', '$ph_no', '$gender', '')"
$Sql_Query = "INSERT INTO `user_tbl` (`user_id`, `email_id`, `password`, `aadhar_card`, `ph_no`, `gender`, `img_name`) VALUES (NULL, '$email_id', '$password', '$adhar', '$ph_no', '$gender', '')";
 
 
 if(mysqli_query($conn,$Sql_Query)){
 
 // If the record inserted successfully then show the message.
$MSG = 'Register Successfully' ;
 
// Converting the message into JSON format.
$json = json_encode($MSG);
 
// Echo the message.
 echo $json ;
 
 }
 else{
 
 echo 'Try Again';
 
 }
 mysqli_close($conn);
?>