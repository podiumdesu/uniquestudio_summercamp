import render from '../render.js';
import {dataToDownload} from '../data.js';
import clear from '../clear.js';
export default function(way, content) {
    var ID = "id";
    var TIME = "time";
    var SUBTITLE = "subtitle";
    switch (way) {
        case ID: findID(content);
            break;
        case TIME: findTIME(content);
            break;
        case SUBTITLE: findSUBTITLE(content);
            break;
    }
}

const findID = function(content) {
    let targetArray = dataToDownload.concat();
    targetArray = targetArray.filter(function(element,index) {
        console.log(index+1);
        console.log(content);
        console.log((index+1)===parseInt(content));
        return ((index + 1) === parseInt(content));
    });
    clear();
    render(targetArray);
};
const findTIME = function(content) {
    let targetArray = dataToDownload.concat();
    targetArray = targetArray.filter(function(element) {
        return (element.startTime.indexOf(content) >= 0 || element.endTime.indexOf(content) >= 0);
    });
    clear();
    render(targetArray);
}
const findSUBTITLE = function(content) {
    let targetArray = dataToDownload.concat();
    targetArray = targetArray.filter(function(element) {
        return (element.subtitleInfo.indexOf(content) >= 0);
    });
    clear();
    render(targetArray);
}
