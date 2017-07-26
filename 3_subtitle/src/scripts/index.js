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
import {videoNode} from './videoDisplay.js';
import {timeString2ms} from './convertTime.js';

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

$("#btnAddAfter").click(function() {
    $("#edit-start-time").children().val("");
    $("#edit-end-time").children().val("");
    $("#edit-subtitle").children().val("");
    $("#clickToAddInfo").unbind('click');
    $("#clickToAddInfo").click(function() {
        addNewData();
    });
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
/*同时绑定点击确定，删除，跳转等事件*/
$(".display-info").live('click',function() {
    let startTime = $(this).children('.start-time').html();
    let endTime = $(this).children('.end-time').html();
    let subtitle = $(this).children('.subtitle').html();
    let index = $(this).children('.index').html();
    const ddd = index;
    $("#edit-start-time").children().val(startTime);
    $("#edit-end-time").children().val(endTime);
    $("#edit-subtitle").children().val(subtitle);
    $("#clickToAddInfo").unbind('click');
    $("#clickToAddInfo").click(function() {
        dataToDownload[index-1].startTime =$("#edit-start-time").children().val();
        dataToDownload[index-1].endTime = $("#edit-end-time").children().val();
        dataToDownload[index-1].subtitleInfo = $("#edit-subtitle").children().val();
        //console.log(dataToDownload[index-1]);
        clear();
        render(dataToDownload);
        $("#clickToAddInfo").unbind('click');
    });

    $("#btnDelete").click(function() {
        console.log(ddd);
        empty();
        dataToDownload.splice((ddd-1),1);
        console.log("dddddd");
        clear();
        render(dataToDownload);
        $('#btnDelete').unbind('click')
    });

    $("#btnGoto").click(function() {
        videoNode.currentTime = timeString2ms(startTime)/1000;
    });
});



$(".display-info").live('mouseover',function() {
    console.log("ddd");
   $(this).children('.close-item').addClass('toDisplay');
})
render(dataToDownload);
/*
$('#clickToAddInfo').click(function(this) {
    console.log($("#edit-subtitle").children().val());
    $(this).children('.start-time').html($("#edit-start-time").children().val());
    $(this).children('.end-time').html($("#edit-end-time").children().val());
    $(this).children('.subtitle').html($("#edit-subtitle").children().val());
});
    */

