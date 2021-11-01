<?php 
// This code will be to page that appears when the Login menu item is chosen
// This form will be absorbed by the controller using the form
// File name: login.php
// Author: Ed Kudey
session_start();
?>

<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>


<h3>Login</h3>

<form autocomplete="off" action="controller.php" method="post">
<div class="loginContainer">
<input type="text" name="username" placeholder='Username' required>
<br> 
<input type="text" name="password" placeholder='Password' required>
<br> <br>
<input type="submit" name="login" value="Login"> 
	<?php
//     if (isset($_SESSION['loginError']))
//        echo $_SESSION['loginError'];
       if (isset($_GET['msg']))
           echo $_GET['msg'];
    ?>
</div>
</form>
	

</body>
</html>