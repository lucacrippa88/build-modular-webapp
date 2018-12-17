<?php

/*
 * API: CheckLogin ©
 * Returns: check main login credentials
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */

$u = $_POST['u'];
$p = $_POST['p'];

$username = "*********";
$password = "*********";

if ($u==$username && $p==$password ){
  // Set session variable
  require_once("session.php");
  $_SESSION["LoggedIn"] = session_id();
  $login = 'approved';
} else {
  // Set session variable
  $_SESSION["LoggedIn"] = session_id();
  $login = 'rejected';
}

// Prepare response, close connection and send response to front-end
$array['Response'] = array(
  'login' => $login,
  'id' => $_SESSION["LoggedIn"]
);

echo json_encode($array); // Returns confirmation or query error

?>
