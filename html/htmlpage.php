<!doctype html>
<html lang="it">

<head>
  <meta charset='utf-8'>
  <meta name='description' class='put-head-desc-here' content=''>
  <meta name='keywords' class='put-head-keys-here' content=''>
</head>
<script type="text/javascript" src="js/genericFunctions.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>

<link href="https://fonts.googleapis.com/css?family=Slabo+27px" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">

<body>

<?php include("lib/nav.html") ?>

<!-- ************************************************************************************** -->
<!-- Using materialize.css components -->

    <div class="container" style="width:80%!important;">

        <div class="row">

            <div class="col l12 s12">
              <h4 class="put-title-here0"></h4>
              <span class="put-text-here0"></span>
            </div>

        </div>

        <br>

        <div class="row">

            <div class="col l12 s12">

                <div class="card horizontal">
                      <div class="card-image">
                        <img class="put-single-img-here1">
                      </div>
                      <div class="card-stacked">
                        <div class="card-content">
                          <p class="put-text-here1"></p>
                        </div>
                        <div class="card-action">
                          <a class="color2-text" href="#!">Continua...</a>
                        </div>
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
generatePage("url-of-the-page-0", "0");
generatePage("url-of-the-page-1, "1");
</script>

</html>
