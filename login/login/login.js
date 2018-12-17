/*************************************
 * Login page ©
 * Requires: 1 input text id=username, 1 input password id=password, 1 div class=show-password, 1 button submit id=login
 * Author: Luca Crippa - luca.crippa88@gmail.com
 *************************************/


/*
 * Function: mainLogin ©
 * Returns: unica funzione da includere nella pagina di login
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function mainLogin(){
  $('body').on("click","#login",function(){ requestLogin(); });
  $('body').on("click",".show-password",function(){ showPassword(); });
  showPasswordIcon();
}


/*
 * Function: showPasswordIcon ©
 * Returns: mostra l'icona di show password
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function showPasswordIcon() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        $(".show-password").text("visibility");
    } else {
        $(".show-password").text("visibility_off");
    }
}


/*
 * Function: showPassword ©
 * Returns: mostra la password se l'icona show password è cliccata
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
        showPasswordIcon();
    } else {
        x.type = "password";
        showPasswordIcon();
    }
}


/*
 * Function: errorPage ©
 * Returns: mostra la password se l'icona show password è cliccata
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function errorPage() {
  $(document).ready(function(){
    swal({
      title: 'Errore',
      html: 'Effettua il login.<br>',
      position: 'center',
      customClass: 'z-depth-3 modal-font',
      showConfirmButton: true,
      showCloseButton: false,
      // width: '30rem',
      animation: false,
      buttonsStyling: false,
      confirmButtonText: 'Login',
      confirmButtonClass: 'btn color2-back black-text',
    }).then(function () {
      window.location.replace('login.php');
    });
  });
}


/*
 * Function: requestLogin ©
 * Returns: richiede l'autorizzazione per effettuare il login
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function requestLogin() {
  var api = 'login/CheckLogin.php';
  var username = $('#username').val();
  var password = $('#password').val();

  $.ajax(
  {
    url: api,
    type: 'POST',
    data: { u: username, p: password },
    dataType: 'json',
    async: true,
    success: function(result){

      if(result.Response.login == "approved"){

        swal({
          title: 'Benvenuto!',
          html: 'Login effettuato, a breve verrai reindirizzato...<br><br>',
          position: 'center',
          customClass: 'z-depth-3 modal-font',
          showConfirmButton: false,
          showCloseButton: false,
          // width: '50rem',
          animation: false,
          timer: 3000,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          window.location.replace('spartiti.php');
        });
      } else {
        swal({
          title: 'Errore',
          html: 'Nome utente o password errati.<br><br>',
          position: 'center',
          customClass: 'z-depth-3 modal-font',
          showConfirmButton: true,
          showCloseButton: false,
          // width: '30rem',
          animation: false,
          buttonsStyling: false,
          confirmButtonClass: 'btn color2-back black-text',
        }).then(function () {
          window.location.replace('login.php');
        });
      }

    }

  }); // end of ajax call

}


/*
 * Function: showContainer ©
 * Returns: funzione da includere per richiedere il login per visitare la pagina
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function showContainer(){
  $(".container").css("visibility", "visible");
}


/*
 * Function: protectPage ©
 * Returns: funzione da includere per richiedere il login per visitare la pagina
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function protectPage(){
$(document).ready(function(){
    var api = 'login/SessionStatus.php';

    $.ajax(
    {
      url: api,
      type: 'POST',
      dataType: 'json',
      async: false,
      success: function(result){

        if(result.Response.status != null){
          // login ok: let page load and show content...
          showContainer();
          // console.log("sei loggato!");
        } else {
          window.location.replace('errore.php');
          // console.log("non sei loggato...");
        }

      }

    }); // end of ajax call
});
}


/*
 * Function: requestLogout ©
 * Returns: funzione da includere per richiedere il logout dall'area riservata
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function requestLogout(){
  // $('body').on("click","#logout",function(){
  $(document).ready(function(){

    // console.log("logout requested!");

    var api = 'login/PerformLogout.php';

    $.ajax(
  	{
  		url: api,
  		type: 'POST',
  		dataType: 'json',
  		async: true,
  		success: function(result){

        // console.log(result.Response.logout);

        if(result.Response.logout = "loggedout"){
          swal({
            title: 'Logout effettuato',
            html: 'Puoi continuare a navigare sul sito.<br><br>',
            position: 'center',
            customClass: 'z-depth-3 modal-font',
            showConfirmButton: false,
            showCloseButton: false,
            // width: '50rem',
            animation: false,
            timer: 3000,
            onBeforeOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
              }, 100)
            },
          }).then(function () {
						window.location.replace("index.php") // redirect after clicking "ok"
					});
        } else {
          window.location.replace('errore.php');
        }

  		}

  	}); // end of ajax call


  });
}
