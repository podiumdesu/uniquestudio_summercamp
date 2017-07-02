require('./onload.js');
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
import{issue_info1} from './showlist.js';
function test() {
  alert("this is a test");
  alert(issue_info1.tag[0]);
}
addLoadEvent(test);
