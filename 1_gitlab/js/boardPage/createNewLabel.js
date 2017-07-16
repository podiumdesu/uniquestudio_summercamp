var allLabels = require('../data.js').allLabels;
document.getElementById("pppName").value = "";
module.exports = {
  createNewLabel: function createNewLabel() {   //addlist页面根据用户输入添加新的label
    var ppp = {};
    ppp.name = document.getElementById("pppName").value;
    ppp.color = document.getElementById("showColorName").value;
    allLabels.push(ppp);    //但是刷新之后就所有数据都不见了！！！！
  }

}
