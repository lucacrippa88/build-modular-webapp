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
