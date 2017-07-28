import computeIndex from './computeIndex.js';

export default function (renderData) {
    computeIndex();
    //console.log("This is render.js");
    //console.log(renderData);

    const targetNode  = $("#info-table");
    //console.log(typeof(targetNode) );
    renderData.forEach(renderDataFunc);

}

//Todo
function renderDataFunc(element,index) {   //返回
    //console.log(element);
    let targetNode = $("#info-table");
    let div = document.createElement("div");
    div.setAttribute("class","display-info");
    let stringToInsert = `
                        <span class='index'>${element.index}</span>
                        <span class='start-time'>${element.startTime}</span>
                        <span class='end-time'>${element.endTime}</span>
                        <span class='subtitle'>${element.subtitleInfo}</span>
                        <span class="close-item">x</span>
                        `;
    div.innerHTML = stringToInsert;
    //console.log(div);
    targetNode.append(div);
}