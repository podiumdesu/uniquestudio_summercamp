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
//因为后面设计函数时候的问题，所以数组第一个设置成空的对象了。
let issue_info = [
  {

  },
  {
    tag: [
      "bug",
      "array_err",
      "object_err",
      "js_err",
      "ddd"
    ],
    tagColor: [
      "#aedede",
      "red",
      "yellow",
      "pink",
      "lightyellow"
    ],
    no: 1,
    name: "pushpushtest",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
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
      "bug",
      "wtf"
    ],
    tagColor: [
      "#fddeae",
      "#aedede",
      "#aeeaea"
    ],
    no: 3,
    name: "third push test",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  },
  {
    tag: [
      "hello-world",
      "wtf"
    ],
    tagColor: [
      "#fddddd",
      "#aeeaea"
    ],
    no: 4,
    name: "what do you want",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  },
  {
    tag: [
    ],
    tagColor: [
    ],
    no: 5,
    name: "I have no label",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  },
  {
    tag: [
    ],
    tagColor: [
    ],
    no: 6,
    name: "I have no label too",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  }
];



/*获取所有的label以及所有的labelcolor*/
var allLabels = [
  {
    name: "bug",
    IssueHave: [1,2,3],
    color: "#aedede"
  },
  {
    name: "js_err",
    IssueHave: [1,2],
    color: "pink"
  },
  {
    name: "object_err",
    IssueHave: [1],
    color: "yellow"
  },
  {
    name: "array_err",
    IssueHave: [1],
    color: "red"
  },
  {
    name: "display_err",
    IssueHave: [3],
    color: "#fddeae"
  },
  {
    name: "ddd",
    IssueHave: [1],
    color: "lightyellow"
  },
  {
    name: "hello-world",
    IssueHave: [4],
    color: "#fddddd"
  },
  {
    name: "wtf",
    IssueHave: [3,4],
    color: "#aeeaea"
  }
];


//进行两个数组之间数据的交换
//思路： 获取label中的issuehave，然后在issue中对
//如果是对boardlist下面的issue进行添加，那么每次会获取的就是issue的名字，issue的index，以及issue现在含有的tag
//同时会得到此时boardlist上 修改的label的名字，同时获得这个label在数组中的index。
//然后将这个修改同时记录在allLabels和issue_info中就行啦
/*****获取open，close，all的数量*****/
var all = issue_info.length-1;

/*************************/

//显示list页面上标示的几个open close的数量
function showOpenCloseNum() {
  var open = 0;
  var close = 0;
  let alls = issue_info.length -1;
  for (let i = 1; i <= alls; i++) {
    if (issue_info[i].state === 1) {
      open++;
    } else {
      close++;
    }
  }

  var num = new Array();
  var para = new Array();
  var t = new Array();
  num[0] = "#open_num";
  num[1] = "#close_num";
  num[2] = "#all_num";
  var dis_num = new Array(open,close,alls);
  for (var i =0; i < 3; i++) {
    $(num[i]).children("span").html(dis_num[i]);
  }
}


/******获取allIssue，openIssue，closeIssue数组中的issue编号****/
var allIssue = [];
for (let i = 1; i <= all; i++) {
  allIssue.push(i);
}
function allIssue() {
  let alls = issue_info.length-1;
  let s = [];
  for (let i = 1; i <= alls; i++) {
    s.push(i);
  }
  return s;
}
/*获取state标记分别为1和0的issue的编号数组*/
function openIssueNum() {
  var openIssue = [];
    let alls = issue_info.length-1;
  for (let i = 1; i <= alls; i++) {
    if (issue_info[i].state == 1) {
      openIssue.push(i);
    }
  }
  return openIssue;
}

function closeIssueNum() {
  var openIssue = [];
    let alls = issue_info.length-1;
  for (let i = 1; i <= alls; i++) {
    if (issue_info[i].state == 0) {
      openIssue.push(i);
    }
  }
  return openIssue;
}
/****************************************/



/*
state里面放labels,issues,
state定义成一个数组，数组中存
labels  ->
*/

//一点半开始继续搭webpack，感觉除了那个热更新以外，其他的功能都还是不太会用。
//两点半开始写第一个逻辑，写的比较久。感觉对dom操作又熟悉了一些。

//大概实现的是一个渲染的功能
/*list页面下需要显示的list*/
function showListIssue(IssueInTheArray) {
  //$("#boardPage").attr("style","display:none");
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
      tagsNodes[k].setAttribute("style","background-color:"+issueTagsColors[i][k]);
      tagsNodes[k].className += "labelInissue";
    }
    issueName[i] = document.createTextNode(issue_info[IssueInTheArray[i-1]].name);
    issueNo[i] = document.createTextNode('#'+issue_info[IssueInTheArray[i-1]].no+' · ');
    issueDate[i] = document.createTextNode(' '+issue_info[IssueInTheArray[i-1]].date+' ');

    paraNode[i].appendChild(issueName[i]);
    infoNode[i].appendChild(issueNo[i]);
    dateNode[i].appendChild(issueDate[i]);
    dateNode[i].setAttribute("style","color:pink");
  }
  for (var j = 1; j <= all_num ; j++) {
    disIssueNode[j].className += " issueOpen ";
    if(issue_info[IssueInTheArray[j-1]].state === 0) {
      disIssueNode[j].className += " issueClosed";
      //let sss = disIssueNode[j].createElement("span").createTextNode("Closed");
      //sss.className += "displayClose";
    }
  }
  /*
  for (let p = tagsInIssueNum(issue_info[IssueInTheArrayp[i-1]]) ; p > 0; p-- ) {
    disIssueNode[i].appendChild(paraNode[p]);
    disIssueNode[i].appendChild(infoNode[p]);
    disIssueNode[i].appendChild(dateNode[p]);
  }
  */
}



/**********************************获取传输数据函数块***************************************/
/*获取所有的issue编号*/
function getAllLabelsIndex() {
  console.log(allLabels.length);
  var firstShowLabels = [];
  for (let i = 0; i < allLabels.length; i++) {
    firstShowLabels.push(i);
  }
  return firstShowLabels;
}
/***********************************************************************************/



/*******************************页面切换****************************************/

var listNode;
var boardNode;

/*测试时使用*/
var childToAppend = document.getElementById("boardPage");
childToAppend.setAttribute("class","toDisplay");
var childToRemove = document.getElementById("listPage");
childToRemove.setAttribute("class","toHide");
$("#listPage").parent().removeClass("flex-body");
//点击list和boards进行页面的切换
//内容渲染
/*碰到的问题：
在flex-body下的节点，如果不使用clear的话就没法更新新节点，（再添加新的节点就会跑到之前的那个页面上去）
但是如果clear的话，这个节点之后所有的节点都会没有，就必须要重新再建立链接。
*/
$("#boards").click(function(event) {
  /*
  var childToAppend = document.getElementById("boardPage");
  window.listNode = $("#listPage").detach();
  $("#flex-body").prepend(window.boardNode);
  childToAppend.removeAttribute("class","toHide");
  var boardss = document.getElementById("boards").parentNode;
  var list = document.getElementById("list").parentNode;
  list.removeAttribute("class","chooseActive");
  boardss.setAttribute("class","active");
  */
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

//
/************************************listPage函数块*************************************/

//绑定点击事件。点击后，显示数据的区域进行clear，然后重新根据传入的数组渲染数据。

var displayAllIssue = document.getElementById("all_num");
displayAllIssue.onclick = function(event) {
  var targetNode = document.getElementsByClassName("display-issue")[0];
  $(this).addClass("chooseActive");
  $("#open_num").removeClass("chooseActive");
  $("#close_num").removeClass("chooseActive");
  clear(targetNode);
  showListIssue(allIssue);
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
})
/*list页面下 获取搜索框的label并进行比对 不是模糊搜索*/
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
///////////
/***********************************************************************************/



/********************************一些可复用的函数w*************************************／
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
    };
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

/*获取issue中tag这个数组的长度*/
function tagsInIssueNum(issue_num) {     //需要传入的参数是issue_info[i];
  return issue_num.tag.length;
}

/***********************************************************************************/



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
  if ($("#addNewLabel").attr("class").indexOf("toDisplay") > 0) {
    $("#addNewLabel").addClass("toHide");
  }
  if ($("div#addListUpdown").attr("class").indexOf("toDisplay") > 0) {
    $("div#addListUpdown").addClass("toHide");
    $("div#addListUpdown").removeClass("toDisplay");
  } else {
    $("div#addListUpdown").removeClass("toHide");
    $("div#addListUpdown").addClass("toDisplay");
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



/*这段代码有bug，但是不知道问题在哪里*/
var searchLabelBtn = document.getElementById("addListSearchBarBtn");
searchLabelBtn.click(function() {
  alert("ddd");
  searchLabel();
});


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


document.getElementById("pppName").value = "";
function createNewLabel() {   //addlist页面根据用户输入添加新的label
  var ppp = {};
  ppp.name = document.getElementById("pppName").value;
  ppp.color = document.getElementById("showColorName").value;
  allLabels.push(ppp);    //但是刷新之后就所有数据都不见了！！！！
}

/**boards页面下addlist时搜索labels
封装成可以显示被搜索到的labels的div块的函数
所需要传入的参数是allLabels[]中的index */

//每次修改数据以后需要重新进行计算
function showLabelListWhenSearch(searchLabel) {
  let label_num = searchLabel.length;
  var insertLabelsDisNode = document.getElementById("labelsTodisplay");
  var ddddNode = [];
  for (var i = 0 ; i < label_num; i++) {
    var dddd = '<div class = "choose"><label style = "vertical-align: top;"><input type="checkbox" value="" class="labelsCheckout"/><span class="checkboxStyle glyphicon"></span></label>';
    dddd +='<div class = "labelsColor" style = "background-color : '+allLabels[searchLabel[i]].color+'"></div>';
    dddd +='<div class = "labelsName" style="display: inline-block"><span class="labelname">'+allLabels[searchLabel[i]].name+'</span></div></div>';
    ddddNode[i] = document.createElement("div");
    ddddNode[i].setAttribute("id",allLabels[searchLabel[i]].name);
    //alert(dddd);
    ddddNode[i].innerHTML = dddd;
    insertLabelsDisNode.appendChild(ddddNode[i]);
  }
  addaddadd();
}
addLoadEvent(showLabelListWhenSearch(getAllLabelsIndex()));// 最开始显示所有的lables


/***********************************************************************************/

//编写boardlist的函数块，这里代码重复了，应该怎么封装呢
/*
$(".left-board .board-header").click(function() {
  if ($(this).parent().attr("class").indexOf("displaySmall") > 0) {
    $(this).parent().removeClass("displaySmall");
    $(this).parent().children(".toHide").removeClass("toHide");
    $(this).children().children(".board-issue-count-container").removeClass("toHide");
    $(this).attr("style","border-bottom:  1px solid black;");
  } else {
    $(this).parent().addClass("displaySmall");
    $(this).parent().children(".clickToHide").addClass("toHide");
    $(this).children().children(".board-issue-count-container").addClass("toHide");
    $(this).attr("style","border-bottom: 0px")
  }
});
$(".right-board .board-header").click(function() {
  if ($(this).parent().attr("class").indexOf("displaySmall") > 0) {
    $(this).parent().removeClass("displaySmall");
    $(this).parent().children(".toHide").removeClass("toHide");
    $(this).children().children(".board-issue-count-container").removeClass("toHide");
    $(this).attr("style","border-bottom:  1px solid black;");
  } else {
    $(this).parent().addClass("displaySmall");
    $(this).parent().children(".clickToHide").addClass("toHide");
    $(this).children().children(".board-issue-count-container").addClass("toHide");
    $(this).attr("style","border-bottom: 0px")
  }
});
*/
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
      $(this).attr("style","border-bottom:  1px solid black;");
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
  if (e.target && e.target.id === "rightAdd") {   //捕捉到了最里层的点击事件
    if ($(this).next().attr("class").indexOf("toHide") > 0) {
      $(this).next().removeClass("toHide");
    }
  } else {
    if ($(this).parent().attr("class").indexOf("displaySmall") > 0) {
      $(this).parent().removeClass("displaySmall");
      $(this).parent().children(".clickToHide").removeClass("toHide");
      $(this).children().children(".board-issue-count-container").removeClass("toHide");
      $(this).attr("style","border-bottom:  1px solid black;");
    } else {
      $(this).parent().addClass("displaySmall");
      $(this).next().addClass("toHide");
      $(this).parent().children(".clickToHide").addClass("toHide");
      $(this).children().children(".board-issue-count-container").addClass("toHide");
      $(this).attr("style","border-bottom: 0px");
    }
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
  showListIssue(openIssueNum());
  alert("Ok!");
  $(".addNewIssueInTheBoard").addClass("toHide");
});

//获取没有label的那些issue；
function getThoseDontHaveLabels() {
  var sss = [];
  let alls = issue_info.length -1;
  console.log(alls);
  console.log(all);
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
    sss += '<li index = ' + array[i] + ' class = "every-issue-to-drag issue-change" draggable="true" ondragstart="handleDragStart(event)" ondragover="handleDragOver(event)" ondragenter="handleDragEnter(event)" >';
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
  console.log($(targetNode).has("div"));     //根据数据变化后渲染新的页面
  if($(targetNode).has("div")) {
    $(targetNode).children(".board-list-component").remove();
    $(targetNode).append(newList);
  } else {
    $(targetNode).append(newList);

  }

}






//此处有一个报错，刚刚已经解决

//dragstart
//dragenter
//dragover
//dragleave
/* 先不用原生js写，调个库
刚刚mentor给我看了一眼真正的模块化，可以说是非常ju了(((

window.handleDragStart = function(e) {   //监听dragstart设置拖拽数据
  console.log("hello");
  console.log($(this).innerHTML);
  e.dataTransfer.setData('text/plain','This text may be draggable.');
  e.dataTransfer.effectAllowed = "move";    //设置允许的拖放效果
}
window.handleDragOver = function (e) {
  e.preventDefault();   //indicate that a drop is allowed at that location
}

window.handleDragEnter = function(e) {      //监听dragenter取消浏览器默认行为使元素可拖放
  e.preventDefault();
}

window.onDrop = function(e) {       //监听drop事件执行所需操作
  var data = e.dataTransfer.getData("text/plain");
  e.target.textContent = data;
  e.preventDefault();
}

*/



//当点击addlist中的label时，在下方的boardlist中显示出新的框框
function addaddadd() {
  let index = getAllLabelsIndex();
  let length = index.length;
  console.log(length);
  for (let i = 0; i < length ; i++) {
    var sss = "#" + allLabels[index[i]].name;
    $(sss).click(function() {
      showNewBoardWhenClickAL(i);//将点击的label的编号传入函数
      console.log(i);
      //但是我需要显示的是包含这个label编号的issue；通过issueHave这个属性
    });
  }
}

/*
$(".addNewIssues").live("click",function() {
  //var targetNode = document.getElementsByClassName("board-list")[0];
  clickToAddNewIssues(this);
  //$(".addNewIssues").parents(".board-header").addClass("toHide");
  $(this).parent().addClass(" toHide ");
});

function clickToAddNewIssues(targetNode) {
  alert("ddd");
  alert(targetNode);
  targetNode.parents(".board-header").addClass(".toHide");
  //targetNode.className += "toHide";
}
*/

function showNewBoardWhenClickAL(new_board_index) {
  var index = new_board_index;  //获得是点击的那个label的编号
  var targetNode = document.getElementById("backlogBoard");
  var newdivs = document.createElement("div");
  newdivs.className += "board newBoard";
  newdivs.setAttribute("data-id",new_board_index);
  var issueHaveI = allLabels[index].IssueHave; //这是要显示的那几个issue哦～
  var sss;
  sss = '<header class="board-header" style = "border-top-color:'+allLabels[index].color+ ';">'
  sss += '<h6><span class = "boardtitle">'+allLabels[index].name+'</span>';
  sss += '<div class="board-issue-count-container pull-right clickToHide"><span class= "board-issue-count">';
  if(issueHaveI) {
    sss += issueHaveI.length;
  } else {
    sss += 0;
  }
  sss += '</span><button class="btn btn-small btn-default addNewIssues"><i aria-hidden="true" data-hidden="true" class="fa fa-plus"></i></button></div></h6></header>';
  sss += '<div class="boader-list-component"><ul data-board="" class="board-list">';
  sss += showIssueTagsInBoards(index, issueHaveI);
  sss += '</ul></div>';
  newdivs.innerHTML = sss;
  $("#backlogBoard").after(newdivs);
}


function showIssueTagsInBoards(index, issueHaveI) {
  //传入的是点击的那个label的index，以及含有这个label的issue的index
  //例如点击bug， 传入0，[1,2,3];
  if(allLabels[index].IssueHave) {
    var blocks = issueHaveI.length;
    var sss = "";
    for (let i = 0 ; i < blocks; i++) {
      sss += '<li index = '+issueHaveI[i]+' class = "every-issue-to-drag issue-change" style:"margin: 10px;">'
      sss += '<div class = "issue-to-drag_title">'
      sss += '<span>'+issue_info[issueHaveI[i]].name+'</span>';
      sss += '<span>· #'+issue_info[issueHaveI[i]].no+'</span></div>';
      sss += '<div class = "issue-to-drag_labels">';
      for (let k = 0; k < issue_info[issueHaveI[i]].tag.length; k++) {
        sss += '<span style="background-color: ' + issue_info[issueHaveI[i]].tagColor[k]+ '">'+issue_info[issueHaveI[i]].tag[k] + '</span>';
      }
    }
    return sss;
  } else {
    return "";
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
    for (let i = 0; i < length; i++) {
      sss += '<span class = "ddd" style="background-color: ' + issue_info[index].tagColor[i]+ '">'+issue_info[index].tag[i] + '</span>';
    }
    sss += '</p>';

  div.innerHTML = sss;
  return div;
}


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
  for (let i = 0; i < allLabels.length; i++) {
    if (reg.exec(allLabels[i].name)) {
      resultarr.push(i);
    }
  }
  clear(targetNode);
  showLabelListWhenSearch2(resultarr);
}

/**boards页面下addlist时搜索labels
封装成可以显示被搜索到的labels的div块的函数
所需要传入的参数是allLabels[]中的index */

//每次修改数据以后需要重新进行计算
function showLabelListWhenSearch2(searchLabel) {
  let label_num = searchLabel.length;
  var insertLabelsDisNode = document.getElementById("labelsTodisplay2");
  var ddddNode = [];
  for (var i = 0 ; i < label_num; i++) {
    var dddd = '<div class = "choose"><label style = "vertical-align: top;"><input type="checkbox" value="" class="labelsCheckout"/><span class="checkboxStyle glyphicon"></span></label>';
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

addLoadEvent(showLabelListWhenSearch2(getAllLabelsIndex()))

function addaddadd2() {
  let index = getAllLabelsIndex();
  let length = index.length;
  for (let i = 0; i < length; i++) {
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

//可以获取到的是这个issue所包含的labels的名字。

function addOfdeleteLabels() {  //编写是否该label在issue中。

}

$("#change_close").click(function() {  //关闭修改issuelabel的页面
  $("#changeIssueData").fadeOut("slow");
  $(".inlineDisplay").addClass("width100");
  $(".inlineDisplay").removeClass("width75");
});

$("#labels_edit").click(function() {
  $(".toChangeLabels").fadeIn("fast");
});




addLoadEvent(showCloseIssue());
addLoadEvent(showBacklogIssue());
addLoadEvent(showOpenCloseNum());
addLoadEvent(showListIssue(openIssueNum()));
