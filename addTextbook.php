<!-- 
This code will be to page that appears when the Add TextBook menu item is chosen  
This form will be absorbed by the controller  

File name addTextBook.php

Author: Ed Kudey
-->
<!DOCTYPE html>
<html>
<head>
<title>Add TextBook</title>
<link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>


<h3>Add a Textbook</h3>

<form autocomplete="off" action="controller.php" method="post">
<div class="newTextBookContainer">
<textarea name="textbook" cols="75" rows="6" placeholder="Enter new textbook"></textarea>
<br>
<input type="text" name="author" placeholder="Author">
<br><br>
<input type="text" name="date" placeholder="01/01/2000">
<br><br>
<input type="submit" name="submit" value="Add TextBook">
</div>
</form>	

</body>
</html>
	