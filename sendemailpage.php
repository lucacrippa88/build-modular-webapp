<!doctype html>
<html lang="it">

<head>
  <meta charset='utf-8'>
  <meta name='description' class='put-head-desc-here' content=''>
  <meta name='keywords' class='put-head-keys-here' content=''>
</head>
<script type="text/javascript" src="js/genericFunctions.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/sweetalert2@7.29.2/dist/sweetalert2.all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>

<link href="https://fonts.googleapis.com/css?family=Slabo+27px" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">

<script src='https://www.google.com/recaptcha/api.js'></script> <!-- For secure form submission -->

<body>

<?php include("lib/nav.html") ?>

<!-- ************************************************************************************** -->

  <div class="container" style="width:80%!important;">

    <div class="row">
      <div class="col l12 s12">
        <h4 class="put-title-here0"></h4>
      </div>
    </div>

    <div id="contattaci" class="row">

      <div class="col l8 s12">
        <h4>Contattaci</h4>
      </div>

    </div>

    <div class="row">

      <div class="col l8 s12">

          <div class="card white">
            <div class="card-content">
              <p>

                <div class="input-field">
                  <input id="usersubject" type="text" data-length="40">
                  <label for="usersubject">Oggetto</label>
                </div>

                <div class="input-field">
                  <input id="username" type="text" data-length="40">
                  <label for="username">Nome</label>
                </div>

                <div class="input-field">
                  <input id="useremail" type="text" data-length="40">
                  <label for="useremail">Email</label>
                </div>

                <div class="input-field">
                  <textarea id="usercomments" class="materialize-textarea" data-length="1000"></textarea>
                  <label for="usercomments">Messaggio</label>
                </div>

                <label>
                  <input type="checkbox" id="userauth" />
                  <span>Autorizzo il trattamento dei dati (GDPR 2016/679).</span>
                </label>

                <br><br>

                <div class="g-recaptcha" data-sitekey="****************************"></div>

              </p>
            </div>
            <div class="card-action">
              <a id="submitmessage" class="btn-flat color1-text">Invia messaggio <i class="material-icons color1-text right">send</i></a>
            </div>
          </div>

        </div>

    </div>

  </div>



<!-- ************************************************************************************** -->

<?php include("lib/footer.html") ?>

</body>

<script>
  createHead();
  generatePage("informazioni", "0");
</script>

<script>

$("#submitmessage").click(function() {

  var data = {
      UserSubject: $("#usersubject").val(),
      UserName: $("#username").val(),
      UserEmail: $("#useremail").val(),
      UserComments: $("#usercomments").val(),
      UserAuth: $('#userauth').is(":checked"),
      UserCaptcha: grecaptcha.getResponse()
  };

    $.ajax(
    {
      url: 'api/SendEmail.php',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(data)
      {
        var obj = data.Sent;
        if(obj.payload == "sent"){

          swal({
            title: 'Grazie!',
            html: 'Messaggio inviato correttamente!<br><br>',
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: true,
            buttonsStyling: false,
            animation: false,
            position: 'center',
            customClass: 'z-depth-3 modal-font',
            confirmButtonClass: 'btn-flat color1-text',
            confirmButtonText: 'Ok',
            buttonsStyling: false,
            allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
          }).then(function () {
            window.location.replace("/") // redirect after clicking "ok"
          })

        }
        if(obj.payload == "error"){

          swal({
            title: 'Errore',
            html: 'Controlla i dati mancanti.<br><br>',
            position: 'center',
            customClass: 'z-depth-3 modal-font',
            buttonsStyling: false,
            confirmButtonClass: 'btn-flat color1-text',
            confirmButtonText: 'Ok',
            buttonsStyling: false,
            // showCancelButton: true,
            // cancelButtonClass: 'mdl-button close',
            // cancelButtonText: 'Annulla',
          })

        }

      } // end of function
    }); // end of ajax call

});

</script>

</html>
