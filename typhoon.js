var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}
var url = 'http://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfo'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호 조회*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*행 수*/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday()); /*조회 시작 날짜 - 오늘*/
queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /*조회 끝 날짜 - 오늘*/
xhr.open('GET', url + queryParams);
api_url = url + queryParams;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        document.getElementById("typhoon_title").textContent = "[제 " + myObj.response.body.items.item[0].typSeq + "호 태풍 " + myObj.response.body.items.item[0].typName + "에 관한 기상청 태풍정보 제 " + myObj.response.body.items.item[0].tmSeq + "호]"
        document.getElementById("typhoon_clock").textContent =myObj.response.body.items.item[0].tmFc + "발표" 
        document.getElementById("typhoon_info_text").textContent = 
        "제 " + myObj.response.body.items.item[0].typSeq  + "호 태풍 '" + myObj.response.body.items.item[0].typName + "'은(는) " + myObj.response.body.items.item[0].typLoc + "에서 " + myObj.response.body.items.item[0].typDir + "방향으로 " + myObj.response.body.items.item[0].typSp + "km/h의 속도로 이동중.";
        document.getElementById("typhoon_img").src = myObj.response.body.items.item[0].img;
    }
};
xmlhttp.open("GET", api_url, true);
xmlhttp.send();
