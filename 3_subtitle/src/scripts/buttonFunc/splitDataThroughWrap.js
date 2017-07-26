import {dataToDownload} from '../data.js'
export default function(textarea) {   //传入的参数为节点id名
    var s = $(textarea).val();
    var textArray = s.split("\n");
    //console.log(textArray);
    var filteredArray =  textArray.filter(popDataWith0Length);
    //console.log(filteredArray);
    filteredArray.forEach(pushIntoData);
}

function popDataWith0Length(element) {    //判断是否存在某行没有输入
    //console.log(element.length);
    return (element.length > 0);
}
function pushIntoData(element, index, array) {    //将用户批量上传的数据存入data数组中
    //console.log(element);
    var newData = {
        startTime: "00:00:00,000",
        endTime: "00:00:00,000",
        subtitleInfo: element,
    };
    dataToDownload.push(newData);
}