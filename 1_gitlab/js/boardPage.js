
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

var el = document.getElementById("backlogBoard");

//var sortable = Sortable.create(el,{});
//dragula([document.getElementById("backlogBoard"),document.getElementById("closeBoard")]);
$("#change_close").click(function() {  //关闭修改issuelabel的页面
  $("#changeIssueData").fadeOut("slow");
  $(".inlineDisplay").addClass("width100");
  $(".inlineDisplay").removeClass("width75");
});

$("#labels_edit").click(function() {
  $(".toChangeLabels").fadeIn("fast");
});

$(".board_addNewIssues").live('click',function() {
  $(this).parents('header').next().children(".add_new_issue_input:first").focus();
  //$(this).parents('header').next().children(".add_new_issue_input")[0].value;
  if ($(this).parents('header').next().attr("class").indexOf('toHide') > 0) {
    $(this).parents("header").next().removeClass("toHide");
  } else {
    $(this).parents('header').next().addClass('toHide');
  }
});

$(".board_add_cancel").live('click',function() {
  $(this).parents(".addNewIssueInTheBoard").addClass('toHide');
  $(this).parent().prev(".add_new_issue_input")[0].value = "";
});
$('input[class="add_new_issue_input"]').focus(function() {
  $(this).next().children(".add_submit").attr("disabled",true);
  $(".add_new_issue_input").bind("input propertychange",function() {  //使用bind检测输入框的实时变化，并进行搜索。
    if($(this).val().length !== 0) {
      $(".add_submit").attr("disabled",false);
    }
  });
})


$('.board_add_submit').live('click',function() {
  var new_issue_name = $(this).parent().prev('.add_new_issue_input')[0].value;
  var new_issue_no = issue_info.length;
  var new_issue_object = {
    tag: [],
    tagColor: [],
    no: new_issue_no,
    name: new_issue_name,
    date: new Date(),
    state: 1
  }
  var this_tag_no = $(this).parents('.newBoard').attr('data-id');
  new_issue_object = new_issue_object_addInfo(new_issue_object, this_tag_no, new_issue_no);
  issue_info.push(new_issue_object);

/*反正前期写的函数封装得太差了，感觉都要重新写，非常烦恼*/
  $(this).parents(".newBoard").children('.boader-list-component').children('ul').empty();
  var sss = test(this_tag_no, allLabels[this_tag_no].IssueHave);
  $(this).parents(".newBoard").children('.boader-list-component').children('ul').html(sss);
  $(this).parents('.newBoard').children('header').children().children().children('.board-issue-count').html(allLabels[this_tag_no].IssueHave.length)
  showOpenCloseNum();
  //showNewBoardWhenClickAL(this_tag_no);
  //showIssueTagsInBoards(this_tag_no, allLabels[this_tag_no].IssueHave);
  var targetNode = document.getElementsByClassName('display-issue')[0];
  clear(targetNode);
  showListIssue(openIssueNum());
  alert("ok");
  $(this).parent().prev('.add_new_issue_input')[0].value = "";
  $('.addNewIssueInTheBoard').addClass('toHide');
});

function new_issue_object_addInfo(new_issue_object, label_no, new_issue_no) {
  new_issue_object.tag.push(allLabels[label_no].name);
  new_issue_object.tagColor.push(allLabels[label_no].color);
  allLabels[label_no].IssueHave.push(new_issue_no);
  return new_issue_object;
}

function test(index, issueHaveI) {
  var blocks = issueHaveI.length;
  var sss = "";
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
