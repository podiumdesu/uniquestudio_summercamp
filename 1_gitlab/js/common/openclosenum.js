var issue_info = require('../data.js').issue_info;

/******获取allIssue，openIssue，closeIssue数组中的issue编号****/

/****************************************/

module.exports = {
  allIssue: function allIssue() {
    let alls = issue_info.length-1;
    let s = [];
    for (let i = 1; i <= alls; i++) {
      s.push(i);
    }
    return s;
  },
  /*获取state标记分别为1和0的issue的编号数组*/
  openIssueNum: function openIssueNum() {
    var openIssue = [];
      let alls = issue_info.length-1;
    for (let i = 1; i <= alls; i++) {
      if (issue_info[i].state == 1) {
        openIssue.push(i);
      }
    }
    return openIssue;
  },

  closeIssueNum: function closeIssueNum() {
    var openIssue = [];
      let alls = issue_info.length-1;
    for (let i = 1; i <= alls; i++) {
      if (issue_info[i].state == 0) {
        openIssue.push(i);
      }
    }
    return openIssue;
  }
}
