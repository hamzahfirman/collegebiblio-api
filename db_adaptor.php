<?php
// class DatabaseAdaptor has functions that return data from 
// and modify database collegebiblio that has tables users and textbook_information
//
// Messages are sent to an instance of DatabaseAdaptor named $theDBA
// form controller.php such as $theDBA->addtextbook($textbook, $author)
//
// Authors: Ed Kudey
//
class DatabaseAdaptor {
  // The instance variable used in every one of the functions in class DatbaseAdaptor
  private $DB;
  // Make a connection to an existing data based named 'collegebiblio' that has
  // table textbook_information and table users. 
  public function __construct() {
    /* TESTING DEL ME
    $db = 'mysql:dbname=quotes; charset=utf8; host=127.0.0.1';
    $user = 'root';
    $password = '';
    */
    $db = 'mysql:dbname=collegebiblio; charset=utf8; host=cbinstance1.ccpv41wveuxp.us-west-1.rds.amazonaws.com:3306';
    $user = 'admin';
    $password = 'biblio2021!';
    
    try {
      $this->DB = new PDO ( $db, $user, $password );
      $this->DB->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    } catch ( PDOException $e ) {
      echo ('Error establishing Connection');
      exit ();
    }
  }
  
  // Return all textbook records as an associative array.
  public function gettextbooksAsArray() {
    // possible values of flagged are 't', 'f';
    //select * from textbook_information order by rating desc;
    $stmt = $this->DB->prepare ( "SELECT * FROM textbook_information ORDER BY rating DESC, added" );
    //$stmt = $this->DB->prepare ( "SELECT * FROM textbook_information WHERE flagged='f' ORDER BY rating DESC, added" );
    $stmt->execute ();
    return $stmt->fetchAll ( PDO::FETCH_ASSOC );
  }
  
   // Insert a new textbook into the database
  public function addNewtextbook($textbook, $author) {
    $stmt = $this->DB->prepare ( "INSERT INTO textbook_information (id, added, textbook, author, rating, flagged ) values(0, NOW(), :bind_textbook, :bind_author, 0, 0)" );
    $stmt->bindParam ( ':bind_textbook', $textbook );
    $stmt->bindParam ( ':bind_author', $author );
    $stmt->execute ();
  }
      
  // Raise the rating of the textbook with the given $ID by 1
  public function raiseRating($ID) {
    $stmt = $this->DB->prepare ( "UPDATE textbook_information SET rating=rating+1 WHERE id= :ID" );
    $stmt->bindParam ( 'ID', $ID );
    $stmt->execute ();
  }
  
  // Lower the rating of the textbook with the given $ID by 1
  public function lowerRating($ID) {
    $stmt = $this->DB->prepare ( "UPDATE textbook_information SET rating=rating-1 WHERE id= :ID" );
    $stmt->bindParam ( 'ID', $ID );
    $stmt->execute ();
  }
  
  // Delete the textbook with the given ID
  public function deletetextbook($ID) {
      $stmt = $this->DB->prepare ( "DELETE from textbook_information WHERE id= :ID" );
      $stmt->bindParam ( 'ID', $ID );
      $stmt->execute ();
  }
  public function register($accountName, $psw){
      // insert a new user
      $stmt = $this->DB->prepare('select * from users where email=:accountName');
      $stmt->bindParam(':accountName',$accountName);
      $stmt->execute();
      if($stmt->fetchAll(PDO::FETCH_ASSOC)){
          return false;
      }
      $stmt = $this->DB->prepare('insert into users(id, name, phonenumber, email, password) values(0,"REPLACE WITH NAME LATER","REPLACE WITH PHONE LATER", :accountName, :psw);');
      $stmt->bindParam(':accountName',$accountName);
      $my_hash = password_hash($psw, PASSWORD_DEFAULT);
      $stmt->bindParam(':psw',$my_hash);
      $stmt->execute();
      //$stmt->fetchAll(PDO::FETCH_ASSOC);
      return true;
  }
  public function verified($accountName, $psw) {
      $stmt = $this->DB->prepare('select password from users where email=:accountName');
      $stmt->bindParam(':accountName',$accountName);
      $stmt->execute();
      $hash = $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["password"];
      return password_verify($psw,$hash);
      
      
      
  }
  
} // end class DatabaseAdaptor

$theDBA = new DatabaseAdaptor();

?>