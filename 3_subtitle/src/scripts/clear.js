export default function() {
    let targetNode = $("#info-table");
    while(targetNode.children().length > 0) {
        targetNode.empty();
    }

}