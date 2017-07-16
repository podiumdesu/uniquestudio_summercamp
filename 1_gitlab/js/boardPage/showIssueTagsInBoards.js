var allLabels = require('../data.js').allLabels;
var issue_info = require('../data.js').issue_info;

module.exports = {
  showIssueTagsInBoards: function showIssueTagsInBoards(index, issueHaveI) {
    //传入的是点击的那个label的index，以及含有这个label的issue的index
    //例如点击bug， 传入0，[1,2,3];
    if(allLabels[index].IssueHave) {
      var blocks = issueHaveI.length;
      var sss = "";
      for (let i = 0 ; i < blocks; i++) {
        sss += '<li index = '+issueHaveI[i]+' class = "every-issue-to-drag issue-change" style:"margin: 10px;">';
        sss += '<div class = "issue-to-drag_title">';
        sss += '<span>'+issue_info[issueHaveI[i]].name+'</span>';
        sss += '<span>· #'+issue_info[issueHaveI[i]].no+'</span></div>';
        sss += '<div class = "issue-to-drag_labels">';
        for (var k = 0; k < issue_info[issueHaveI[i]].tag.length; k++) {
          sss += '<span style="background-color: ' + issue_info[issueHaveI[i]].tagColor[k]+ '">'+issue_info[issueHaveI[i]].tag[k] + '</span>';
        }
      }
      return sss;
    } else {
      return "";
    }
  }
}
