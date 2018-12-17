<?php

/*
 * API: PerformLogout ©
 * Returns: performs logout
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */

require_once("session.php");
session_destroy();
$_SESSION["LoggedIn"] = session_id();

if ($_SESSION["LoggedIn"] == ""){
  $logout = "loggedout";
} else {
  $logout = "still-loggedin";
}

// Prepare response, close connection and send response to front-end
$array['Response'] = array(
  'logout' => $logout,
  'id' => $_SESSION["LoggedIn"]
);

echo json_encode($array); // Returns confirmation or query error

?>
