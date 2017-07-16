/**********************************获取传输数据函数块***************************************/
/*获取所有的issue编号*/
var allLabels = require('../data.js').allLabels;
module.exports = {
  getAllLabelsIndex: function getAllLabelsIndex() {
  //console.log(allLabels.length);
  var firstShowLabels = [];
  for (let i = 0; i < allLabels.length; i++) {
    firstShowLabels.push(i);
  }
  return firstShowLabels;
  }
}
