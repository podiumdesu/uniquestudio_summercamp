module.exports = {
  /*获取issue中tag这个数组的长度*/
  tagsInIssueNum: function tagsInIssueNum(issue_num) {     //需要传入的参数是issue_info[i];
    return issue_num.tag.length;
  },
  /********************************一些可复用的函数w*************************************／
  /*判断字符串是否在字符串数组中*/
  strInArray: function strInArray(targetStr,targetArr) {
    length = targetArr.length;
    for (var i = 0; i < length; i++) {
      if(targetStr == targetArr[i]) {
        return true;
      }
    }
    return false;
  },
  /***清除传入节点中存在的子节点*/
  clear: function clear(targetNode) {
    while(targetNode.hasChildNodes()) {//当div下还存在子节点时 循环继续
      targetNode.removeChild(targetNode.firstChild);
    }
  },

  addLoadEvent: function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
      window.onload = func;
    } else {
      window.onload = function() {
        oldonload();
        func();
      };
    }
  },
  //将节点插入到另一个节点后面
  insertAfter: function insertAfter (newElement, targetElement) {
    var parent = targetElement.parentNode;//获得该节点的上一个父节点，可以是元素节点，也可以是文本节点
    if (parent.lastChild == targetElement) {
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling);
    }
  }
  /***********************************************************************************/

}
