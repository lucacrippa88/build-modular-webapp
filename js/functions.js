// WEBSITE LOCATION FROM ROOT
// Change it with the path in which the website home page is located within the root domain
var path = "/pagename";


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
            // CUSTOMIZE HERE ---------------------------------------------------------------------
            // var image_container = "<div class='mdl-card__title image-panel' style='background:url("+card_image+") center / cover; height:140px;'></div>";
            // $('.put-img-here' + id).html(image_container);
            // ------------------------------------------------------------------------------------

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
            window.location = "404"; // managed via .htaccess
          } // if retrieved page parameter does not exist

        }

      } // end of function
    }); // end of ajax call

  } else {
    window.location = "404"; // managed via .htaccess
  } // if retrieved page does not exist
} // end of generatePage


/*
 * Function: generatePost ©
 * Requires: URL of page
 * Returns: fills the divs with post content, and in case of post not found, redirects to 404 page
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: archived flag is not required
 */
function generatePost(url) {

  var url_post = url;
  if ((url_post != "") && (url_post != null)) { // if parsed URL not returns null

    $.ajax({
      url: 'api/RetrievePost.php', // retrieve page contents
      type: 'POST',
      data: {
        ur: url_post
      },
      dataType: 'json',
      async: false,
      success: function(result) {

        if (result != null) { // if RetrievePost does find match in the DB

        for (var i in result.Response) {
          var obj = result.Response[i];

            var select2_init = obj.select2.charAt(0);
            var select2_init_up = select2_init.toUpperCase();

            var datetimes = obj.datetimes;
            datetimes = jQuery.parseJSON(datetimes);

            var chips = obj.chips1;
            chips = jQuery.parseJSON(chips);

            var maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
            maincontent = jQuery.parseJSON(maincontent);

            var uploads = maincontent.uploads;
            var first_img;

            var gallery = maincontent.gallery;
            var first_pho;

            // Find first image
            for (var i in uploads) {
              var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
              if( (ext == "PNG") || (ext == "png") || (ext == "JPG") || (ext == "jpg") || (ext == "gif") || (ext == "jpeg") ){
                first_img = uploads[i].file;
                break;
              }
            }

            for (var i in gallery) {
              var ext = gallery[i].photo.substring(gallery[i].photo.length-3, gallery[i].photo.length);
              if( (ext == "PNG") || (ext == "png") || (ext == "JPG") || (ext == "jpg") || (ext == "gif") || (ext == "jpeg") ){
                first_pho = gallery[i].photo;
                break;
              }
            }

            // Use first image as default
            $('.put-img-here').attr("style","background: url('files/"+first_img+"') center / cover;");
            $('.put-single-img-here').attr("src","files/"+first_img);
            $('.banner-top').attr("src","files/"+first_img);

            // Create gallery
            // CUSTOMIZE HERE ---------------------------------------------------------------------
            var gallery_container = "<div class='m-p-g'><div class='m-p-g__thumbs put-photos-here' data-google-image-layout data-max-height='200'></div><div class='m-p-g__fullscreen'></div></div>";
            // ------------------------------------------------------------------------------------
            $('.put-gallery-here').html(gallery_container);

            // Add photos to gallery area
            var count_photos = 0;
            for (var i in gallery) {
                // CUSTOMIZE HERE ---------------------------------------------------------------------
                $('.put-photos-here').append("<img src='files/"+obj.id+"/"+gallery[i].photo+"' data-full='files/"+obj.id+"/"+gallery[i].photo+"' class='m-p-g__thumbs-img' />");
                // ------------------------------------------------------------------------------------
                count_photos++;
              }
            }
            // Remove annex space if there aren't annexes
            if(count_photos == 0){ $('.put-gallery-here').remove(); }

            // Add files to download area
            var count_annex = 0;
            for (var i in uploads) {
              var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
              if( (ext == "pdf") ){
                // CUSTOMIZE HERE ---------------------------------------------------------------------
                $('.put-annex-here').append("<a target='_blank' href='files/"+uploads[i].file+"' class='waves-effect btn color2-back'>Scarica <i class='material-icons right'>attach_file</i></a><br>");
                // ------------------------------------------------------------------------------------
                count_annex++;
              }
              if( (ext == "mp3") ){
                // CUSTOMIZE HERE ---------------------------------------------------------------------
                $('.put-annex-here').append("<a target='_blank' href='files/"+uploads[i].file+"' class='waves-effect btn color2-back'>Scarica audio <i class='material-icons right'>save_alt</i></a><br>");
                // ------------------------------------------------------------------------------------
                count_annex++;
              }
            }
            // Remove annex space if there aren't annexes
            if(count_annex == 0){ $('.put-annex-here').remove(); }

            // MANAGE CONTENT
            $('.put-subtitle-here').html(maincontent.text0);
            $('.put-title-here').html(maincontent.text1);
            $('.put-text-here').html(maincontent.textarea1);

            // Delete quill classes from maincontent.textarea1 content
            $('div[class*="ql-tooltip"]').remove();
            $('.ql-clipboard').remove();
            $('.ql-editor').removeAttr("contenteditable");

            $('.put-desc-here').html(maincontent.textarea2);

            // Select right chip color: you can use it during card creation
            var color = "";
            // CUSTOMIZE HERE ---------------------------------------------------------------------
            // if( (obj.select1 == "film")||(obj.select1 == "essai")||(obj.select1 == "eventi") ){ color = "indigo"; }
            // ------------------------------------------------------------------------------------

            // CUSTOMIZE HERE ---------------------------------------------------------------------
            var genre_chip = "&ensp;<span class='chip' style='position:relative;top:7px;left:-5px'>"+obj.select2+"</span>";
            // ------------------------------------------------------------------------------------

            $('.put-genre-chip-here').html(genre_chip);

            if(maincontent.text3 != ""){ $('.put-text3-here').html(maincontent.text3);
            } else { $('.text3-panel').remove(); }

            if(maincontent.text2 != ""){ $('.put-text2-here').html(maincontent.text2);
            } else { $('.text2-panel').remove(); }

            if(maincontent.text4 != ""){ $('.put-text4-here').attr("href", maincontent.text4);
            } else { $('.text4-panel').remove(); }

            if(maincontent.text5 != ""){ $('.text5-panel').attr("src", "https://www.youtube.com/embed/"+maincontent.text5+"?rel=0&amp;controls=0&amp;showinfo=0");
            } else { $('.text5-panel').remove(); }

            if(maincontent.text7 != ""){ $('.put-text7-here').html(maincontent.text7);
            } else { $('.text7-panel').remove(); }

            if(maincontent.text8 != ""){ $('.put-text8-here').html(maincontent.text8);
            } else { $('.text8-panel').remove(); }

            if(obj.select1 != ""){ $('.put-sel1-here').html(obj.select1);
            } else { $('.sel1-panel').remove(); }

            if(obj.select2 != ""){ $('.put-sel2-here').html(obj.select2);
            } else { $('.sel2-panel').remove(); }

            $('.put-text6-here').html(maincontent.text6);
            $('.put-posted-here').append(obj.posted);

            if(obj.updated != "0000-00-00 00:00:00"){ $('.put-updated-here').append(obj.updated);
            } else { $('.put-updated-here').append("-"); }

            if(obj.check2 == "true"){ $('.put-view-here').html("In evidenza"); }
            if(obj.check2 == "false"){ $('.view-chip').remove(); }


            for (var i in datetimes) {
              // CUSTOMIZE HERE ---------------------------------------------------------------------
              $('.put-datetimes-here').append("<b>"+datetimes[i].date + "</b> ore <b>" + datetimes[i].time + "</b><br>");
              // ------------------------------------------------------------------------------------
            }

            // Head description and keywords
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

        } else {
          window.location = "404";
        } // if retrieved page does not exist

      } // end of function
    }); // end of ajax call

  } else {
    window.location = "404";
  } // if retrieved page does not exist
} // end of generatePage


/*
 * Function: generateList ©
 * Requires:
  - category of post (max 1)
  - true/false if want to show an archived or a not archived post list
  - the max number of posts to show
  - the selected page number
  - the page name in which the function is used
  - the type of pagination (if only page of both page and category)
  - max posts per page
 * Returns: fills the cards with post content. If no category is selected, returns all posts
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: contains a synchronous ajax call to be sure to create the page before adding javascript events
 */
function generateList(cat, arch, set, pagenum, targetpage, targetpagination, maxperpage) {

  // Variables initialization
  var cat_post = cat;
  var target = targetpage;
  var pagination = targetpagination;
  var arch_post = arch;
  var shown = 0;  // Iterative counter of shown posts
  var count = 0;  // Total number of posts to be shown (and counted)
  var max = maxperpage;    // Max num of cards per page (MINIMUM: 2)
  var pages = 0;
  var order;

  // Show order setup
  // CUSTOMIZE HERE ---------------------------------------------------------------------
  if( (cat_post == "galleria")||(cat_post=="podcast")||(cat_post=="liturgia") ){
  // ------------------------------------------------------------------------------------
    order = "DESC"; // if yes, show from most recent to oldest
  } else {
    order = "ASC";  // if not show from oldest to most recent
  }

  // Set maximum number pf posts to be shown
  if (set == "") {
    count = 100000000000000000000000000000000000; // If not set, set to "infinite"
  } else {
    count = set;                                  // If correctly set
  }

  // Variables setup
  if( maxperpage == null ){
    max = 100000000000000000000000000000000000; // If not set, set to "infinite"
  }

  // PERFORM AJAX CALL
    $.ajax({
      url: 'api/RetrieveList.php', // retrieve page contents
      type: 'POST',
      data: {
        ct: cat_post,
        ar: arch_post,
        ord: order,
      },
      async: false, // synchronous ajax call to be sure to create the page before adding javascript events
      dataType: 'json',
      success: function(result) {

        if (result != null) { // if RetrieveList does find match in the DB

          // SET PAGINATION
          var size = result.Response.length;
          if (set == "") { set = size; }  // If number of posts to be shown on page is not set, set it to size
          if (size <= set) {              // If number of retrieved posts is less or equal to the number of posts to be shown
            pages = Math.ceil(size/max);
          } else {
            pages = Math.ceil(set/max);
          }
          generatePagination(pages, pagenum);       // Generate the correct amount of pages
          pageClick(target, cat_post, pagination);  // Redirect to selected page

        // ANALYZE RETRIEVED POSTS
        for (var i in result.Response) {

            var j = parseFloat(i) + 1;
            var currentpage = Math.ceil(j/max);
            if( currentpage != pagenum ){ continue; }

            var obj = result.Response[i];

                var select1_init = obj.select1.charAt(0);
                var select1_init_up = select1_init.toUpperCase();

                var select2_init = obj.select2.charAt(0);
                var select2_init_up = select2_init.toUpperCase();

                var maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
                maincontent = jQuery.parseJSON(maincontent);

                var datetimes = obj.datetimes;
                datetimes = jQuery.parseJSON(datetimes);

                var uploads = maincontent.uploads;
                var first_img = null;
                var first_att = null;

                // Find first image
                for (var i in uploads) {
                  var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
                  if( (ext == "PNG") || (ext == "png") || (ext == "JPG") || (ext == "jpg") || (ext == "gif") || (ext == "jpeg") ){
                    first_img = uploads[i].file;
                    break;
                  }
                }
                var card_image = "files/"+first_img;

                // Find first attachment
                for (var i in uploads) {
                  var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
                  if( (ext == "PDF") || (ext == "pdf") ){
                    first_att = uploads[i].file;
                    break;
                  }
                }
                var card_att = "files/"+first_att;

                // Extract datetimes for the selected event card
                var card_datetimes = "";
                for (var k in datetimes) {
                  card_datetimes = card_datetimes + "<b>"+datetimes[k].date + "</b> ore <b>" + datetimes[k].time + "</b><br>";
                }

                // Select right chip color: you can use it during card creation
                var color = "";
                // CUSTOMIZE HERE ---------------------------------------------------------------------
                // if( (obj.select1 == "")||(obj.select1 == "") ){ color = ""; }
                // ------------------------------------------------------------------------------------

                // CUSTOMIZE HERE ---------------------------------------------------------------------
                var genre_chip = "&ensp;<span class='chip' style='position:relative;top:-10px;left:-5px;margin-bottom:10px!important;'>"+obj.select2+"</span>";
                // ------------------------------------------------------------------------------------

                // If there is an image of attachment
                if(first_img == null){
                  var img_style = "display:none!important;";
                } else {
                  var img_style = "";
                }

                if(first_att == null){
                  var att_style = "display:none!important;";
                } else {
                  var att_style = "";
                }

                // CREATE CARDS
                // CUSTOMIZE HERE ---------------------------------------------------------------------

                if( (obj.select1 == "Galleria") ){
                  var card = "<div class='card horizontal'><div class='card-image'><img src='"+card_image+"' style='"+img_style+" border-radius: 10px 0 0 10px!important; width: 100px; height: 190px; object-fit: cover;'></div><div class='card-stacked'><div class='card-content'><span class='card-title'>"+maincontent.text1+"</span><p class='put-text-here'>"+maincontent.textarea2+"</p></div><div class='card-action'><a class='color2-text' href='"+obj.url+"'>Vai alla galleria</a></div></div></div>";
                }

                if( (obj.select1 == "Podcast") ){
                  var card = "<div class='card card-podcast'><div class='card-image'><iframe style='border-radius: 10px 10px 0 0!important;' width='100%' height='350px' src='https://www.youtube.com/embed/"+maincontent.text5+"?controls=0' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><span class='card-title'>"+maincontent.text1+"</span></div><div class='card-content'><p>"+maincontent.textarea2+"</p></div></div>";
                }

                if( (obj.select1 == "Evento") ){
                  var card = "<div class='card horizontal'><div class='card-image'><img src='"+card_image+"' style='"+img_style+" border-radius: 10px 0 0 10px!important; width: 100px; height: 100%; object-fit: cover;'></div><div class='card-stacked'><div class='card-content'><span class='card-title'>"+maincontent.text1+"</span><p class='put-text-here'>"+maincontent.textarea2+"<br><br>"+card_datetimes+"</p></div><div class='card-action'><a class='color2-text' href='"+obj.url+"'>Leggi tutto</a></div></div></div>";
                }

                if( (obj.select1 == "Liturgia") ){
                  var card = "<div class='card'><div class='card-image'><img src='"+card_image+"' style='"+img_style+" border-radius: 10px 0 0 10px!important; width: 100px; height: 100%; object-fit: cover;'></div><div class='card-content'><span class='card-title'>"+maincontent.text1+"</span><h6 class='color1-text'>"+maincontent.text0+"</h6><p>"+maincontent.textarea1+"<br><a class='color1-text' style='"+att_style+"' href='"+card_att+"'>Scarica <i class='material-icons left'>attachment</i></a></p></div></div>";
                }

                console.log(card);

                // ------------------------------------------------------------------------------------

                $('.put-cards-here').append(card);

                // Delete quill classes from maincontent.textarea1 content
                $('div[class*="ql-tooltip"]').remove();
                $('.ql-clipboard').remove();
                $('.ql-editor').removeAttr("contenteditable");

                if(maincontent.text4 == "") { $('.text4-panel'+shown).css("display","none"); }
                if(first_img == undefined) { $('.image-panel'+shown).css("display","none"); }
                if(first_img == null) { $('.image-panel'+shown).css("display","none"); }

                // Check if number of shown post reaches the limit
                shown++;
                if(shown >= count) { break; }

        }

      } else { // If no posts are found

        var card = "Nessun post trovato.<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"
        $('.put-cards-here').append(card);

        // pageClick(targetpage);        // Redirect to selected page

      } // if retrieved page does not exist

    } // end of function
  }); // end of ajax call

} // end of generateList


/*
 * Function: generateList ©
 * Requires:
  - category of post (max 1)
  - true/false if want to show an archived or a not archived post list
  - the max number of posts to show
  - the selected page number
  - the page name in which the function is used
  - the type of pagination (if only page of both page and category)
  - max posts per page
 * Returns: fills the cards with post content. If no category is selected, returns all posts
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: contains a synchronous ajax call to be sure to create the page before adding javascript events
 */
function generateFileList(cat, arch) {

  // Variables initialization
  var cat_post = cat;
  var arch_post = arch;
  var order;
  var ord_by;

  // Show order setup
  // CUSTOMIZE HERE ---------------------------------------------------------------------
  if( (cat_post == "spartito") ){
  // ------------------------------------------------------------------------------------
    order = "DESC"; // if yes, show from most recent to oldest
    ord_by = "URL";
  } else {
    order = "ASC";  // if not show from oldest to most recent
    ord_by = "POSTED";
  }

  // PERFORM AJAX CALL
    $.ajax({
      url: 'api/RetrieveFileList.php', // retrieve page contents
      type: 'POST',
      data: {
        ct: cat_post,
        by: ord_by,
        ar: arch_post,
        ord: order,
      },
      async: false, // synchronous ajax call to be sure to create the page before adding javascript events
      dataType: 'json',
      success: function(result) {

        if (result != null) { // if RetrieveFileList does find match in the DB


        // ANALYZE RETRIEVED POSTS
        for (var i in result.Response) {

            var obj = result.Response[i];

                var maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
                maincontent = jQuery.parseJSON(maincontent);

                var uploads = maincontent.uploads;
                var file_line = "";
                var audio_line = "";

                // Find files and audios
                for (var i in uploads) {
                  var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
                  if( (ext == "pdf") || (ext == "PDF") ){
                    var file_item = "<a target='_blank' href='files/"+uploads[i].file+"'><i class='material-icons tooltipped pointer' data-position='bottom' data-tooltip='"+uploads[i].file+"'>attachment</i></a>";
                    file_line = file_line.concat(file_item);
                  }
                  if( (ext == "mp3") || (ext == "m4a") ){
                    var audio_item = "<a target='_blank' href='files/"+uploads[i].file+"'><i class='material-icons tooltipped pointer' data-position='bottom' data-tooltip='"+uploads[i].file+"'>music_note</i></a>";
                    audio_line = audio_line.concat(audio_item);
                  }
                }

                var video = "<a target='_blank' href='https://www.youtube.com/watch?v="+maincontent.text5+"'><i class='material-icons tooltipped pointer' data-position='bottom' data-tooltip='Video'>play_circle_outline</i></a>";

                console.log("ciao");
                console.log(file_line);
                console.log(audio_line);
                console.log(video);

                // CUSTOMIZE HERE ---------------------------------------------------------------------
                var genre_chip = "&ensp;<span class='chip' style='position:relative;top:-10px;left:-5px;margin-bottom:10px!important;'>"+obj.select2+"</span>";
                // ------------------------------------------------------------------------------------

                // CREATE CARDS
                // CUSTOMIZE HERE ---------------------------------------------------------------------

                if( (obj.select1 == "Spartito") ){
                  var card = "<tr><td id='swal1' class='pointer'>"+maincontent.text1+"</td><td><div class='chip'>"+maincontent.text2+"</div></td><td>"+file_line+"</td><td>"+audio_line+"</td><td>"+video+"</td></tr>";
                }
                // ------------------------------------------------------------------------------------

                $('.put-cards-here').append(card);

                // Delete quill classes from maincontent.textarea1 content
                $('div[class*="ql-tooltip"]').remove();
                $('.ql-clipboard').remove();
                $('.ql-editor').removeAttr("contenteditable");

        }

      } else { // If no posts are found

        var card = "Nessuno spartito trovato.<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"
        $('.put-cards-here').append(card);

        // pageClick(targetpage);        // Redirect to selected page

      } // if retrieved page does not exist

    } // end of function
  }); // end of ajax call

} // end of generateList


/*
 * Function: generateSearchReport ©
 * Requires: category of post (max 1), where to search, the number of posts to show
 * Returns: fills the cards with post content. If no type is selected, returns all posts
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: verify if archived flag is required or not
 */
function generateSearchReport(search, within, set) {

  var search_word = search;
  var within_type = within;
  var shown = 0;  // Iterative counter of shown posts
  var count = 0;  // Total number of posts to be shown (and counted)

  // Set maximum number pf posts to be shown
  if (set == "") {
    count = 100000000000000000000000000000000000; // If not set, set to "infinite"
  } else {
    count = set;                                  // If correctly set
  }

    $.ajax({
      url: 'api/SearchDB.php', // retrieve page contents
      type: 'POST',
      data: {
        sw: search_word,
        wi: within_type,
      },
      dataType: 'json',
      success: function(result) {

        if (result != null) { // if RetrievePost does find match in the DB

          $('.put-cards-here').html("");

        // Start analyzing retrieved posts

        for (var i in result.Response) {

            var obj = result.Response[i];

            if( (obj.select1 == "film")||(obj.select1 == "essai")||(obj.select1 == "teatro")||(obj.select1 == "teatro famiglie")||(obj.select1 == "teatro scuole")||(obj.select1 == "eventi") ){

              var select1_init = obj.select1.charAt(0);
              var select1_init_up = select1_init.toUpperCase();

              var select2_init = obj.select2.charAt(0);
              var select2_init_up = select2_init.toUpperCase();

              var maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
              maincontent = jQuery.parseJSON(maincontent);

              var datetimes = obj.datetimes;
              datetimes = jQuery.parseJSON(datetimes);

              var uploads = maincontent.uploads;
              var first_img = "";

              // Find first image
              for (var i in uploads) {
                var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
                if( (ext == "PNG") || (ext == "png") || (ext == "JPG") || (ext == "jpg") || (ext == "gif") || (ext == "jpeg") ){
                  first_img = uploads[i].file;
                  break;
                }
              }
              var card_image = "files/"+first_img;

              // Extract datetimes for the selected event card
              var card_datetimes = "";
              for (var k in datetimes) {
                card_datetimes = card_datetimes + "<b>"+datetimes[k].date + "</b> ore <b>" + datetimes[k].time + "</b><br>";
              }

              // Select right chip color
              var color = "";
              // CUSTOMIZE HERE ---------------------------------------------------------------------
              // if( (obj.select1 == "")||(obj.select1 == "") ){ color = "indigo"; }
              // ------------------------------------------------------------------------------------

              // If post is archived, add the archived grey chip
              if(obj.check3 == "true"){
                var arch_chip = "&ensp;<span class='mdl-chip mdl-chip--contact' style='position:relative;top:5px;'><span class='mdl-chip__contact mdl-color--grey mdl-color-text--white'><i class='material-icons' style='position:relative;top:4px;'>check</i></span><span class='mdl-chip__text'>Archiviato</span></span>";
              } else {
                var arch_chip = "";
              }

              // Create event card in list with all required info (title, chips, description, datetimes, link, ...)
              var card = "<div class='mdl-cell mdl-cell--4-col mdl-cell--12-col-phone mdl-card mdl-shadow--2dp' style='height:100%!important;'><img class='image-panel"+shown+"' style='object-fit:cover' height='150px' src='"+card_image+"'><div class='mdl-card__title'><h2 class='mdl-card__title-text'>"+maincontent.text1+"</h2></div><div class='mdl-card__supporting-text put-text-here' itemprop='description'><p>"+card_datetimes+"</p><span class='mdl-chip mdl-chip--contact' style='position:relative;top:5px;'><span class='mdl-chip__contact mdl-color--"+color+" mdl-color-text--white'>"+select2_init_up+"</span><span class='mdl-chip__text'>"+obj.select2+"</span></span>"+arch_chip+"<br><br></div><div class='mdl-card__actions mdl-card--border text4-panel'><a href='"+obj.url+"' class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect put-text4-here'>dettagli <i class='material-icons'>navigate_next</i></a></div></div>";

              $('.put-cards-here').append(card);

              if(maincontent.text4 == "") { $('.text4-panel'+shown).css("display","none"); }
              if(first_img == "") { $('.image-panel'+shown).css("display","none"); }

              // Check if number of shown post reaches the limit
              shown++;
              if(shown >= count) { break; }

            }

        }

      } else { // If no posts are found

        var card = "<div class='mdl-cell mdl-cell--12-col mdl-cell--12-col-phone animated gray-trans' id=''><h4>Nessuno spettacolo trovato</h4><br><br><br><br><br></div>";

        $('.put-cards-here').html("");
        $('.put-cards-here').append(card);

        } // if retrieved page does not exist

      } // end of function
    }); // end of ajax call

} // end of generatePage


/*
 * Function: generateFeatured © - TOBE UPDATED
 * Requires: category of post (max 3), true/false if want to show an archived or a not archived post list, the number of posts to show, the number of pages, if to post reduces contents (only title and text)
 * Returns: fills the cards with post content. If no category is selected, returns all posts
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: verify if archived flag is required or not
 */
function generateFeatured() {

  var shown = 0;

    $.ajax({
      url: 'api/RetrieveFeatured.php', // retrieve page contents
      type: 'POST',
      dataType: 'json',
      success: function(result) {

        if (result != null) { // if RetrievePost does find match in the DB

        // Start analyzing retrieved posts

        for (var i in result.Response) {

          var obj = result.Response[i];

            var select1_init = obj.select1.charAt(0);
            var select1_init_up = select1_init.toUpperCase();

            var select2_init = obj.select2.charAt(0);
            var select2_init_up = select2_init.toUpperCase();

            var maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
            maincontent = jQuery.parseJSON(maincontent);

            var datetimes = obj.datetimes;
            datetimes = jQuery.parseJSON(datetimes);

            var uploads = maincontent.uploads;
            var first_img;

            // Find first image
            for (var i in uploads) {
              var ext = uploads[i].file.substring(uploads[i].file.length-3, uploads[i].file.length);
              if( (ext == "PNG") || (ext == "png") || (ext == "JPG") || (ext == "jpg") || (ext == "gif") || (ext == "jpeg") ){
                first_img = uploads[i].file;
                break;
              }
            }
            var card_image = "files/"+first_img;

            // Select right chip color
            var color = "";
            // if( (obj.select1 == "")||(obj.select1 == "")||(obj.select1 == "") ){ color = "indigo"; }

            // Extract datetimes for the selected event card
            var card_datetimes = "";
            for (var k in datetimes) {
              card_datetimes = card_datetimes + "<b>"+datetimes[k].date + "</b> ore <b>" + datetimes[k].time + "</b><br>";
            }

            var featured_chip = "&ensp;<span class='mdl-chip mdl-chip--contact view-chip' style='position:relative;top:5px'><span class='mdl-chip__contact mdl-color--grey mdl-color-text--white'><i class='material-icons' style='position:relative;top:3px'>local_play</i></span><span class='mdl-chip__text'>In evidenza</span></span>";
            // var featured_chip = "";

            // Create event card in list with all required info
            // Schema.org optimized
            var card = "<div class='mdl-cell mdl-cell--4-col mdl-cell--12-col-phone mdl-card mdl-shadow--2dp' itemscope itemtype='http://schema.org/Movie' style='height:100%!important;'><img style='object-fit:cover' height='150px' src='"+card_image+"'><div class='mdl-card__title'><h2 class='mdl-card__title-text' itemprop='headline'>"+maincontent.text1+"</h2></div><div class='mdl-card__supporting-text put-text-here' itemprop='description'><p>"+card_datetimes+"</p><span class='mdl-chip mdl-chip--contact' style='position:relative;top:5px;'><span class='mdl-chip__contact mdl-color--"+color+" mdl-color-text--white'>"+select2_init_up+"</span><span class='mdl-chip__text'>"+obj.select2+"</span></span>"+featured_chip+"<br><br></div><div class='mdl-card__actions mdl-card--border text4-panel'><a href='"+obj.url+"' class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect put-text4-here'>dettagli <i class='material-icons'>navigate_next</i></a></div></div>";

            $('.put-featured-cards-here').append(card);

            shown++;

        }

      }

      } // end of function
    }); // end of ajax call

} // end of generatePage


/*
 * Function: generatePagination ©
 * Requires:
  - total number of pages
  - current page number
 * Returns: creates the pagination with your own style
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: called inside generateList()
 */
function generatePagination(total, current) {

  if(total > 1) {

    // EDIT PAGINATION STYLE ---------------------------------------------------

    var container = "<ul class='pagination'><li class='disabled'><a href='#!'><i class='material-icons'>chevron_left</i></a></li><span class='put-numbers-here'></span><li class='disabled'><a href='#!'><i class='material-icons'>chevron_right</i></a></li></ul>";

    $('.put-pagination-here').html(container);

    for(i=1; i<=total; i++) {
      if(i == current) {
        var button = "<li class='active page-click color2-back white-text'><a href='#!'>"+i;
      } else {
        var button = "<li class='waves-effect page-click'><a href='#!'>"+i;
      }

      // -----------------------------------------------------------------------

      $('.put-numbers-here').append(button);
    }

  }

}


/*
 * Function: pageClick ©
 * Requires:
  - page number
  - selected category
  - action
 * Returns: redirects to clicked page
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: called inside generateList()
 */
function pageClick(page, category, toget){
  $(".page-click").click(function(){
    var clicked = $(this).children().text();
    if(toget == "onlypage") {
      window.location.href = path+"/"+page+"?pagina="+clicked;
    }
    if(toget == "onlycategory") {
      window.location.href = path+"/"+page+"?categoria="+category;
    }
    if(toget == "all") {
      window.location.href = path+"/"+page+"?categoria="+category+"&pagina="+clicked;
    }
  });
}


/*
 * Function: categoryClick ©
 * Requires: pagename
 * Returns: redirects to clicked category
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: called inside generateList()
 */
function categoryClick(page){
  $(".category-click").click(function(){
    var clicked = $(this).text();
    if(clicked == "Tutte le categorie"){
      window.location.href = "/"+page;
    } else {
      window.location.href = "/"+page+"?categoria="+clicked;
    }
  });
}


/*
 * Function: generateDropdown ©
 * Requires: first and second category variables
 * Returns: fills the selected categories chips and fills the dropdown category list from config.json
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: called inside generateList()
 */
function generateDropdown(category, category2){

  // Generate selected category chips
  var cat_init = category.charAt(0);
  var cat_init_up = category.toUpperCase();
  var cat2_init = category2.charAt(0);
  var cat2_init_up = category2.toUpperCase();

  var cat_block = "<span class='mdl-chip mdl-chip--contact mdl-chip--deletable'><span class='mdl-chip__contact mdl-color--teal mdl-color-text--white'>"+cat_init+"</span><span class='mdl-chip__text'>"+category+"</span><a id='delete-cat' class='mdl-chip__action'><i class='material-icons' style='position:relative;bottom:0px;'>cancel</i></a></span>";
  var cat2_block = "<span class='mdl-chip mdl-chip--contact mdl-chip--deletable'><span class='mdl-chip__contact mdl-color--teal mdl-color-text--white'>"+cat2_init+"</span><span class='mdl-chip__text'>"+category2+"</span><a id='delete-cat2' class='mdl-chip__action'><i class='material-icons' style='position:relative;bottom:0px;'>cancel</i></a></span>";

  if (category != "") {
    $(".put-sel-category-here").html(cat_block);
  }
  if ( (category != "") && (category2 != "") ) {
    $(".put-sel-category-here").html(cat_block+"&ensp;"+cat2_block);
  }

  // Click on delete category chip
  var path = window.location.pathname;
  dynamicLink('#delete-cat', path+'?categoria=&categoria2='+category2, '');
  dynamicLink('#delete-cat2', path+'?categoria='+category+'&categoria2=', '');

  // Fill categories drop down menu
  $.ajax({
    contentType: "application/json",
    dataType: "json",
    url: "../admincfg/config.json", // page configuration file
    async: false,
    success: function (result){

      $('.put-dropdown-here').css("position","relative");
      $('.put-dropdown-here').css("right","-5px");
      $('.put-dropdown-here').css("z-index","2");

      var button = "<button style='cursor:pointer;' id='demo-menu-lower-right' class='mdl-button mdl-js-button mdl-button--icon'><i class='material-icons'>more_vert</i></button>";
      $('.put-dropdown-here').html(button);
      var dropdown = "<ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect dropdown-category' for='demo-menu-lower-right'>";
      $('.put-dropdown-here').append(dropdown);
      $('.dropdown-category').append("<li class='mdl-menu__item category-click'>Tutte le categorie</li>");

            for(var i in result){
                for(var j in result[i].select1){
                  // ITEMS SELECTION
                  if( (result[i].select1[j]=="film")||(result[i].select1[j]=="teatro")||(result[i].select1[j]=="teatro famiglie")||(result[i].select1[j]=="teatro scuole")||(result[i].select1[j]=="eventi") ){
                    $('.dropdown-category').append("<li class='mdl-menu__item category-click'>"+result[i].select1[j]+"</li>"); // DROPDOWN MENU
                  }
                }
            }

      }
    });

}


/*
 * Function: generateDropdown ©
 * Requires: first and second category variables
 * Returns: fills the selected categories chips and fills the dropdown category list from config.json
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: February 2018
 * Comments: called inside generateList()
 */
function generateRadio(page){

  // Fill categories drop down menu
  $.ajax({
    contentType: "application/json",
    dataType: "json",
    url: "admincfg/config.json", // page configuration file
    async: false,
    success: function (result){

      $('.put-radios-here').append("<i class='material-icons' style='position:relative;top:5px;left:0px'>keyboard_arrow_right</i><a style='position:relative;left:0px' href='/"+page+"'>tutti</a><br>");

            for(var i in result){
                for(var j in result[i].select1){
                  // ITEMS SELECTION
                  if( (result[i].select1[j]=="film")||(result[i].select1[j]=="essai")||(result[i].select1[j]=="teatro")||(result[i].select1[j]=="teatro famiglie")||(result[i].select1[j]=="teatro scuole")||(result[i].select1[j]=="eventi") ){
                    var check = "<i class='material-icons' style='position:relative;top:5px;left:0px'>keyboard_arrow_right</i><a style='position:relative;left:0px' href='/archivio.php?categoria="+result[i].select1[j]+"'>"+result[i].select1[j]+"</a><br>";
                    $('.put-radios-here').append(check);
                  }
                }
            }

      }
    });

}
