
var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}
var url = 'http://apis.data.go.kr/1360000/WthrChartInfoService/getSurfaceChart'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('code') + '=' + encodeURIComponent('24'); /**/
queryParams += '&' + encodeURIComponent('time') + '=' + encodeURIComponent(getToday()); /**/
xhr.open('GET', url + queryParams);


xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        try {
            myObj = JSON.parse(this.responseText);
        } catch (error) {
            document.getElementById('quake_title').textContent = "[01] 어플리케이션 에러 발생(APPLICATION_ERROR)"
        }
        if (myObj.response.header.resultCode == '00') {
            var weathermap = myObj.response.body.items.item;
            try{
            document.getElementById('weathermap_img').src = myObj.response.body.items.item[0]["man-file"].slice(1, 70)
            }catch(error){
                document.getElementById('weathermap_img').alt = '일기도를 불러오는데 실패했습니다'
            }
        }else if (myObj.response.header.resultCode == "01") {
            document.getElementById('weathermap_title').textContent = "[01] 어플리케이션 에러 발생(APPLICATION_ERROR)"
        } else if (myObj.response.header.resultCode == "02") {
            document.getElementById('weathermap_title').textContent = "[02] 데이터베이스 에러 발생(DATABASE_ERROR)"
        } else if (myObj.response.header.resultCode == "03") {
            try {
                document.getElementById('weathermap_box').style.display = 'none';
                document.getElementById('weathermap_info_br').style.display = 'none';
            } catch (error) {
                document.getElementById('weathermap_title').textContent = "자료가 존재하지 않습니다."
            }
        } else if (myObj.response.header.resultCode == "04") {
            document.getElementById('weathermap_title').textContent = "[04] HTTP 에러 발생(HTTP_ERROR)"
        } else if (myObj.response.header.resultCode == "05") {
            document.getElementById('weathermap_title').textContent = "[05] 서비스 연결 실패(SERVICETIME_OUT)"
        } else if (myObj.response.header.resultCode == "10") {
            document.getElementById('weathermap_title').textContent = "[10] 요청 파라메터가 잘못됨(INVALID_REQUEST_PARAMETER_ERROR)"
        } else if (myObj.response.header.resultCode == "11") {
            document.getElementById('weathermap_title').textContent = '[11] 필수 요청 파라메터가 없음(NO_MANDATORY_REQUEST_PARAMETER_ERROR)'
        } else if (myObj.response.header.resultCode == "12") {
            document.getElementById('weathermap_title').textContent = '[12] 해당 오픈API 서비스가 없거나 폐기됨(NO_OPENAPI_SERVICE_ERROR)'
        } else if (myObj.response.header.resultCode == "20") {
            document.getElementById('weathermap_title').textContent = '[20] 서비스 접근이 거부됨(SERVICE_ACCESS_DENIED_ERROR)'
        } else if (myObj.response.header.resultCode == "21") {
            document.getElementById('weathermap_title').textContent = '[21] 서비스 키를 일시적으로 사용할 수 없음(TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR)'
        } else if (myObj.response.header.resultCode == "22") {
            document.getElementById('weathermap_title').textContent = '[22] 서비스 요청 제한 횟수가 초과됨(LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR)'
        } else if (myObj.response.header.resultCode == "30") {
            document.getElementById('weathermap_title').textContent = '[30] 서비스 키가 등록되지 않음(SERVICE_KEY_IS_NOT_REGISTERED_ERROR)'
        } else if (myObj.response.header.resultCode == "31") {
            document.getElementById('weathermap_title').textContent = '[31] 서비스 키의 기한이 만료됨(DEADLINE_HAS_EXPIRED_ERROR)'
        } else if (myObj.response.header.resultCode == "32") {
            document.getElementById('weathermap_title').textContent = '[32] IP가 등록되지 않음(UNREGISTERED_IP_ERROR)'
        } else if (myObj.response.header.resultCode == "33") {
            document.getElementById('weathermap_title').textContent = '[33] 서명되지 않은 호출(UNSIGNED_CALL_ERROR)'
        } else if (myObj.response.header.resultCode == "99") {
            document.getElementById('weathermap_title').textContent = '[99] 기타 에러 발생(UNKNOWN_ERROR)'
            document.getElementById('weathermap_img').alt = myObj.response.header.resultMsg
        } else {
            document.getElementById('weathermap_title').textContent = '예외처리되지 않은 에러가 발생하였습니다'
        }
    }
};
console.log(url + queryParams)
xhr.send('');
