var allIssue = require('../common/openclosenum.js').allIssue;
var issue_info = require('../data.js').issue_info;
var strInArray = require('../common/commonfunction.js').strInArray;
var clear = require('../common/commonfunction.js').clear;
var showListIssue = require('../common/showIssuePage.js').showListIssue;


/*list页面下 获取搜索框的label并进行比对 不是模糊搜索*/
module.exports = {
  searchBarFunc: function searchBarFunc() {
  var all = issue_info.length-1;
  var arr = [];
  var searchBarValue = searchBar.value;
  if (searchBarValue.length === 0) {   //当输入为空时显示所有的issue
    arr = allIssue();
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
};
