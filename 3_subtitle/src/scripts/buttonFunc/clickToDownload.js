function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
}

function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
}

export function saveFile(WhatToBeDownloaded){
    exportRaw('subtitle.srt', JSON.stringify(WhatToBeDownloaded,null,'\n'));
}

//最终下载数据还需要再进行处理，因为数组中本身不包含id。
//标准srt格式：
/*
 1
 00:00:01,810 --> 00:00:03,200
 好啦  节目马上开始直播
 All right, we're about to go live.

 2
 00:00:03,200 --> 00:00:04,620
 大家拿出最佳表现
 Everyone on their A-game!

 3
 00:00:04,620 --> 00:00:06,660
 精神点
 Good energy!

 4
 00:00:07,380 --> 00:00:09,500
 大家好
 Hello.

 5
 00:00:10,400 --> 00:00:12,020
 我是谢尔顿·库珀博士
 I'm Dr. Sheldon Cooper.


 */