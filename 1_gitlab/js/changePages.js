
/*******************************页面切换****************************************/

//点击list和boards进行页面的切换
//内容渲染
/*碰到的问题：
在flex-body下的节点，如果不使用clear的话就没法更新新节点，（再添加新的节点就会跑到之前的那个页面上去）
但是如果clear的话，这个节点之后所有的节点都会没有，就必须要重新再建立链接。
*/
$("#boards").click(function(event) {
  $(this).addClass("listToChoose");

  $(this).parent().prev().children().removeClass("listToChoose");
  var childToAppend = document.getElementById("boardPage");
  childToAppend.setAttribute("class","toDisplay");
  var childToRemove = document.getElementById("listPage");
  childToRemove.setAttribute("class","toHide");
  $("#listPage").parent().removeClass("flex-body");
});

$("#list").click(function(event) {
  var childToRemove = document.getElementById("boardPage");
  $(this).addClass("listToChoose");
  $(this).parent().next().children().removeClass("listToChoose");
  var childToAppend = document.getElementById("listPage");
  childToRemove.setAttribute("class","toHide");
    childToAppend.setAttribute("class","toDisplay");
  $("#listPage").parent().addClass("flex-body");

});
/***********************************************************************************/
