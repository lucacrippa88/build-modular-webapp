<?php
/*
 * API: SearchDB ©
 * Returns:
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 * Updated: December 2018
 */

  // Perform connection to DB (set table name)
  $tableName = "Contents";
  @include("../admincfg/ConnectDB.php");

  // Parameters
  //--------------------------------------------------------------------------------------

  $search = $_POST['sw'];
  $within = $_POST['wi'];

  $searches = explode(" ", $search);

  $sql_start = "SELECT * FROM $tableName WHERE MAINCONTENT LIKE ";

  for($i = 0; $i < sizeof($searches); $i++){
    if(strlen($searches[$i]) >= 3) {
      $sql .= "'%$searches[$i]%' OR MAINCONTENT LIKE ";
    }
  }

  $sql = substr($sql, 0, -21);
  $sql = $sql_start.$sql;


  if($within == "all"){
    $sql .= "AND PUBLIC='true' AND PAGE='' AND TRASH='' ORDER BY POSTED DESC";
  }
  if($within == "posted"){
    $sql .= "AND PUBLIC='true' AND PAGE='' AND TRASH='' AND CHECK3='false' ORDER BY POSTED DESC";
  }
  if($within == "archived"){
    $sql .= "AND PUBLIC='true' AND PAGE='' AND TRASH='' AND CHECK3='true' ORDER BY POSTED DESC";
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
