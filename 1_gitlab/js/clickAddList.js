
var showLabelListWhenSearch = require('./boardPage/showLabelListWhenSearch.js').showLabelListWhenSearch;
var showLabelListWhenSearch2 = require('./boardPage/showLabelListWhenSearch.js').showLabelListWhenSearch2;
var getAllLabelsIndex = require('./common/getAllLabelsIndex.js').getAllLabelsIndex;
var addLoadEvent = require('./common/commonfunction.js').addLoadEvent;
var createNewLabel = require('./boardPage/createNewLabel.js').createNewLabel;
var clear = require('./common/commonfunction.js').clear;
/*********************************AddList页面的函数块*************************************／
/*通过监听其父节点来解决*/
//为颜色块的每个颜色绑定点击事件。并获取它们的对应的颜色。
$(".eachColor").click(function() {
  var sss = $(this).attr("data-color");
  $("#chosenColor").attr("style","background-color:"+sss);
  $("#showColorName").val(sss);
});

$("#cancel").click(function() {
  $("#addNewLabel").removeClass("toDisplay");
  $("#addNewLabel").addClass("toHide");
});

/*想实现根据输入获取实时颜色变化，但是没成功*/
/*
$("#showColorName").bind("input propertychange",function() {  //使用bind检测输入框的实时变化，并进行搜索。
  if($("#showColorName").value.match(^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$) ){
    console.log("hello");
  }
});
*/

$("#ok").click(function()  {    //点击确认添加按钮以后添加
  if (document.getElementById("pppName").value.length === 0) {
    alert("Please name your label");
  } else if (document.getElementById("showColorName").value.length === 0) {
    alert("Please choose the color");
  } else {
    createNewLabel();
    var targetNode = $(".labelsTodisplay")[0];
    clear(targetNode);
    showLabelListWhenSearch(getAllLabelsIndex());
    alert("ok!");
  }
});

//点击addlist按钮时显示下拉菜单
//嘻嘻学习使用了一下jquery，真的很方便哎
$("button#addListBtn").click(function() {
  //判断添加label的页面是否存在
  if ($("div#addListUpdown").attr("class").indexOf("toDisplay") >= 0) {
    alert("ddd");
    $("div#addListUpdown").addClass("toHide");
    $("div#addListUpdown").removeClass("toDisplay");
  } else {
    $("div#addListUpdown").removeClass("toHide");
    $("div#addListUpdown").addClass("toDisplay");
  }
});

$("#closeAddListUpdown").click(function() {
  $("#addListUpdown").addClass("toHide");
})
/*一段SO上优秀的实现方法：用于实现点击空白关闭弹窗*/
$(document).mouseup(function(e) {
  var _area = $("#addListUpdown");   //目标区域
  //判断点击区域是否是目标区域
  if (!_area.is(e.target) && _area.has(e.target).length === 0) {
    if($("#addListUpdown").attr('class').indexOf("toDisplay") >= 0) {
      $("#addListUpdown").removeClass("toDisplay");
      $("#addListUpdown").addClass("toHide");
    }
  }
});

//跳出新增labels的页面
$("div.createNewLabels").click(function() {
  $("div#addListUpdown").addClass("toHide");
  $("div#addListUpdown").removeClass("toDisplay");
  $("#addNewLabel").removeClass("toHide");
  $("#addNewLabel").addClass("toDisplay");
});


//关闭
$("#toBackSearchLabel").click(function() {
  $("#addListUpdown").removeClass("toHide");
  $("#addListUpdown").addClass("toDisplay");
  $("#addNewLabel").addClass("toHide");
  document.getElementById("pppName").value = "";
//  document.getElementById("chosenColor").attr("style","")
});

$("#toCloseNewLabel").click(function() {
  $("#addNewLabel").addClass("toHide");
});
//要先建立起一个可以存放labels以及其对应的issue的编号以及它的颜色的数组。
/**boards页面下addlist时搜索labels
封装成可以显示被搜索到的labels的div块的函数
所需要传入的参数是allLabels[]中的index */

addLoadEvent(showLabelListWhenSearch(getAllLabelsIndex()));// 最开始显示所有的lables
addLoadEvent(showLabelListWhenSearch2(getAllLabelsIndex()));
