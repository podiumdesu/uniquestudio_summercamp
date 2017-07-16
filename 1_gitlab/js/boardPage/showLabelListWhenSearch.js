
var allLabels = require('../data.js').allLabels;
var getAllLabelsIndex = require('../common/getAllLabelsIndex.js').getAllLabelsIndex;
var showNewBoardWhenClickAL = require('./showNewBoardWhenClickAL.js').showNewBoardWhenClickAL;

//每次修改数据以后需要重新进行计算
module.exports = {
  showLabelListWhenSearch: function showLabelListWhenSearch(searchLabel) {
    let label_num = searchLabel.length;
    var insertLabelsDisNode = document.getElementById("labelsTodisplay");
    var ddddNode = [];
    for (var i = 0 ; i < label_num; i++) {
      var dddd = '<div class = "choose"><label style = "vertical-align: top;"><input type="checkbox" value="" class="labelsCheckout"/><span class="checkboxStyle"></span></label>';
      dddd +='<div class = "labelsColor" style = "background-color : '+allLabels[searchLabel[i]].color+'"></div>';
      dddd +='<div class = "labelsName" style="display: inline-block"><span class="labelname">'+allLabels[searchLabel[i]].name+'</span></div></div>';
      ddddNode[i] = document.createElement("div");
      ddddNode[i].setAttribute("id",allLabels[searchLabel[i]].name);
      ddddNode[i].setAttribute("style","cursor:pointer");
      //alert(dddd);
      ddddNode[i].innerHTML = dddd;
      insertLabelsDisNode.appendChild(ddddNode[i]);
    }
    addaddadd();
 },
 showLabelListWhenSearch2: function showLabelListWhenSearch2(searchLabel) {
    console.log(showingBoardarray);
    var label_num = searchLabel.length;
    var insertLabelsDisNode = document.getElementById("labelsTodisplay2");
    var ddddNode = [];
    for (var i = 0 ; i < label_num; i++) {
      var dddd = '<div class = "choose"><label style = "vertical-align: top;"><input type="checkbox" value="" class="labelsCheckout"/>';
      if (showingBoardarray.indexOf(i)) {
        console.log(showingBoardarray);
        dddd += '<span class="checkboxStyle"'+' style="background-color:lightgreen"></span></label>';
      } else {
        dddd += '<span class="checkboxStyle"></span></label>';
      }
      dddd +='<div class = "labelsColor" style = "background-color : '+allLabels[searchLabel[i]].color+'"></div>';
      dddd +='<div class = "labelsName" style="display: inline-block"><span class="labelname">'+allLabels[searchLabel[i]].name+'</span></div></div>';
      ddddNode[i] = document.createElement("div");
      ddddNode[i].setAttribute("id",'add'+allLabels[searchLabel[i]].name);
      //alert(dddd);
      ddddNode[i].innerHTML = dddd;
      insertLabelsDisNode.appendChild(ddddNode[i]);
    }
    addaddadd2();
  }
}

$(".board-delete").live('click', function() {
  var index = $(this).parents(".board").attr("data-id");
  console.log("after-delete"+showingBoardarray);
  $(this).parents(".board").fadeOut(400 ,function() {
    deleteShowingBoardArray(index);
    var targetNode = '#'+allLabels[index].name;
    $(targetNode).children().children().children(".checkboxStyle").attr("style","background-color:transparent");
    $(this).remove();
  });
});


var showingBoardarray = [];   //将此时正在显示的label的index传入数组中进行保存。
console.log("showingBoardarray"+showingBoardarray);
function getShowingBoardArray(index) {    //添加新的index
  showingBoardarray.push(index);
  //console.log(showingBoardarray);
}
function deleteShowingBoardArray(index) {
  showingBoardarray.pop(index);
}

//当点击addlist中的label时，在下方的boardlist中显示出新的框框
function addaddadd() {
  let index = getAllLabelsIndex();
  let length = index.length;
  //console.log(length);
  var boardIndexInDisplay = showingBoardarray;
  for (let i = 0; i < length ; i++) {
    const sss = "#" + allLabels[index[i]].name;
    $(sss).click(function() {
      //console.log(showingBoardarray);
      if(showingBoardarray.indexOf(i) < 0) {
        //console.log(showingBoardarray);
        getShowingBoardArray(i);

        $(sss).children().children().children(".checkboxStyle").attr("style","background-color:lightgreen");
      //  addLabelInAddList(sss);
        showNewBoardWhenClickAL(i);//将点击的label的编号传入函数
        //console.log(i);
        console.log("added"+showingBoardarray);
      } else {
        deleteShowingBoardArray(i);
        $(".board").each(function() {
          //console.log(i);
          //console.log($(this).attr("data-id"));
          if(parseInt($(this).attr("data-id")) === i) {
            $(this).fadeOut(400,function() {     //这是一个可爱的回调函数
              $(this).remove();
            })
          }
        })
        $(sss).children().children().children(".checkboxStyle").attr("style","background-color:transparent");

      }
      //但是我需要显示的是包含这个label编号的issue；通过issueHave这个属性
    });
  }
}


function addaddadd2() {
  var index = getAllLabelsIndex();
  var length = index.length;
  for (var i = 0; i < length; i++) {
    var sss = "#add"+allLabels[index[i]].name;
    $(sss).click(function() {
      if($(this).children().children().children(".labelsCheckout + span").attr("class").indexOf("changeBack") > 0 ) {
          $(this).children().children().children(".labelsCheckout + span").removeClass("changeBack");
          $(this).children().children(".labelsName").children("span").removeClass("changeFontweight");
      } else {
          $(this).children().children().children(".labelsCheckout + span").addClass("changeBack");
          $(this).children().children(".labelsName").children("span").addClass("changeFontweight");
      }
      //addNewLabelToIssue(i);   //传入的是label的index；
    });
  }
}
