<?php 
// Any user can add textbook and raise or lower ratings.

// File name view.php

// Author: Ed Kudey
session_start();
if (isset($_GET['logout'])){
    session_destroy();
    session_start();
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Textbook Service</title>
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body onload="showtextbooks()">

<h1>Textbook Service</h1>

<?php 
if (isset($_SESSION['user'])){
    echo '<a href="./addTextbook.php" ><button>Add textbook</button></a>';
    echo '<a href="./view.php?logout=1" ><button>Logout</button></a>';
}else{
    echo '<a href="./register.php" ><button>Register</button></a>';
    echo '<a href="./login.php" ><button>Login</button></a>';
}
?>

<div id="textbooks"></div>

<script>
var element = document.getElementById("textbooks");
function showtextbooks() {
	var anObj = new XMLHttpRequest();

	anObj.open('GET', 'controller.php?todo=gettextbooks', true);
	anObj.send();

	// This anonymous callback will execute when the server responds
	anObj.onreadystatechange = function() {
		if (anObj.readyState == 4 && anObj.status == 200) {
			element.innerHTML = anObj.responseText;
		} // End anonymous function
	};
} // End function getTextBooks
</script>

</body>
</html>