//import myFunc from './test2.js';
import addLoadEvent from './common/addLoadEvent.js';
import splitDataThroughWrap from './buttonFunc/splitDataThroughWrap.js';
import {saveFile} from './buttonFunc/clickToDownload.js';
import {dataToDownload} from './data.js';
import findDataThrough from './findData/findDataThrough.js';
const textAreaWithWrap = "#input_textarea";
import render from './render.js';
import clear from './clear';
import addNewData from './addNewData.js';
import empty from './empty.js';

/*禁止刷新*/
/*
$(window).bind('beforeunload', function(e) {    //用户刷新时提示数据未保存
    return "Unloading this page may lose data. What do you want to do..."
    e.preventDefault();
});
*/
/*点击将输入框中的数据存入数组中*/
$("#clickToAddDataThroughWrap").click(function() {   //点击将输入框中的数据成行存入数组中
    splitDataThroughWrap(textAreaWithWrap);
    empty();
    alert("Added successfully!!!");
    clear();
    render(dataToDownload);
});

/*点击下载srt文件*/
$("#clickToDownloadSRT").click(function() {    //点击下载srt文件
    saveFile(dataToDownload);
});

var searchWay;
/*用户选择搜索项目  time id subtitle*/
$(".select-item").click(function() {
    let item = $(this).html();
   $("#searchIndex").html(item);
   searchWay = item;
});
/*输入框*/

let searchBar;
searchBar = document.getElementById("inputAreaForValueToSearch");
//监听搜索的回车事件，并进一步执行程序
searchBar.addEventListener("keyup",function(event) {    //监听回车事件
    var searchInfo = $("#inputAreaForValueToSearch").val();
    var event = event || window.event;
    if (event.keyCode == 13) {
        if (searchInfo.length === 0) {
            clear();
            render(dataToDownload);
        } else {
            if (searchWay) {
                findDataThrough(searchWay,searchInfo);
            } else {
                alert("Please select the way to search");
            }
        }
    }
});

/*多行输入*/
//点击显示"多行输入"的窗口
$('#btnInputThroughWrap').click(function() {
    $("#textarea-container").fadeIn();
    $("#info-table").addClass("blur-display");
    $("#edit-info").addClass("blur-display");
});

//点击取消显示"多行输入"的窗口
$("#clickToCancel").click(function() {
    $("#textarea-container").fadeOut();
    $("#info-table").removeClass("blur-display");
    $("#edit-info").removeClass("blur-display");
});


//点击记录时间，更换提示图
$("#clickToRecordTime").click(function(){
    if ($(this).children().attr('src').indexOf('start') >= 0) {
        $(this).children().attr('src','./src/images/end.png');
    } else {
        $(this).children().attr('src','./src/images/start.png');
    }
});

//点击添加新信息
$("#clickToAddInfo").click(function() {
    addNewData();
});

/*点击字幕显示区的某行字幕时，会将其自动填充至编辑区中*/

$(".display-info").live('click',function() {
    let startTime = $(this).children('.start-time').html();
    let endTime = $(this).children('.end-time').html();
    let subtitle = $(this).children('.subtitle').html();
    $("#edit-start-time").children().val(startTime);
    $("#edit-end-time").children().val(endTime);
    $("#edit-subtitle").children().val(subtitle);
});



render(dataToDownload);
