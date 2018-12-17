<?php

require_once("session.php");

// Prepare response, close connection and send response to front-end
$array['Response'] = array(
  'status' => $_SESSION["LoggedIn"]
);

// echo session_id();

echo json_encode($array); // Returns confirmation or query error

?>
