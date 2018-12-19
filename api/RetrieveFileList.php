a<?php
/*
 * API: RetrieveFileList ©
 * Returns:
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2018
 */

  // Perform connection to DB (set table name)
  $tableName = "Contents";
  @include("../admincfg/ConnectDB.php");

  // Parameters
  //--------------------------------------------------------------------------------------

  $sl1 = $_POST['ct'];
  $by = $_POST['by'];
  $order = $_POST['ord'];
  $ck3 = $_POST['ar'];

  $select1 = explode(",", $sl1);

  $sql = "SELECT * FROM $tableName WHERE SELECT1='$select1[0]' AND CHECK3='$ck3' AND PAGE='' AND PUBLIC='true' AND TRASH='' ORDER BY $by $order";


  //--------------------------------------------------------------------------------------

  // Allow special characters (i.e. €)
  mysqli_set_charset($con, "utf8");

  $result = mysqli_query($con, $sql);
  $numrows = mysqli_num_rows($result);

    if($numrows > 0){
      while($row = mysqli_fetch_assoc($result)){
        // Prepare response, close connection and send response to front-end
        $array['Response'][] = array(
          'id' => $row['ID'],
          'select1' => $row['SELECT1'],
          'select2' => $row['SELECT2'],
          'maincontent' => $row['MAINCONTENT']
        );
      }
    }

    mysqli_close($con);
    echo json_encode($array); // Returns confirmation or query error

?>
