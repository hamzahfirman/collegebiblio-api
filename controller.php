<?php
// This file contains code this is a bridge between the view and the db_adaptor.
// Each if statement is checking to see what $_POST or $_GET are set with function
// isset().  
// Messages are sent to $theDBA->, $_SESSSION veraibles are set the
// header function redirects back to the proper page with after processing
// whatever form this code absorbs. This is the C in MVC, the Controller.
//
// File name: cotroller.php

// Author: Ed Kudey
//
session_start ();

require_once './db_adaptor.php';



if (isset ( $_GET ['todo'] ) && $_GET ['todo'] === 'gettextbooks') {
    $arr = $theDBA->gettextbooksAsArray ();
    unset($_GET ['todo']);
    echo gettextbooksAsHTML ( $arr );
}


if (isset ( $_POST ['author']) && isset ( $_POST ['textbook']) ){
    $author = htmlspecialchars( $_POST ['author']);
    $textbook = htmlspecialchars($_POST ['textbook']);
    $theDBA->addNewtextbook ( $textbook, $author );
    header ( "Location: view.php" ); 
}

if (isset ( $_POST ['update'] ) ){
  $clickedName = $_POST ['update'];
  $ID = $_POST ['ID'];
  
  if ($clickedName === 'increase')
    $theDBA->raiseRating ( $ID ); 

  if ($clickedName === 'decrease')
    $theDBA->lowerRating ( $ID );
  
  if ($clickedName === 'delete')
    $theDBA->deletetextbook ( $ID );
  
  header ( "Location: view.php" );
}



if (isset ( $_POST ['login'] ) && isset ( $_POST ['username'] ) && isset ( $_POST ['password'] )) {
  $username = htmlspecialchars($_POST ['username']);
  $password = htmlspecialchars($_POST ['password']);
 
  if ($theDBA->verified ( $username, $password )) {
    // Store Session Data
    $_SESSION ['user'] = $username;
    header ( "Location: view.php" );
  }
  else {
      //$_SESSION ['loginError'] = 'Invalid Account/Password';
      header ( "Location: ./login.php?mode=login&msg=Invalid Account/Password" );
  }
 
  //header ( "Location: textbooks.php" );
}

function gettextbooksAsHTML($arr) {
    $result = '';
    foreach ( $arr as $textbook ) {
        $result .= '<div class="container">';
        $result .= '"' . $textbook ['textbook'] . '"';
        $result .= '<br>';
        $result .= '	<p class="author"> &nbsp;&nbsp;--';
        $result .= $textbook ['author'];
        $result .= '<br>';
        $result .= '</p>';
        $result .=
        '<form action="controller.php" method="post">' .
        '<input type="hidden" name="ID" value="' . $textbook ["id"] . '"</input>' .
        '&nbsp;&nbsp;&nbsp;' . '<button name="update" value="increase">+</button>' .
        '&nbsp;<span id="rating"> ' . $textbook ["rating"] . '</span>' .
        '&nbsp;&nbsp;' .
        '<button name="update" value="decrease">-</button>' .
        '&nbsp;&nbsp;' ;
        if(isset($_SESSION['user'])){
            $result.= '<button name="update" value="delete">Delete</button>';
        }
        $result.= '</form> </div>';
    }
    return $result;
}

?>