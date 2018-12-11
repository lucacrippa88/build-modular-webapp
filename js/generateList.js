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
  if( (cat_post == "galleria")||(cat_post=="podcast") ){
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
                // if( (obj.select1 == "")||(obj.select1 == "") ){ color = ""; }
                // ------------------------------------------------------------------------------------

                // If there is an image
                if(first_img == null){
                  var img_style = "display:none!important";
                } else {
                  var img_style = "";
                }

                // CREATE CARDS
                // CUSTOMIZE HERE ---------------------------------------------------------------------

                if( (obj.select1 == "Galleria") ){
                  var card = "<div class='card horizontal'><div class='card-image'><img src='"+card_image+"' style='"+img_style+" border-radius: 10px 0 0 10px!important; width: 100px; height: 190px; object-fit: cover;'></div><div class='card-stacked'><div class='card-content'><span class='card-title'>"+maincontent.text1+"</span><p class='put-text-here'>"+maincontent.textarea2+"</p></div><div class='card-action'><a class='color2-text' href='"+obj.url+"'>Vai alla galleria</a></div></div></div>";
                }

                if( (obj.select1 == "Podcast") ){
                  var card = "<div class='card card-podcast'><div class='card-image'><iframe style='"+img_style+" border-radius: 10px 10px 0 0!important;' width='100%' height='350px' src='https://www.youtube.com/embed/"+maincontent.text5+"?controls=0' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe><span class='card-title'>"+maincontent.text1+"</span></div><div class='card-content'><p>"+maincontent.textarea2+"</p></div></div>";
                }

                if( (obj.select1 == "Evento") ){
                  var card = "<div class='card horizontal'><div class='card-image'><img src='"+card_image+"' style='"+img_style+" border-radius: 10px 0 0 10px!important; width: 100px; height: 190px; object-fit: cover;'></div><div class='card-stacked'><div class='card-content'><span class='card-title'>"+maincontent.text1+"</span><p class='put-text-here'>"+maincontent.textarea2+"</p></div><div class='card-action'><a class='color2-text' href='"+obj.url+"'>Vai alla galleria</a></div></div></div>";
                }

                // ------------------------------------------------------------------------------------

                $('.put-cards-here').append(card);

                if(maincontent.text4 == "") { $('.text4-panel'+shown).css("display","none"); }
                if(first_img == undefined) { $('.image-panel'+shown).css("display","none"); }
                if(first_img == null) { $('.image-panel'+shown).css("display","none"); }

                // Check if number of shown post reaches the limit
                shown++;
                if(shown >= count) { break; }

        }

      } else { // If no posts are found

        var card = "Nessun post trovato."
        $('.put-cards-here').append(card);

        // pageClick(targetpage);        // Redirect to selected page

      } // if retrieved page does not exist

    } // end of function
  }); // end of ajax call

} // end of generateList
