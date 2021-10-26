<?php 
// This code will appear when the Register menu item is chosen.
// This form will be absorbed by the controller.

// File name: register.php

// Author: Ed Kudey

session_start ();

require_once './db_adaptor.php';
$error_msg = '';
if (isset ( $_POST ['register'] ) && isset ( $_POST ['username'] ) && isset ( $_POST ['password'] )) {
    $username = htmlspecialchars($_POST ['username']);
    $password = htmlspecialchars($_POST ['password']);
    
    if ($theDBA->register ( $username, $password )) {
        // Store Session Data
        $_SESSION ['user'] = $username;
        header ( "Location: view.php" );
    }else{
        $error_msg = '<h3>Account Name Taken</h3>';
    }
//     else {
//         $_SESSION ['loginError'] = 'Invalid Account/Password';
//         header ( "Location: ./login.php?mode=login" );
//     }
    
    //header ( "Location: view.php" );
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Register</title>
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>

<h3>Register</h3>
<form autocomplete="off"  action="register.php" method="post">
<div class="loginContainer">
<input type="text" id="username" name="username" placeholder='Username' required>
<br>
<input type="text" id="password" placeholder='Password' name="password" required>
<br><br>
<input type="submit" name="register" value="Register"> <br>
<?php 
echo $error_msg;
?>	
</div>
</form>