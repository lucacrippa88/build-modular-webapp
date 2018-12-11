/*
 * Function: generatePage ©
 * Requires:
  - URL of page (released during page creation and available in DB or in admin zone page list)
  - index related to divs to be updated
 * Returns: fills the divs with page content, and in case of page not found, redirects to 404 page
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 */
function generatePage(pag, id) {

  var pg_post = pag;
  if ((pg_post != "") && (pg_post != null)) { // if parsed URL not returns null

    $.ajax({
      url: 'api/RetrievePage.php', // retrieve page contents
      type: 'POST',
      data: {
        pg: pg_post
      },
      dataType: 'json',
      success: function(result) {

        for (var i in result.Response) {
          var obj = result.Response[i];

          if (obj != undefined) { // if RetrievePage does find match in the DB

            var maincontent;
            maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
            maincontent = jQuery.parseJSON(maincontent);

            var uploads = maincontent.uploads;
            var first_img;

            var chips = obj.chips1;
            chips = jQuery.parseJSON(chips);

            // Find first image
            for (var i in uploads) {
              var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
              if( (ext == "PNG") || (ext == "png") || (ext == "JPG") || (ext == "jpg") || (ext == "gif") || (ext == "jpeg") ){
                first_img = uploads[i].file;
                break;
              }
            }
            var card_image = "files/"+first_img;

            $('.put-subtitle-here' + id).html(maincontent.text0);
            $('.put-title-here' + id).html(maincontent.text1);
            $('.put-text-here' + id).html(maincontent.textarea1);
            $('.put-desc-here' + id).html(maincontent.textarea2);
            $('.put-text2-here' + id).html(maincontent.text2);
            $('.put-text3-here' + id).html(maincontent.text3);

            // Use this if you want to create a background image: edit html
            // var image_container = "<div class='mdl-card__title image-panel' style='background:url("+card_image+") center / cover; height:140px;'></div>";
            // $('.put-img-here' + id).html(image_container);

            // Use this if you want to put image into a container
            $('.put-single-img-here' + id).attr("src","files/"+first_img);

            // Delete quill classes from maincontent.textarea1 content
            $('div[class*="ql-tooltip"]').remove();
            $('.ql-clipboard').remove();
            $('.ql-editor').removeAttr("contenteditable");

            var count_annex = 0;
            for (var i in uploads) {
              var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
              if( (ext == "pdf") ){
                $('.put-annex-here' + id).append("<a target='_blank' href='files/"+uploads[i].file+"' class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect'>Scarica allegato <i class='material-icons'>attachment</i></a><br>");
                count_annex++;
              }
            }
            if(count_annex == 0){ $('.put-annex-here' + id).remove(); }

            // Head description and keywords
            // For pages, only for main page displayed (id == "0")
            if(id == "0"){
              var chips_arr = [];
              for (var i in chips) {
                chips_arr.push(chips[i].tag);
              }
              chips_arr = JSON.stringify(chips_arr);
              chips_arr = chips_arr.replace('[', '');
              chips_arr = chips_arr.replace(/"/g, ''); // replace all " occurrencies
              chips_arr = chips_arr.replace(']', '');
              $('.put-head-keys-here').attr("content", chips_arr);
              $('.put-head-desc-here').attr("content", maincontent.textarea2);
            }

          } else {
            window.location = "404";
          } // if retrieved page parameter does not exist

        }

      } // end of function
    }); // end of ajax call

  } else {
    window.location = "404";
  } // if retrieved page does not exist
} // end of generatePage
