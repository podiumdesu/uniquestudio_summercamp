/**
 * Created by petnakanojo on 26/07/2017.
 */
import {dataToDownload} from './data.js';
import {timeString2ms} from './convertTime.js';
export default function() {
    dataToDownload.sort(function(a,b){
        return timeString2ms(a.startTime)/1000 - timeString2ms(b.startTime)/1000;
    });
    //console.log("dddddddddddddd");
    //console.log(dataToDownload);
    dataToDownload.forEach(function(element, index) {
        element.index = index + 1;
    });
    //console.log(dataToDownload);
}