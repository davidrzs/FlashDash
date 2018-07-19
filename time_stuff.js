function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var dName = today.toLocaleString('de-CH',{ weekday: 'long' });
    var month = today.toLocaleString('de-CH', { month: "long" });
    var day_in_month = today.getDate();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m;
    document.getElementById('day').innerHTML = dName;
    document.getElementById('datum').innerHTML = day_in_month + ' ' + month;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
