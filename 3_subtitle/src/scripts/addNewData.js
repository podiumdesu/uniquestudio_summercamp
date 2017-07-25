import {dataToDownload} from './data.js';
import render from './render.js';
import clear from './clear.js';
import empty from './empty.js';

export default function() {
    let newData = {};
    newData.index = dataToDownload.length + 1;

    newData.startTime = $("#edit-start-time").children().val();
    newData.endTime = $('#edit-end-time').children().val();
    newData.subtitleInfo = $("#edit-subtitle").children().val();
    if (!newData.startTime || !newData.endTime || !newData.subtitleInfo) {

    } else {
        dataToDownload.push(newData);
        empty();
        clear();
        render(dataToDownload);
    }

}