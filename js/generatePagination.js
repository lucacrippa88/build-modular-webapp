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
