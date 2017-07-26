/**
 * Created by petnakanojo on 26/07/2017.
 */
export function ms2TimeString(a,ms,s,m,h){
    return ms=a%1e3|0,
        s=a/1e3%60|0,
        m=a/6e4%60|0,
        h=a/36e5%24|0,
    (h<10?'0'+h:h)+':'+
    (m<10?'0'+m:m)+':'+
    (s<10?'0'+s:s)+','+
    (ms<100?(ms<10?'00'+ms:'0'+ms):ms)
}
export function timeString2ms(a,b){
    return a=a.split(','),
        b=a[1]*1||0,
        a=a[0].split(':'),
    b+(a[2]?a[0]*3600+a[1]*60+a[2]*1:a[1]?a[0]*60+a[1]*1:a[0]*1)*1e3
}
