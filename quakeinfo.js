var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}
var url = 'http://apis.data.go.kr/1360000/EqkInfoService/getEqkMsg'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday() - 3); /**/
queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        var myObj = JSON.parse(this.responseText);
        var quakeinfo = myObj.response.body.items.item[0];
        document.getElementById('quake_location').textContent = "발생지역 : " + quakeinfo.loc;
        var yyyymmdd = String(quakeinfo.tmEqk);
        var year = yyyymmdd.slice(0, 4);
        var month = yyyymmdd.slice(4, 6);
        var date = yyyymmdd.slice(6, 8);
        var hour = yyyymmdd.slice(8, 10);
        var minute = yyyymmdd.slice(10, 12);
        var sec = yyyymmdd.slice(12, 14)
        document.getElementById('quake_time').textContent = "발생시각 : " + year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분 " + sec + "초";
        document.getElementById('magnitude').textContent = "규모 : " + quakeinfo.mt;
        document.getElementById('quake_rem').textContent = "참고사항 : " + quakeinfo.rem;
        document.getElementById('quake_img').src = quakeinfo.img;
        var where = quakeinfo.fcTp
        if (where == 2) { //국외 지진정보
            if (quakeinfo.mt >= 5.5) {
                document.getElementById('quake_title').textContent = "해외에서 강한 지진이 발생했습니다"
            } else {
                document.getElementById('quake_title').textContent = "해외에서 지진이 발생했습니다"
            }
            document.getElementById('intensity').style.visibility = "hidden"
        } else if (where == 3 || where == 5) { //국내 지진정보 || 국내 지진정보 재통보
            if (quakeinfo.mt < 2.0) {
                document.getElementById('quake_title').textContent = "국내에서 미소 지진이 발생했습니다."
            } else if (quakeinfo.mt >= 2.0) {
                document.getElementById('quake_title').textContent = "국내에서 규모 2.0 이상의 지진이 발생했습니다."
            } else if (quakeinfo.mt >= 3.0) {
                document.getElementById('quake_title').textContent = "국내에서 규모 3.0 이상의 약간 강한 지진이 발생했습니다."
            } else if (quakeinfo.mt >= 4.0) {
                document.getElementById('quake_title').textContent = "국내에서 규모 4.0 이상의 강한 지진이 발생했습니다."
            } else if (quakeinfo.mt >= 5.0) {
                document.getElementById('quake_title').textContent = "국내에서 규모 5.0 이상의 매우 강한 지진이 발생했습니다."
            } else {
                document.getElementById('quake_title').textContent = "국내에서 지진이 발생했습니다"
            }
            document.getElementById('intensity').textContent = "진도 : " + quakeinfo.inT
        } else if (where == 11){
            document.getElementById('quake_title').textContent = "국내에서 강한 지진이 발생한 것으로 추정됩니다! 추후 정보를 확인하세요!"
        } else if (where == 12){
            document.getElementById('quake_title').textContent = "국외에서 강한 지진이 발생한 것으로 추정됩니다! 추후 정보를 확인하세요!"
        } else if (where == 13){
            document.getElementById('quake_title').textContent = "국내에서 강한 지진이 발생했습니다. 추후 정보를 확인하십시오."
        } else if (where == 14){
            document.getElementById('quake_title').textContent = "국내에서 강한 지진이 발생했습니다. 추후 정보를 확인하십시오."
        }
    }
};
xhr.send('');
console.log(url + queryParams)
