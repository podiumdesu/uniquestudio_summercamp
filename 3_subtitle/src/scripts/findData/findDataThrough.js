export default function(way, content) {
    var ID = "id";
    var TIME = "time";
    var SUBTITLE = "subtitle";
    switch (way) {
        case ID: findID(content);
            break;
        case TIME: alert("ddd");
            break;
        case SUBTITLE: findSUBTITIE();
            break;
    }
}

const findID = function(content) {
    alert(content);
};

const findSUBTITLE = function(content) {
    alert("subtitile");
}
