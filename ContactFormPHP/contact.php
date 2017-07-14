<?php
	 require_once "Mail.php";
	 
	// validation
	// $validationOK=true;
	// if (!$validationOK) {
	//   print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
	//   exit;
	// }

	
	$name = Trim(stripslashes($_POST['Name'])); 
	$message = Trim(stripslashes($_POST['Message'])); 
	$from = Trim(stripslashes($_POST['Email'])); 

    $to = "alex <akad.alex@gmail.com>";
	$subject = "New Message from website!";
	$body = "Name: ".$name."\n"."Message: ".$message;
	 
	$host = "cpanel.freehosting.com";
	$username = "_mainaccount@aleksandraweb.com";
	$password = "";
	 
	$headers = array ('From' => $from,
	   					'To' => $to,
	   					'Subject' => $subject);

	$smtp = Mail::factory('smtp',
	   array ('host' => $host,
	     'auth' => true,
	     'username' => $username,
	     'password' => $password));
	 
	$mail = $smtp->send($to, $headers, $body);
	 
	if (PEAR::isError($mail)) {
	   echo("<p>" . $mail->getMessage() . "</p>");
	 } else {
	   echo("<p>Message successfully sent!</p>");
	}

?>