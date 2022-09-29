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
        try{
            document.getElementById('quake_location').textContent = quakeinfo.loc;
        }catch (error){
            document.getElementById('quake_location').textContent = "페이지를 새로고침 해보세요. 계속해서 오류가 발생한다면 '당신의 방재정보 > 지진정보' 탭으로 이동해보세요.";
            document.getElementById('quake_title').textContent = "정보를 불러오는데 실패했습니다.";
            document.getElementById('quake_time').textContent = "정보를 불러오는데 실패했습니다.";
            document.getElementById('magnitude').textContent = "정보를 불러오는데 실패했습니다.";
            document.getElementById('depth').textContent = "정보를 불러오는데 실패했습니다.";
            document.getElementById('intensity').textContent = "정보를 불러오는데 실패했습니다.";
            document.getElementById('quake_rem').textContent = "정보를 불러오는데 실패했습니다.";
            document.getElementById('quake_img').alt = "지진정보 이미지를 불러오는데 실패했습니다.";
        }
        var yyyymmdd = String(quakeinfo.tmEqk);
        var year = yyyymmdd.slice(0, 4);
        var month = yyyymmdd.slice(4, 6);
        var date = yyyymmdd.slice(6, 8);
        var hour = yyyymmdd.slice(8, 10);
        var minute = yyyymmdd.slice(10, 12);
        var sec = yyyymmdd.slice(12, 14);
        document.getElementById('quake_time').textContent = year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분 " + sec + "초";
        var mag =String(quakeinfo.mt)
        if (mag.length == 1){
            document.getElementById('magnitude').textContent = quakeinfo.mt + ".0"
        }else{
            document.getElementById('magnitude').textContent = quakeinfo.mt
        }
        if (quakeinfo.dep == 0){
            document.getElementById('depth').textContent =  "-km"
        }else{
            document.getElementById('depth').textContent = quakeinfo.dep +"km"
        }
        document.getElementById('quake_rem').textContent = quakeinfo.rem;
        document.getElementById('quake_img').src = quakeinfo.img;
        var where = quakeinfo.fcTp
        if (where == 2) { //국외 지진정보
            if (quakeinfo.mt >= 7.0) {
                document.getElementById('quake_title').textContent = "해외에서 매우 강한 지진이 발생했습니다"
            } else if (quakeinfo.mt >= 6.0) {
                document.getElementById('quake_title').textContent = "해외에서 강한 지진이 발생했습니다"
            } else{
                document.getElementById('quake_title').textContent = "해외에서 지진이 발생했습니다"
            }
            document.getElementById('intensity').textContent = "국외지진정보는 최대진도 정보를 제공하지 않습니다."
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
            document.getElementById('intensity').textContent = quakeinfo.inT
        } else if (where == 11){
            document.getElementById('quake_title').textContent = "국내에서 강한 지진이 발생한 것으로 추정됩니다! 추후 정보를 확인하세요!"
        } else if (where == 12){
            document.getElementById('quake_title').textContent = "국외에서 강한 지진이 발생한 것으로 추정됩니다! 추후 정보를 확인하세요!"
        } else if (where == 13){
            document.getElementById('quake_title').textContent = "국내에서 강한 지진이 발생했습니다. 추후 정보를 확인하십시오."
        } else if (where == 14){
            document.getElementById('quake_title').textContent = "국내에서 강한 지진이 발생했습니다. 추후 정보를 확인하십시오."
        }
    }else{
        document.getElementById('quake_location').textContent = "페이지를 새로고침 해보세요. 계속해서 오류가 발생한다면 '당신의 방재정보 > 지진정보' 탭으로 이동해보세요.";
        document.getElementById('quake_title').textContent = "정보를 불러오는데 실패했습니다.";
        document.getElementById('quake_time').textContent = "정보를 불러오는데 실패했습니다.";
        document.getElementById('magnitude').textContent = "정보를 불러오는데 실패했습니다.";
        document.getElementById('depth').textContent = "정보를 불러오는데 실패했습니다.";
        document.getElementById('intensity').textContent = "정보를 불러오는데 실패했습니다.";
        document.getElementById('quake_rem').textContent = "정보를 불러오는데 실패했습니다.";
        document.getElementById('quake_img').alt = "지진정보 이미지를 불러오는데 실패했습니다.";
    }
};
xhr.send('');
// console.log(url + queryParams)
