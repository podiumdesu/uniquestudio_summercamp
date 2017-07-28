import {dataToDownload} from './data.js';
import render from './render.js';
import clear from './clear.js';
export default  function() {
    var fileNode = document.getElementById('inputSRT');
    URL = window.URL || window.webkitURL;
    var fileURL;
    var srtSubtitleUrl = '';
    var playSelectorFile = function (event) {
        console.log("hello");
        var file = this.files[0];
        fileURL = URL.createObjectURL(file);
        //srtSubtitleUrl = fileURL;
        console.log(fileURL);
    }
    fileNode.addEventListener('change',playSelectorFile,false);

    var srtSubtitleUrl = 'hadoop.srt';
// 字幕对象的数组
    var subtitles = []; // {sn: 1, startTime: 0, endTime: 100, content: '这里是一系列与Hadoop'}, 时间单位是秒
// 加载字幕
    $.get(srtSubtitleUrl, function(srt) {
        parseSrtSubtitles(srt);
        clear();
        render(dataToDownload);
        console.log(dataToDownload);
    });
}

function parseSrtSubtitles(srt) {
    while(dataToDownload.length > 0) {
        dataToDownload.pop();
    }
    var textSubtitles = srt.split('\n\n'); // 每条字幕的信息，包含了序号，时间，字幕内容
    for (var i = 0; i < textSubtitles.length; ++i) {
        var textSubtitle = textSubtitles[i].split('\n');
        if (textSubtitle.length >= 2) {
            var index = textSubtitle[0]; // 字幕的序号
            var startTime = ms2TimeString(toSeconds($.trim(textSubtitle[1].split(' --> ')[0]))*1000); // 字幕的开始时间
            var endTime   = ms2TimeString(toSeconds($.trim(textSubtitle[1].split(' --> ')[1]))*1000); // 字幕的结束时间
            var content   = textSubtitle[2]; // 字幕的内容

            // 字幕可能有多行
            if (textSubtitle.length > 2) {
                for (var j = 3; j < textSubtitle.length; j++) {
                    content += '\n' + textSubtitle[j];
                }
            }
            // 字幕对象
            var subtitle = {
                index: parseInt(index),
                startTime: startTime,
                endTime: endTime,
                subtitleInfo: content,
            };
            dataToDownload.push(subtitle);
        }
    }
}
function ms2TimeString(a,ms,s,m,h){
    return ms=a%1e3|0,
        s=a/1e3%60|0,
        m=a/6e4%60|0,
        h=a/36e5%24|0,
    (h<10?'0'+h:h)+':'+
    (m<10?'0'+m:m)+':'+
    (s<10?'0'+s:s)+','+
    (ms<100?(ms<10?'00'+ms:'0'+ms):ms)
}
function toSeconds(t) {
    var s = 0.0;
    if (t) {
        var p = t.split(':');
        for (let i = 0; i < p.length; i++) {
            s = s * 60 + parseFloat(p[i].replace(',', '.'));
        }
    }
    return s;
}

