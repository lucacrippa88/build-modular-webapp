<?php
/*
 * API: RetrieveList ©
 * Returns:
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 */

  // Perform connection to DB (set table name)
  $tableName = "Contents";
  @include("../admincfg/ConnectDB.php");

  // Parameters
  //--------------------------------------------------------------------------------------

  $sl1 = $_POST['ct'];
  $ck3 = $_POST['ar'];
  $order = $_POST['ord'];

  $select1 = explode(",", $sl1);

  if($sl1 == ""){
    $sql = "SELECT * FROM $tableName WHERE CHECK3='$ck3' AND PAGE='' AND PUBLIC='true' AND TRASH='' ORDER BY POSTED $order";
  } else {
    $sql = "SELECT * FROM $tableName WHERE (SELECT1='$select1[0]' OR SELECT1='$select1[1]' OR SELECT1='$select1[2]') AND CHECK3='$ck3' AND PAGE='' AND PUBLIC='true' AND TRASH='' ORDER BY POSTED $order";
  }

  //--------------------------------------------------------------------------------------

  // Allow special characters (i.e. €)
  mysqli_set_charset($con, "utf8");

  $result = mysqli_query($con, $sql);
  $numrows = mysqli_num_rows($result);

    if($numrows > 0){
      while($row = mysqli_fetch_assoc($result)){
        // Prepare response, close connection and send response to front-end
        $array['Response'][] = array(
          // 'connected' => $connected,
          'id' => $row['ID'],
          'posted' => $row['POSTED'],
          'updated' => $row['UPDATED'],
          'url' => $row['URL'],
          'page' => $row['PAGE'],
          'check1' => $row['CHECK1'],
          'check2' => $row['CHECK2'],
          'check3' => $row['CHECK3'],
          'select1' => $row['SELECT1'],
          'select2' => $row['SELECT2'],
          'chips1' => $row['CHIPS1'],
          'datetimes' => $row['DATETIMES'],
          'maincontent' => $row['MAINCONTENT'],
          'public' => $row['PUBLIC'],
          'trash' => $row['TRASH']
        );
      }
    }

    mysqli_close($con);
    echo json_encode($array); // Returns confirmation or query error

?>
