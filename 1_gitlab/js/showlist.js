/*定义数量*/   //使用一个数组包裹的对象的时候，就不再需要初始化all了
/*var all = 3;
var open = 3;
var close = 0;
*/
/*
var issue_info = new Array();
for (var i = 1; i <= all ; i++) {
  issue_info[i] = new Object();
}
*/
/***这些全部都是数据*******/
//mentor用了很魔法的方法w
let issue_info = [
  {

  },
  {
    tag: [
      "bug",
      "array_err",
      "object_err",
      "js_err"
    ],
    tagColor: [
      "#aedede",
      "red",
      "yellow",
      "pink"
    ],
    no: 1,
    name: "pushpushtest",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  },
  {
    tag: [
      "js_err",
      "bug"
    ],
    tagColor: [
      "pink",
      "#aedede"
    ],
    no: 2,
    name: "second test",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  },
  {
    tag: [
      "display_err",
      "bug"
    ],
    tagColor: [
      "#fddeae",
      "#aedede"
    ],
    no: 3,
    name: "third push test",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  }
];

/*
issue_info[1].tag = new Array("bug","array_err","object_err","js_err");
issue_info[1].tagColor = new Array("#aedede","red","yellow","pink");
issue_info[1].no = 1;
issue_info[1].name = "pushpushtest";
issue_info[1].date = new Date();
issue_info[1].state = 0;

issue_info[2].tag = new Array("js_err","bug");
issue_info[2].tagColor = new Array("pink","#aedede");
issue_info[2].no = 2;
issue_info[2].name = "second test";
issue_info[2].date = new Date();
issue_info[2].state = 1;

issue_info[3].tag = new Array("display_err","bug");
issue_info[3].tagColor = new Array("#fddeae","#aedede");
issue_info[3].no = 3;
issue_info[3].name = "third push test";
issue_info[3].date = new Date();
issue_info[3].state = 1;
//alert(issue_info.length);
*/
/*****获取open，close，all的数量*****/
var all = issue_info.length-1;

/*************************/


/*
state里面放labels,issues,
state定义成一个数组，数组中存
labels  ->
*/

//一点半开始继续搭webpack，感觉除了那个热更新以外，其他的功能都还是不太会用。
//两点半开始写第一个逻辑，写的比较久。感觉对dom操作又熟悉了一些。

//大概实现的是一个渲染的功能
function showListIssue(IssueInTheArray) {

  var all_num = IssueInTheArray.length;
  var listBodyNode = document.getElementsByClassName("display-issue")[0];
  var disIssueNode = [];
  var issueName = [];     //存放issue名字
  var issueNo =[];      //存放issue的编号
  var paraNode = [];    //issue名字的文字节点p
  var infoNode = [];    //issue编号的文字节点span
  var tagsNodes = [];
  var dateNode = [];    //issue日期的文字节点span
  var issueTags = [];    //存放issue的所有tag数组
  var issueTagsColors = [];
  var issueDate = [];
  var tagsNodesValueNode = [];
  for (let i = 1; i <= all_num; i++) {
    issueTags[i] = [];   //声明成多维数组
    issueTagsColors[i] = [];     //声明成多维数组
    let length = issue_info[IssueInTheArray[i-1]].tag.length;
    for (let j = 0; j < length; j++) {
      issueTags[i].push(issue_info[IssueInTheArray[i-1]].tag[j]);
      issueTagsColors[i].push(issue_info[IssueInTheArray[i-1]].tagColor[j]);
    }
    var issueTagsLen = issueTags[i].length;
    //alert(issueTags[i]);
    //alert(issueTagsColors[i]);获取了传入的issues的tags还有colors
  }
  //传入的每个issue的tags已经存放在issueTags中了。
  //将issue的数据存放到节点中
  for (var i = 1; i <= all_num; i++) {
    disIssueNode[i] = document.createElement("div");
    listBodyNode.appendChild(disIssueNode[i]);
    paraNode[i] = document.createElement("p");
    infoNode[i] = document.createElement("span");
    dateNode[i] = document.createElement("span");
    disIssueNode[i].appendChild(paraNode[i]);
    disIssueNode[i].appendChild(infoNode[i]);
    disIssueNode[i].appendChild(dateNode[i]);

    for (let k = 0; k < tagsInIssueNum(issue_info[IssueInTheArray[i-1]]); k++) {
      tagsNodes[k] = document.createElement("span");

      tagsNodesValueNode[k] = document.createTextNode(issueTags[i][k]);
      disIssueNode[i].appendChild(tagsNodes[k]);
      tagsNodes[k].appendChild(tagsNodesValueNode[k]);
      tagsNodes[k].setAttribute("style","background-color:"+issueTagsColors[i][k]+"; margin:0px 4px; padding:2px; border-radius: 5px;font-size: 13px;");
    }
    issueName[i] = document.createTextNode(issue_info[IssueInTheArray[i-1]].name);
    issueNo[i] = document.createTextNode('#'+issue_info[IssueInTheArray[i-1]].no);
    issueDate[i] = document.createTextNode(' '+issue_info[IssueInTheArray[i-1]].date+' ');

    paraNode[i].appendChild(issueName[i]);
    infoNode[i].appendChild(issueNo[i]);
    dateNode[i].appendChild(issueDate[i]);
    dateNode[i].setAttribute("style","color:pink");
  }
  for (var j = 1; j <= all_num ; j++) {
    disIssueNode[j].setAttribute("style","border-bottom:1px solid rgba(0,0,0,0.2); margin: 5px 0; padding: 0 4px;");
    if(issue_info[IssueInTheArray[j-1]].state == 0) {
      disIssueNode[j].setAttribute("style","background-color: rgba(0,0,0,0.1);margin: 5px 0;padding: 0 4px;");
    }
  }
}


function showBoardsValue() {
  alert("hello,world");

}


//绑定点击事件。点击后，显示数据的区域进行clear，然后重新根据传入的数组渲染数据。

var displayAllIssue = document.getElementById("all_num");
displayAllIssue.onclick = function(event) {
  var targetNode = document.getElementsByClassName("display-issue")[0];
  clear(targetNode);
  showListIssue(allIssue);
};

var displayOpenIssue = document.getElementById("open_num");
displayOpenIssue.onclick = function(event) {
  var targetNode = document.getElementsByClassName("display-issue")[0];
  clear(targetNode);
  showListIssue(openIssueNum());
}

var displayCloseIssue = document.getElementById("close_num");
displayCloseIssue.onclick = function(event) {
  var targetNode = document.getElementsByClassName("display-issue")[0];
  clear(targetNode);
  showListIssue(closeIssueNum());
}

$("#boards").click(function(event) {
//  var targetNode = document.getElementsByClassName("flex-body")[0];
  var targetNode = $(".flex-body")[0];
  var boards = document.getElementById("boards").parentNode;
  var list = document.getElementById("list").parentNode;
  list.removeAttribute("class","active");
  boards.setAttribute("class","active");
  targetNode.setAttribute("style","display:none");
});

$("#list").click(function(event) {
  var targetNode = $(".flex-body")[0];
  var boards = document.getElementById("boards").parentNode;
  var list = document.getElementById("list").parentNode;
  list.setAttribute("class","active");
  boards.removeAttribute("class","active");
  targetNode.setAttribute("style","display:block");
  showBoardsValue();
});
//监听搜索label的回车事件，并进一步执行程序
var searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup",function(event) {    //监听回车事件
  var event = event || window.event;
  if (event.keyCode == 13) {
    searchBarFunc();
  }
})


//////////////一些可复用的函数///////////
/*判断字符串是否在字符串数组中*/
function strInArray(targetStr,targetArr) {
  length = targetArr.length;
  for (var i = 0; i < length; i++) {
    if(targetStr == targetArr[i]) {
      return true;
    }
  }
  return false;
}
/***清除传入节点中存在的子节点*/
function clear(targetNode) {
  while(targetNode.hasChildNodes()) {//当div下还存在子节点时 循环继续
    targetNode.removeChild(targetNode.firstChild);
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

//将节点插入到另一个节点后面
function insertAfter (newElement, targetElement) {
  var parent = targetElement.parentNode;//获得该节点的上一个父节点，可以是元素节点，也可以是文本节点
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }

}

function tagsInIssueNum(issue_num) {     //需要传入的参数是issue_info[i];

  return issue_num.tag.length;
}
/////////////////////////////////////////

/*获取搜索框的label并进行比对*/
function searchBarFunc() {
  var arr = [];

  var searchBarValue = searchBar.value;
  if (searchBarValue.length === 0) {   //当输入为空时显示所有的issue
    arr = allIssue;
  }
  for (var i = 1 ; i <= all; i++) {
    if (strInArray(searchBarValue,issue_info[i].tag) ){
      arr.push(i);
    } else {
      continue;
    }
  }

  var targetNode = document.getElementsByClassName("display-issue")[0];
  clear(targetNode);
  showListIssue(arr);
}


//显示list上标示的几个open close的数量
function showOpenCloseNum() {
  var open = 0;
  var close = 0;
  for (let i = 1; i <= all; i++) {
    if (issue_info[i].state === 1) {
      open++;
    } else {
      close++;
    }
  }

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
/******获取allIssue，openIssue，closeIssue数组中的issue编号****/
var allIssue = [];
for (let i = 1; i <= all; i++) {
  allIssue.push(i);
}

function openIssueNum() {
  var openIssue = [];
  for (let i = 1; i <= all; i++) {
    if (issue_info[i].state == 1) {
      openIssue.push(i);
    }
  }
  return openIssue;
}

function closeIssueNum() {
  var openIssue = [];
  for (let i = 1; i <= all; i++) {
    if (issue_info[i].state == 0) {
      openIssue.push(i);
    }
  }
  return openIssue;
}
/****************************************/


addLoadEvent(showOpenCloseNum());
addLoadEvent(showListIssue(openIssueNum()));
