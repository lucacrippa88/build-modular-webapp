<?php
/*
 * API: RetrievePage ©
 * Returns: the seledted post values from the DB
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 */

  // Perform connection to DB (set table name)
  $tableName = "Contents";
  @include("../admincfg/ConnectDB.php");

  // Parameters
  //--------------------------------------------------------------------------------------

  $pg = $_POST['pg'];

  $sql = "SELECT * FROM $tableName WHERE URL='$pg' AND PAGE='true'";

  // Allow special characters (i.e. €)
  mysqli_set_charset($con, "utf8");

  //--------------------------------------------------------------------------------------
  $result = mysqli_query($con, $sql);
  $numrows = mysqli_num_rows($result);

    if($numrows > 0){
      while($row = mysqli_fetch_assoc($result)){
        // Prepare response, close connection and send response to front-end
        $array['Response'][] = array(
          // 'connected' => $connected,
          // 'posted' => $row['POSTED'],
          // 'updated' => $row['UPDATED'],
          'url' => $row['URL'],
          // 'page' => $row['PAGE'],
          // 'check1' => $row['CHECK1'],
          'check2' => $row['CHECK2'],
          'check3' => $row['CHECK3'],
          'select1' => $row['SELECT1'],
          'select2' => $row['SELECT2'],
          'chips1' => $row['CHIPS1'],
          'datetimes' => $row['DATETIMES'],
          'maincontent' => $row['MAINCONTENT'],
          'public' => $row['PUBLIC']
        );
      }
    }

    mysqli_close($con);
    echo json_encode($array); // Returns confirmation or query error

?>
