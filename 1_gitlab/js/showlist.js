var issue_info1 = new Object();
var issue_info2 = new Object();
var issue_info3 = new Object();
var open = 3;
var close = 0;
var all = open + close;



/*

state里面放labels,issues,

state定义成一个数组，数组中存
labels  ->

*/

var issue_info = new Array();
for (var i = 1; i <= all ; i++) {
  issue_info[i] = new Object();
}

issue_info[1].tag = new Array("bug","array_err","object_err");
issue_info[1].tag_color = new Array("blue","red","yellow");
issue_info[1].no = 1;
issue_info[1].name = "pushpushtest";


issue_info[2].tag = new Array("js_err","bug");
issue_info[2].tag.color = new Array("yellow","pink");
issue_info[2].no = 2;
issue_info[2].name = "second test";

issue_info[3].tag = new Array("display_err","bug");
issue_info[3].tag.color = new Array("#ffffff","#aedede");
issue_info[3].no = 3;
issue_info[3].name = "third push test";


function strInArray(targetStr,targetArr) {
  length = targetArr.length;
  for (var i = 0; i < length; i++) {
    if(targetStr == targetArr[i]) {
      return true;
    }
  }
  return false;
}

function searchBarFunc() {
  var searchBarValue = searchBar.value;
  alert(searchBarValue);
  for (var i = 1 ; i <= all; i++) {
    if (strInArray(searchBarValue,issue_info[i].tag) ){
      alert("yes,it is in it ");
    } else {
      alert("not in");
    }
  }
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function insertAfter (newElement, targetElement) {
  var parent = targetElement.parentNode;//获得该节点的上一个父节点，可以是元素节点，也可以是文本节点
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }

}
var issues = new Array();

 function showOpenCloseNum() {   //显示list上标示的几个open close的数量
   var num = new Array();
   var para = new Array();
   var t = new Array();
   num[0] = document.getElementById("open_num");
   num[1] = document.getElementById("close_num");
   num[2] = document.getElementById("all_num");
   var dis_num = new Array(open,close,all);
   for (var i =0; i < 3; i++) {
     para[i] = document.createElement("span");
     t[i] = document.createTextNode(dis_num[i]);
     num[i].appendChild(para[i]);
     para[i].appendChild(t[i]);
     para[i].setAttribute("color","black");
   }
 }

//no tag tag_color close/open

//一点半开始继续搭webpack，感觉除了那个热更新以外，其他的功能都还是不太会用。
//两点半开始写第一个逻辑，写的比较久。感觉对dom操作又熟悉了一些。


/**********显示*/
var allIssue = [];
allIssue = [1,2];
function showListIssue(IssueInTheArray) {

  var all_num = IssueInTheArray.length;
  var listBodyNode = document.getElementsByClassName("display-issue")[0];
  var disIssueNode = [];
  var issueName = [];
  var issueNo =[];
  var paraNode = [];
  var infoNode = [];

  //将issue的数据存放到节点中
  for (var i = 1; i <= all_num; i++) {
    disIssueNode[i] = document.createElement("div");
    listBodyNode.appendChild(disIssueNode[i]);
    paraNode[i] = document.createElement("p");
    infoNode[i] = document.createElement("p");
    disIssueNode[i].appendChild(paraNode[i]);
    disIssueNode[i].appendChild(infoNode[i]);
    issueName[i] = document.createTextNode(issue_info[IssueInTheArray[i-1]].name);
    issueNo[i] = document.createTextNode('#'+issue_info[IssueInTheArray[i-1]].no);
    paraNode[i].appendChild(issueName[i]);
    infoNode[i].appendChild(issueNo[i]);
  }
  for (var j = 1; j <= all_num ; j++) {
    disIssueNode[j].setAttribute("style","border-bottom:1px solid rgba(0,0,0,0.2)");
  }

}

var searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup",function(event) {    //监听回车事件
  var event = event || window.event;
  if (event.keyCode == 13) {
    searchBarFunc();
  }
})



addLoadEvent(showOpenCloseNum());
addLoadEvent(showListIssue(allIssue));
