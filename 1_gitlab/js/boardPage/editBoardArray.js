


var showingLabelArray = [];  //将点击后显示在board中的label的index传入数组中进行报错。
function getShowingLabelArray(index) {
  showingLabelArray.push(index);
}
function deleteShowingLabelArray(index) {
  showingLabelArray.pop(index);
}
