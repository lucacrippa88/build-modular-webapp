<!doctype html>
<html lang="it">

<head>
  <meta charset='utf-8'>
  <meta name='description' class='put-head-desc-here' content=''>
  <meta name='keywords' class='put-head-keys-here' content=''>
</head>
<script type="text/javascript" src="js/genericFunctions.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="login/login.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/sweetalert2@7.29.2/dist/sweetalert2.all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>

<link href="https://fonts.googleapis.com/css?family=Slabo+27px" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">

<body>

<?php include("lib/nav.html") ?>

<!-- ************************************************************************************** -->

    <div class="container" style="width:80%!important;">

        <div class="row">

            <div class="col l12 s12">
              <h4>Area riservata</h4>
            </div>

        </div>

        <div class="row">

          <div class="col l4 s12">

              <div class="input-field">
                <input id="username" name="username" type="text">
                <label for="username">Username</label>
              </div>

          </div>

        </div>

        <div class="row">

          <div class="col l4 s12">

              <div class="input-field">
                <input id="password" name="password" type="password">
                <label for="password">Password</label>
                <i class="material-icons show-password" style="cursor:pointer; position:relative; top:-42px; width:20px; left:87%;"></i>
              </div>

          </div>

        </div>

        <br>

        <div class="row">
    &ensp;
          <button class="btn waves-effect waves-light color2-back black-text" type="submit" id="login" name="action">Login
            <i class="material-icons black-text right">lock_open</i>
          </button>

           <a class="waves-effect btn-flat">
             <i data-position="right" data-tooltip="Hai dimenticato le credenziali d'accesso?" class="tooltipped material-icons black-text">help_outline</i>
           </a>

        </div>

        <div class="row">
&ensp;
          <label>
              <input type="checkbox"/>
              <span>Resta connesso</span>
          </label>

        </div>

        <br><br><br>

    </div>

<!-- ************************************************************************************** -->

<?php include("lib/footer.html") ?>

</body>

<script>
createHead();
mainLogin();
</script>

</html>
