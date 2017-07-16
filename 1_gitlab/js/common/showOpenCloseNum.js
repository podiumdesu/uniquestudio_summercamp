//获取分别存储label和issue数据的数组
var issue_info = require('../data.js').issue_info;

//获取issue里 open close all的数量
//显示list页面上标示的几个open close的数量

module.exports = {
  showOpenCloseNum: function showOpenCloseNum() {
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
      $(num[i]).children().children("span").html(dis_num[i]);
    }
    console.log("showOpenCloseNum function success");
  }
}
