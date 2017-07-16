var issue_info = require('../data.js').issue_info;
var tagsInIssueNum = require('./commonfunction.js').tagsInIssueNum;

module.exports = {
  showListIssue : function showListIssue(IssueInTheArray) {
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
      dateNode[i].setAttribute("style","color:rgba(0,0,0,0.55)");
    }
    for (var j = 1; j <= all_num ; j++) {
      disIssueNode[j].className += " issueOpen ";
      if(issue_info[IssueInTheArray[j-1]].state === 0) {
        disIssueNode[j].className += " issueClosed";
      }
    }
  }


}
