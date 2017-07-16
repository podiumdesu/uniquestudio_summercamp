var allLabels = require('../data.js').allLabels;
var issue_info = require('../data.js').issue_info;
var showIssueTagsInBoards = require('./showIssueTagsInBoards.js').showIssueTagsInBoards;
var showOpenCloseNum = require('../common/showOpenCloseNum.js').showOpenCloseNum;
var tagsInIssueNum = require('../common/commonfunction.js').tagsInIssueNum;
var addLoadEvent = require('../common/commonfunction.js').addLoadEvent;
var clear = require('../common/commonfunction.js').clear;
var strInArray = require('../common/commonfunction.js').strInArray;
var showListIssue = require('../common/showIssuePage.js').showListIssue;
var openIssueNum = require('../common/openclosenum.js').openIssueNum;
var closeIssueNum = require('../common/openclosenum.js').closeIssueNum;


module.exports = {
  showNewBoardWhenClickAL: function showNewBoardWhenClickAL(new_board_index) {
    var index = new_board_index;  //获得是点击的那个label的编号
    var targetNode = document.getElementById("closeBoard");
    var newdivs = document.createElement("div");
    newdivs.className += "board newBoard";
    newdivs.setAttribute("data-id",new_board_index);
    var issueHaveI = allLabels[index].IssueHave; //这是要显示的那几个issue哦～
    var sss;
    sss = '<header class="board-header" style = "border-top: 3px solid '+allLabels[index].color+ ';">'
    sss += '<h6><span class = "boardtitle">'+allLabels[index].name+'</span>';
    sss += '<div class="board-issue-count-container pull-right clickToHide"><span class= "board-issue-count">';
    if(issueHaveI) {
      sss += issueHaveI.length;
    } else {
      sss += 0;
    }
    sss += '</span><button class="btn btn-small btn-default"><i aria-hidden="true" data-hidden="true" class="fa fa-plus  board_addNewIssues"></i></button></div>';
    sss += '<button class="board-delete pull-right"><i data-hidden="true" class="fa fa-trash"></i></button></h6></header>';
    sss += `<div class="addNewIssueInTheBoard margin10px toHide">
                      <div>
                        <header>Title</header>
                        <input type="text" class = "add_new_issue_input" placeholder="Name a new issue? mew~">
                        <div class = "add_clickToCreate">
                          <button class="btn btn-success flow-to-left board_add_submit">Submit issue</button>
                          <button class="btn float-to-right2 board_add_cancel">Cancel</button>
                        </div>
                      </div>
                    </div>
                    `
    sss += '<div class="boader-list-component"><ul data-board="'+ new_board_index+'" class="board-list">';
    sss += showIssueTagsInBoards(index, issueHaveI);
    sss += '</ul></div>';
    newdivs.innerHTML = sss;
    //var inline = document.getElementsByClassName("inlineDisplay")[0];
  //  Sortable.create(inline.getElementsByClassName("board")[0], {group: "newdivs"});
    Sortable.create(newdivs.getElementsByClassName("board-list")[0],{
      group:"boards",
      draggable: ".every-issue-to-drag",
      onAdd: function(ev) {
        var itemIssueIndex = ev.item.getAttribute('index');    //获取的是现在进行改动的issue的index
        var labelFromIndex = ev.from.getAttribute('data-board');   //离开的label-board的index
        var labelToIndex = ev.item.parentNode.getAttribute('data-board');
        if (labelFromIndex !== labelToIndex) {
          //console.log('success');
          addData(itemIssueIndex,labelFromIndex,labelToIndex,ev.item);
          deleteData(itemIssueIndex,labelFromIndex,ev.from);
          render();
        }
        /*console.log(ev.item.parentNode);
        console.log(itemIssueIndex);
        console.log(labelFromIndex);
        console.log(labelToIndex);
        */
      },
    });
    $("#closeBoard").after(newdivs);
  }
}


function render() {
  showOpenCloseNum();
  var targetNode = document.getElementsByClassName("display-issue")[0];
  clear(targetNode);
  showListIssue(openIssueNum());
}
function addData(issueIndex, labelFromIndex, labelToIndex,evItem) {
  var i = allLabels[labelFromIndex].IssueHave.indexOf(parseInt(issueIndex));
  /*
  console.log("ddd"+labelToIndex);
  console.log("ddd"+issueIndex);
  console.log("ddd"+allLabels[labelToIndex].IssueHave.indexOf(1));
  console.log(allLabels[labelToIndex].IssueHave);
  console.log(issueIndex);
  console.log(typeof(issueIndex));
  console.log(allLabels[labelToIndex].IssueHave.indexOf(issueIndex));
*/
  var j = allLabels[labelToIndex].IssueHave.indexOf(parseInt(issueIndex));
  if (j >= 0) {    //
    evItem.setAttribute("style","display:none");
  } else {
    allLabels[labelToIndex].IssueHave.push(parseInt(issueIndex));    //将原本label中没有的issue添加进去
    var labelname = allLabels[labelToIndex].name;
    var labelcolor = allLabels[labelToIndex].color;
    issue_info[parseInt(issueIndex)].tag.push(labelname);
    issue_info[parseInt(issueIndex)].tagColor.push(labelcolor);
    var num = allLabels[labelToIndex].IssueHave.length;
    evItem.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = num;
  }
}
/*传入参数为：需要修改的issue的index， 以及删除了哪一个label*/
function deleteData(issueIndex, labelIndex,evItem) {
  var i = allLabels[labelIndex].IssueHave.indexOf(parseInt(issueIndex));
  var labelname = allLabels[labelIndex].name;
  allLabels[labelIndex].IssueHave.splice(i, 1);
  var j = issue_info[issueIndex].tag.indexOf(labelname);
  issue_info[issueIndex].tag.splice(j,1);
  issue_info[issueIndex].tagColor.splice(j,1);
  var num = allLabels[labelIndex].IssueHave.length;
  evItem.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0].innerHTML = num;

}
