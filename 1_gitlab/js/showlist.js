//获取分别存储label和issue数据的数组
var allLabels = require('./data.js').allLabels;
var issue_info = require('./data.js').issue_info;

//获取issue里 open close all的数量
var allIssue = require('./common/openclosenum.js').allIssue;
var openIssueNum = require('./common/openclosenum.js').openIssueNum;
var closeIssueNum = require('./common/openclosenum.js').closeIssueNum;

var showOpenCloseNum = require('./common/showOpenCloseNum.js').showOpenCloseNum;
//import {allIssue } from './openclosenum.js';

var showListIssue = require('./common/showIssuePage.js').showListIssue;

var tagsInIssueNum = require('./common/commonfunction.js').tagsInIssueNum;
var addLoadEvent = require('./common/commonfunction.js').addLoadEvent;
var clear = require('./common/commonfunction.js').clear;
var strInArray = require('./common/commonfunction.js').strInArray;

var searchBarFunc = require('./listPage/searchBarFunc.js').searchBarFunc;

var getAllLabelsIndex = require('./common/getAllLabelsIndex.js').getAllLabelsIndex;



/************************************listPage函数块*************************************/
//绑定点击事件。点击后，显示数据的区域进行clear，然后重新根据传入的数组渲染数据。

var displayAllIssue = document.getElementById("all_num");
displayAllIssue.onclick = function(event) {
  var targetNode = document.getElementsByClassName("display-issue")[0];
  $(this).addClass("chooseActive");
  $("#open_num").removeClass("chooseActive");
  $("#close_num").removeClass("chooseActive");
  clear(targetNode);
  showListIssue(allIssue());
};

var displayOpenIssue = document.getElementById("open_num");
displayOpenIssue.onclick = function(event) {
  var targetNode = document.getElementsByClassName("display-issue")[0];
  $(this).addClass("chooseActive");
  $("#all_num").removeClass("chooseActive");
  $("#close_num").removeClass("chooseActive");
  clear(targetNode);
  showListIssue(openIssueNum());
};

var displayCloseIssue = document.getElementById("close_num");
displayCloseIssue.onclick = function(event) {
  var targetNode = document.getElementsByClassName("display-issue")[0];
    $(this).addClass("chooseActive");
    $("#open_num").removeClass("chooseActive");
    $("#all_num").removeClass("chooseActive");
  clear(targetNode);

  showListIssue(closeIssueNum());
  $(".issueClosed").removeClass("issueClosed");
};

/////////监听搜索label的回车事件，并进一步执行程序
var searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup",function(event) {    //监听回车事件
  var event = event || window.event;
  if (event.keyCode == 13) {
    searchBarFunc();
  }
});

//进行两个数组之间数据的交换
//思路： 获取label中的issuehave，然后在issue中对
//如果是对boardlist下面的issue进行添加，那么每次会获取的就是issue的名字，issue的index，以及issue现在含有的tag
//同时会得到此时boardlist上 修改的label的名字，同时获得这个label在数组中的index。
//然后将这个修改同时记录在allLabels和issue_info中就行啦




$("#addListSearchBar").bind("input propertychange",function() {  //使用bind检测输入框的实时变化，并进行搜索。
  searchLabel($(this).val());
});
//模糊搜索
function searchLabel(sss) {
  //模糊匹配的搜索！利用正则表达式匹配一下就行啦
  var targetNode = $(".labelsTodisplay")[0];
  var resultarr = [];
  var searchForValue = sss;
  if (searchForValue.length === 0) {
    clear(targetNode);
    showLabelListWhenSearch(getAllLabelsIndex());
  }
  var searcharr = searchForValue.split('');
  var reg = new RegExp(searcharr.join(".*"));
  for (let i = 0; i < allLabels.length; i++) {
    if (reg.exec(allLabels[i].name)) {
      resultarr.push(i);
    }
  }
  clear(targetNode);
  showLabelListWhenSearch(resultarr);
}


/*点击close和backlog板块上的加号时，进行新的issue的添加*/
/*使用事件委托*/

$(".left-board .board-header").bind('click',function(e) {
  if (e.target && e.target.id === "leftAdd") {   //捕捉到了最里层的点击事件
    if ($(this).next().attr("class").indexOf("toHide") > 0) {
      $(this).next().removeClass("toHide");
    }
  } else {
    if ($(this).parent().attr("class").indexOf("displaySmall") > 0) {
      $(this).parent().removeClass("displaySmall");
      $(this).parent().children(".clickToHide").removeClass("toHide");
      $(this).children().children(".board-issue-count-container").removeClass("toHide");
      $(this).attr("style","border-bottom:  1px solid #e5e5e5;");
    } else {
      $(this).parent().addClass("displaySmall");
      $(this).next().addClass("toHide");
      $(this).parent().children(".clickToHide").addClass("toHide");
      $(this).children().children(".board-issue-count-container").addClass("toHide");
      $(this).attr("style","border-bottom: 0px");
    }
  }
});

$(".right-board .board-header").bind('click',function(e) {

    if ($(this).parent().attr("class").indexOf("displaySmall") > 0) {
      $(this).parent().removeClass("displaySmall");
      $(this).parent().children(".clickToHide").removeClass("toHide");
      $(this).children().children(".board-issue-count-container").removeClass("toHide");
      $(this).attr("style","border-bottom:  1px solid #e5e5e5;");
    } else {
      $(this).parent().addClass("displaySmall");
      $(this).parent().children(".clickToHide").addClass("toHide");
      $(this).children().children(".board-issue-count-container").addClass("toHide");
      $(this).attr("style","border-bottom: 0px");
    }
});

$(".add_cancel").click(function() {
  $(this).parents(".addNewIssueInTheBoard").addClass("toHide");
});
/*点击每个board上面的加号，添加新的issue*/
$(".add_submit").click(function() {
  var new_issue_name = $(this).parent().prev(".add_new_issue_input")[0].value;
  console.log(new_issue_name);
  var new_issue_no = issue_info.length;
  console.log(new_issue_no);
  var new_issue_object = {
    tag: [],
    tagColor: [],
    no: new_issue_no,
    name: new_issue_name,
    date: new Date(),
    state: 1
  }
  issue_info.push(new_issue_object);
  console.log(getAllLabelsIndex());
  console.log(getThoseDontHaveLabels());
  console.log(issue_info[7].tag.length);
  showCloseIssue();
  showBacklogIssue();
  showOpenCloseNum();
  var targetNode = document.getElementsByClassName("display-issue")[0];
  clear(targetNode);
  showListIssue(openIssueNum());
  alert("Ok!");
  $(this).parent().prev(".add_new_issue_input")[0].value = "";
  $(".addNewIssueInTheBoard").addClass("toHide");
});

//获取没有label的那些issue；
function getThoseDontHaveLabels() {
  var sss = [];
  let alls = issue_info.length -1;
  console.log(alls);
  for (let i = 1; i <= alls; i++) {
    if (issue_info[i].tag.length === 0) {
      sss.push(i);
    }
  }
  return sss;
}
/***board页面下显示每个issue******/
function showCloseIssue() {
  var targetNode = "#closeBoard";
  close_num = closeIssueNum().length;
  var array = closeIssueNum();
  tat = document.createTextNode(close_num);
  $("#closeNum").html(tat);
  var id = "close"
  forCloseAndBacklog(close_num,array,targetNode,id);
}

function showBacklogIssue() {
  var targetNode = "#backlogBoard";

  noLabel_num = getThoseDontHaveLabels().length;
  var array = getThoseDontHaveLabels();
  tat = document.createTextNode(noLabel_num);
  $("#backlogNum").html(tat);
  var id = "open";
  forCloseAndBacklog(noLabel_num,array,targetNode,id);
}

function forCloseAndBacklog(num,array,targetNode,id) {
  var ddd = [];
  var sss = "";
  sss += '<ul data-board="" id = " ' + id + '" class="board-list">';
  for (let i = 0; i < num; i++) {
    sss += '<li index = ' + array[i] + ' class = "every-issue-to-drag issue-change" draggable="true">';
    sss += '<div class ="issue-to-drag_title"><span>';
    sss += issue_info[array[i]].name;
    sss += '</span><span>· #';
    sss += issue_info[array[i]].no;
    sss += '</span></div>';
    if(issue_info[array[i]].tag.length !== 0) {
      sss += '<div class = "issue-to-drag_labels">';
      for (let k = 0; k < tagsInIssueNum(issue_info[array[i]]); k++) {
        sss +=  '<span style="background-color:' + issue_info[array[i]].tagColor[k]+ '">'+issue_info[array[i]].tag[k] + '</span>';
      }
      sss +='</div>'
    }
    sss += '</li>';

  }
  sss += '</ul>'
  newList = document.createElement("div");
  newList.className += "clickToHide ";
  newList.className += "board-list-component";
  newList.innerHTML = sss;
  Sortable.create(newList.getElementsByClassName("board-list")[0],{
    group:"boards",
  });

  console.log($(targetNode).has("div"));     //根据数据变化后渲染新的页面
  if($(targetNode).has("div")) {
    $(targetNode).children(".board-list-component").remove();
    $(targetNode).append(newList);
  } else {
    $(targetNode).append(newList);
  }
}

//构建通过修改board处的issue名字和标签对原本的数组进行修改。

$(".issue-change").live("click",function() {
  $(".inlineDisplay").addClass("width75");
  $("#addListUpdown").addClass("toHide");
  $("#changeIssueData").fadeIn("slow");
  var toChangeIssueNo = $(this).attr("index");
  var toChangeIssueName = issue_info[toChangeIssueNo].name;
  $("p[id='toChangeissueName']").html(toChangeIssueName);
  $("p[id='toChangeissueNo']").html("# "+toChangeIssueNo);
  var targetNode = $("#change_labels");
  var ppp = getLabels(toChangeIssueNo,targetNode);
  targetNode.append(ppp);
});


function getLabels(index,targetNode) { //传入的是点击的这个issue的index
  targetNode.children("div").remove();
  var div = document.createElement("div");
  div.innerHTML = "";
  var sss = "";
  var length = issue_info[index].tag.length;
    sss += '<p>';
    for(var i = 0; i < length; i++) {
      sss += '<span class = "ddd" style="background-color: ' + issue_info[index].tagColor[i]+ '">'+issue_info[index].tag[i] + '</span>';
    }
    sss += '</p>';

  div.innerHTML = sss;
  return div;
}
var showLabelListWhenSearch = require('./boardPage/showLabelListWhenSearch').showLabelListWhenSearch;
var showLabelListWhenSearch2 = require('./boardPage/showLabelListWhenSearch').showLabelListWhenSearch2;

$("#addListSearchBar2").bind("input propertychange",function() {  //使用bind检测输入框的实时变化，并进行搜索。
  searchLabel2($(this).val());
});
//模糊搜索
function searchLabel2(sss) {
  //模糊匹配的搜索！利用正则表达式匹配一下就行啦
  var targetNode = $(".labelsTodisplay")[1];
  var resultarr = [];
  var searchForValue = sss;
  if (searchForValue.length === 0) {
    clear(targetNode);
    showLabelListWhenSearch2(getAllLabelsIndex());
  }
  var searcharr = searchForValue.split('');
  var reg = new RegExp(searcharr.join(".*"));
  for (var i = 0; i < allLabels.length; i++) {
    if (reg.exec(allLabels[i].name)) {
      resultarr.push(i);
    }
  }
  clear(targetNode);
  showLabelListWhenSearch2(resultarr);
}

addLoadEvent(showCloseIssue());
addLoadEvent(showBacklogIssue());
addLoadEvent(showOpenCloseNum());
addLoadEvent(showListIssue(openIssueNum()));
