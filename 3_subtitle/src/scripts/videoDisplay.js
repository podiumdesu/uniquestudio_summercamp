/**
 * Created by petnakanojo on 26/07/2017.
 */
import {ms2TimeString, timeString2ms} from './convertTime.js';

export var videoNode = document.querySelector('video');
var fileNode = document.getElementById('inputFile');
URL = window.URL || window.webkitURL;
var playSelectorFile = function (event) {
    var file = this.files[0];
    var fileURL = URL.createObjectURL(file);
    videoNode.src = fileURL;
}

fileNode.addEventListener('change',playSelectorFile,false);

var setTimeButtonNode = $("#clickToRecordTime");
setTimeButtonNode.click(function() {
    if ($(this).children().attr("src").indexOf("start") >= 0) {   //说明此时需要记录的是开始时间
        //console.log(videoNode.currentTime);
        $("#edit-start-time").children().val(ms2TimeString(videoNode.currentTime*1000));
    } else {
        $("#edit-end-time").children().val(ms2TimeString(videoNode.currentTime*1000));
    }
})
