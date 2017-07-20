//import myFunc from './test2.js';
import addLoadEvent from './common/addLoadEvent.js';
import splitDataThroughWrap from './buttonFunc/splitDataThroughWrap.js';
import {saveFile} from './buttonFunc/clickToDownload.js';
import {dataToDownload} from './data.js';
import findDataThrough from './findData/findDataThrough.js';
const textAreaWithWrap = "#input_textarea";
/*
$(window).bind('beforeunload', function(e) {    //用户刷新时提示数据未保存
    return "Unloading this page may lose data. What do you want to do..."
    e.preventDefault();
});
*/
$("#clickToAddDataThroughWrap").click(function() {   //点击将输入框中的数据成行存入数组中
    splitDataThroughWrap(textAreaWithWrap);
    findDataThrough("id",sss);
    //alert("添加成功");
})
$("#clickToDownloadSRT").click(function() {    //点击下载srt文件
    saveFile(dataToDownload);
});

$("#clickToFindWhatYouWant").click(function() {
    const inputValueToSearch = $("#inputAreaForValueToSearch").val();

});