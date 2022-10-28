var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}

//API URL 주소 생성
var url = 'http://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfo'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호 조회*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /*행 수*/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday() - 1); /*조회 시작 날짜 - 오늘*/
queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /*조회 끝 날짜 - 오늘*/
xhr.open('GET', url + queryParams);
var api_url = url + queryParams;
var number = 0;

//함수 생성
function typhoon() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var myObj = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('typhoon_title').textContent = "[01] 어플리케이션 에러 발생(APPLICATION_ERROR)"
            }
            if (myObj.response.header.resultCode = "00") {
                var typhooninfo = myObj.response.body.items.item[number];
                var max_num = myObj.response.body.totalCount;

                try {
                    var typ_num = typhooninfo.typSeq;
                    var typ_name = typhooninfo.typName;
                    var dir
                    if (typ_dir == 'N') {
                        dir = "북"
                    } else if (typ_dir == 'NNE') {
                        dir = "북북동"
                    } else if (typ_dir == 'NE') {
                        dir = "북동"
                    } else if (typ_dir == 'ENE') {
                        dir = "동북동"
                    } else if (typ_dir == 'E') {
                        dir = "동"
                    } else if (typ_dir == "ESE") {
                        dir = "동남동"
                    } else if (typ_dir == "SE") {
                        dir = "남동"
                    } else if (typ_dir == "SSE") {
                        dir = '남남동'
                    } else if (typ_dir == 'S') {
                        dir = '남'
                    } else if (typ_dir == 'SSW') {
                        dir = '남남서'
                    } else if (typ_dir == 'SW') {
                        dir = '남서'
                    } else if (typ_dir == 'WSW') {
                        dir = '서남서'
                    } else if (typ_dir == 'W') {
                        dir = '서'
                    } else if (typ_dir == 'WNW') {
                        dir = '서북서'
                    } else if (typ_dir == 'NW') {
                        dir = '북서'
                    } else if (typ_dir == 'NNW') {
                        dir = '북북서'
                    } else {
                        dir = '정의되지 않음'
                    }
                    var yyyymmdd = String(typhooninfo.tmFc);
                    var year = yyyymmdd.slice(0, 4);
                    var month = yyyymmdd.slice(4, 6);
                    var date = yyyymmdd.slice(6, 8);
                    var hour = yyyymmdd.slice(8, 10);
                    var minute = yyyymmdd.slice(10, 12);
                    document.getElementById("typhoon_info_text").textContent = `제${typ_num}호 태풍 ${typ_name}은(는) ${typhooninfo.typLoc}에서 ${dir}쪽을 향해 ${typhooninfo.typSp}km/h의 속도로 이동중.`
                    document.getElementById('typhoon_title').textContent = `[제${typ_num}호 태풍 ${typ_name}에 관한 기상청 태풍정보 제${typhooninfo.tmSeq}호]`
                    document.getElementById('typhoon_clock').textContent = `${year}년 ${month}월 ${date}일 ${hour}시 ${minute}분 발표`
                    document.getElementById('typhoon_img').src = typhooninfo.img;
                    document.getElementById('typhoon_img').alt = '태풍정보 이미지'
                    document.getElementById('other').textContent = `○${typhooninfo.other}`
                    var rem = typhooninfo.rem;
                    var afterrem = rem.split('|');
                    document.getElementById('rem').textContent = `○${afterrem[0]} ${afterrem[1]}`;

                    //당신의 방재정보
                    try {
                        document.getElementById('typhoon_name').textContent = `${typhooninfo.typName} (${typhooninfo.typEn})`;
                        document.getElementById('location').textContent = typhooninfo.typLoc;
                        document.getElementById('lat').textContent = `(${typ_par_main.typLat}, ${typ_par_main.typLon})`
                        document.getElementById('movement').textContent = `${dir}쪽, ${typ_par_main.typSp}km/h`
                        document.getElementById('pressure').textContent = `${typ_par_main.typPs}hPa`
                        document.getElementById('wind_speed').textContent = `${typ_par_main.typWs}m/s`

                        //폭풍역
                        if (typhooninfo.typ25 == 0) {
                            typ25 = "--"
                        } else {
                            typ25 = typhooninfo.typ25;
                        }

                        //강도
                        var strength
                        if (typ_par_main.typWs >= 54) {
                            strength = "초강력"
                        } else if (typ_par_main.typWs >= 45) {
                            strength = "매우강"
                        } else if (typ_par_main.typWs >= 33) {
                            strength = "강"
                        } else if (typ_par_main.typWs >= 25) {
                            strength = "중"
                        } else {
                            strength = "--"
                        }
                        document.getElementById('strength').textContent = strength;
                        document.getElementById('typ15').textContent = `강풍반경 : ${typ_par_main.typ15}km, 폭풍반경 : ${typ25}km/h`

                    } catch (error) {
                        //방재 탭 로드
                        console.log("방재탭 로드")
                    }
                } catch (error) {
                    document.getElementById('typhoon_title').textContent = "오류가 발생했습니다. 페이지를 새로고침 해 보세요."
                    console.log('이게 문제임')
                }
            } else if (myObj.response.header.resultCode == "01") {
                document.getElementById('typhoon_title').textContent = "[01] 어플리케이션 에러 발생(APPLICATION_ERROR)"
            } else if (myObj.response.header.resultCode == "02") {
                document.getElementById('typhoon_title').textContent = "[02] 데이터베이스 에러 발생(DATABASE_ERROR)"
            } else if (myObj.response.header.resultCode == "03") {
                try {
                    document.getElementById('typhoon_box').style.display = 'none';
                    document.getElementById('typhoon_info_br').style.display = 'none';
                    console.log('잘 되는중')
                } catch (error) {
                    document.getElementById('typhoon_title').textContent = "최근 3일간 발표된 지진정보는 없습니다."
                    console.log('아님 이거임')
                }
            } else if (myObj.response.header.resultCode == "04") {
                document.getElementById('typhoon_title').textContent = "[04] HTTP 에러 발생(HTTP_ERROR)"
            } else if (myObj.response.header.resultCode == "05") {
                document.getElementById('typhoon_title').textContent = "[05] 서비스 연결 실패(SERVICETIME_OUT)"
            } else if (myObj.response.header.resultCode == "10") {
                document.getElementById('typhoon_title').textContent = "[10] 요청 파라메터가 잘못됨(INVALID_REQUEST_PARAMETER_ERROR)"
            } else if (myObj.response.header.resultCode == "11") {
                document.getElementById('typhoon_title').textContent = '[11] 필수 요청 파라메터가 없음(NO_MANDATORY_REQUEST_PARAMETER_ERROR)'
            } else if (myObj.response.header.resultCode == "12") {
                document.getElementById('typhoon_title').textContent = '[12] 해당 오픈API 서비스가 없거나 폐기됨(NO_OPENAPI_SERVICE_ERROR)'
            } else if (myObj.response.header.resultCode == "20") {
                document.getElementById('typhoon_title').textContent = '[20] 서비스 접근이 거부됨(SERVICE_ACCESS_DENIED_ERROR)'
            } else if (myObj.response.header.resultCode == "21") {
                document.getElementById('typhoon_title').textContent = '[21] 서비스 키를 일시적으로 사용할 수 없음(TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR)'
            } else if (myObj.response.header.resultCode == "22") {
                document.getElementById('typhoon_title').textContent = '[22] 서비스 요청 제한 횟수가 초과됨(LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR)'
            } else if (myObj.response.header.resultCode == "30") {
                document.getElementById('typhoon_title').textContent = '[30] 서비스 키가 등록되지 않음(SERVICE_KEY_IS_NOT_REGISTERED_ERROR)'
            } else if (myObj.response.header.resultCode == "31") {
                document.getElementById('typhoon_title').textContent = '[31] 서비스 키의 기한이 만료됨(DEADLINE_HAS_EXPIRED_ERROR)'
            } else if (myObj.response.header.resultCode == "32") {
                document.getElementById('typhoon_title').textContent = '[32] IP가 등록되지 않음(UNREGISTERED_IP_ERROR)'
            } else if (myObj.response.header.resultCode == "33") {
                document.getElementById('typhoon_title').textContent = '[33] 서명되지 않은 호출(UNSIGNED_CALL_ERROR)'
            } else if (myObj.response.header.resultCode == "99") {
                document.getElementById('typhoon_title').textContent = '[99] 기타 에러 발생(UNKNOWN_ERROR)'
            } else {
                document.getElementById('typhoon_title').textContent = '예외처리되지 않은 에러가 발생하였습니다'
            }
        }
    }
};

xhr.send('');
console.log(url + queryParams)