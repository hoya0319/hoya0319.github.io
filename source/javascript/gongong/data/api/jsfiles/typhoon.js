
var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}
var typhoon_json = {
    "response": {
        "header": {
            "resultCode": "00",
            "resultMsg": "NORMAL_SERVICE"
        },
        "body": {
            "dataType": "JSON",
            "items": {
                "item": [
                    {
                        "other": "제24호 태풍 야마네코(YAMANEKO)는 일본에서 제출한 이름으로 살쾡이자리(별자리)를 의미함.",
                        "img": "http://www.weather.go.kr/w/repositary/image/typ/img/RTKO63_202211141600]24_ko.png",
                        "rem": "이 태풍은 24시간 이내에 온대저기압으로 변질될 것으로 예상됨.|다음 정보는 오늘(14일) 16시경에 발표될 예정임.|",
                        "tmFc": "202211141600",
                        "tmSeq": 8,
                        "typ15": 250,
                        "typ15ed": "-",
                        "typ15er": 0,
                        "typ25": 70,
                        "typ25ed": "-",
                        "typ25er": 0,
                        "typDir": "NNE",
                        "typEn": "YAMANEKO",
                        "typLat": 24.8,
                        "typLoc": "일본 도쿄 동남동쪽 약 2780 km 부근 해상",
                        "typLon": 165.9,
                        "typName": "야마네코",
                        "typPs": 910,
                        "typSeq": 24,
                        "typSp": 21,
                        "typTm": 202211141500,
                        "typWs": 55
                    },
                    {
                        "other": "제24호 태풍 야마네코(YAMANEKO)는 일본에서 제출한 이름으로 살쾡이자리(별자리)를 의미함.",
                        "img": "http://www.weather.go.kr/w/repositary/image/typ/img/RTKO63_202211141000]24_ko.png",
                        "rem": "이 태풍은 오늘(14일) 15시경 열대저압부로 약화되었으며, 이것으로 제24호 태풍 야마네코(YAMANEKO)에 대한 정보를 종료함.|",
                        "tmFc": "202211141000",
                        "tmSeq": 7,
                        "typ15": 250,
                        "typ15ed": "SW",
                        "typ15er": 150,
                        "typ25": 0,
                        "typ25ed": "-",
                        "typ25er": 0,
                        "typDir": "NNW",
                        "typEn": "YAMANEKO",
                        "typLat": 23.8,
                        "typLoc": "일본 도쿄 동남동쪽 약 2810 km 부근 해상",
                        "typLon": 165.6,
                        "typName": "야마네코",
                        "typPs": 1002,
                        "typSeq": 24,
                        "typSp": 23,
                        "typTm": 202211140900,
                        "typWs": 18
                    },
                    {
                        "other": "제24호 태풍 야마네코(YAMANEKO)는 일본에서 제출한 이름으로 살쾡이자리(별자리)를 의미함.",
                        "img": "http://www.weather.go.kr/w/repositary/image/typ/img/RTKO63_202211140400]24_ko.png",
                        "rem": "이 태풍은 24시간 이내에 온대저기압으로 변질될 것으로 예상됨.|다음 정보는 오늘(14일) 10시경에 발표될 예정임.|",
                        "tmFc": "202211140400",
                        "tmSeq": 6,
                        "typ15": 250,
                        "typ15ed": "SW",
                        "typ15er": 150,
                        "typ25": 0,
                        "typ25ed": "-",
                        "typ25er": 0,
                        "typDir": "NNE",
                        "typEn": "YAMANEKO",
                        "typLat": 22.7,
                        "typLoc": "일본 도쿄 동남동쪽 약 2920 km 부근 해상",
                        "typLon": 166.0,
                        "typName": "야마네코",
                        "typPs": 1002,
                        "typSeq": 24,
                        "typSp": 7,
                        "typTm": 202211140300,
                        "typWs": 18
                    }
                ]
            },
            "pageNo": 1,
            "numOfRows": 30,
            "totalCount": 3
        }
    }
}
var url = 'http://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfo'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' +'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호 조회*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /*행 수*/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
var now=new Date();
var twoago = new Date(now.setDate(now.getDate()-3));
// console.log(twoago)
twoago = twoago.toString()
twoago_month = twoago.slice(4, 7)
if(twoago_month == 'Jan'){
    twoago_month = '01'
}else if(twoago_month == 'Feb'){
    twoago_month = '02'
}else if(twoago_month == 'Mar'){
    twoago_month = '03'
}else if(twoago_month == 'Apr'){
    twoago_month = '04'
}else if(twoago_month == 'May'){
    twoago_month = '05'
}else if(twoago_month == 'Jun'){
    twoago_month = '06'
}else if(twoago_month == 'Jul'){
    twoago_month = '07'
}else if(twoago_month == 'Aug'){
    twoago_month = '08'
}else if(twoago_month == 'Sep'){
    twoago_month = '09'
}else if(twoago_month == 'Oct'){
    twoago_month = '10'
}else if(twoago_month == 'Nov'){
    twoago_month = '11'
}else if(twoago_month == 'Dec'){
    twoago_month = '12'
}
twoago_date = twoago.slice(8,10)
twoago_year = twoago.slice(11,15)
// console.log(twoago_month)
// console.log(twoago_date)
// console.log(twoago_year)
queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(twoago_year + twoago_month + twoago_date); /*조회 시작 날짜 - 오늘*/
queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /*조회 끝 날짜 - 오늘*/
xhr.open('GET', url + queryParams);
var api_url = url + queryParams;
console.log(api_url)
var number = 0;
typhoon()
function typhoon() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try{    
                // var myObj = JSON.parse(this.responseText);   
                var myObj = typhoon_json
            }catch (error){
                document.getElementById("typhoon_title").textContent = "기상청 태풍정보를 불러오는데 실패했습니다."
                document.getElementById("typhoon_img").alt = "태풍정보 이미지를 불러오는데 실패했습니다."
            }
            if(myObj.response.header.resultCode == "00"){
                try{
                    document.getElementById('typhoon_box').style.display = 'block';
                    document.getElementById('typhoon_info_br').style.display = 'block';
                }catch(error){}
                var typ_par_main = myObj.response.body.items.item[number];
                var max_num = myObj.response.body.totalCount
                try{
                    var typ_num = typ_par_main.typSeq;
                }
                catch(error){
                    alert('조회 범위를 벗어났습니다.');
                    number = number-1;
                }
                var typ_name = typ_par_main.typName;
                var typ_dir = typ_par_main.typDir
                var dir = "방향"
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
                var yyyymmdd = String(typ_par_main.tmFc);
                var year = yyyymmdd.slice(0, 4);
                var month = yyyymmdd.slice(4, 6);
                var date = yyyymmdd.slice(6, 8);
                var hour = yyyymmdd.slice(8, 10);
                var minute = yyyymmdd.slice(10, 12);
                try{
                    document.getElementById("typhoon_info_text").textContent =  "제 " + typ_num + "호 태풍 '" + typ_name + "'은(는) " + typ_par_main.typLoc + "에서 " + dir + "쪽을 향해 " + typ_par_main.typSp + "km/h의 속도로 이동중.";
                }catch(error){

                }
                try{
                document.getElementById("typhoon_title").textContent = "[제 " + typ_num + "호 태풍 " + typ_name + "에 관한 기상청 태풍정보 제 " + typ_par_main.tmSeq + "호]"
                // document.getElementById("typhoon_title").textContent = "음성 합성 기능 테스트를 위한 가상의 태풍정보입니다."
                }catch(error){

                }
                try{
                    document.getElementById('hou').textContent=` (제${typ_par_main.tmSeq}보)`
                }catch(error){

                }
                document.getElementById("typhoon_clock").textContent = year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분 발표"
                document.getElementById("typhoon_img").src = typ_par_main.img;
                document.getElementById("other").textContent = "○" + typ_par_main.other
                var beforerem = typ_par_main.rem;
                var afterrem = beforerem.split('|')
                document.getElementById("rem").textContent = "○" + afterrem[0] + " " + afterrem[1];
                try{
                    try{
                        document.getElementById('number').textContent = `태풍 제${typ_num}호 `
                    }catch(error){
                        
                    }
                    document.getElementById('typhoon_name').textContent = `${typ_par_main.typName}(${typ_par_main.typEn})`
                    document.getElementById('location').textContent = typ_par_main.typLoc;

                    
                    var lat, lon
                    if (typ_par_main.typLat < 0) {
                        lat = String(typ_par_main.typLat)
                        lat = lat.slice(1,)
                        lat = '남위 ' + typ_par_main.typLat + '도'
                    } else if (typ_par_main.typLat > 0) {
                        lat = typ_par_main.typLat
                        lat = '북위 ' + lat + '도'
                    }
                    if (typ_par_main.typLon < 0) {
                        lon = String(typ_par_main.typLon)
                        lon = lon.slice(1,)
                        lon = '서경 ' + lon + '도'
                    } else if (typ_par_main.typLon > 0) {
                        lon = typ_par_main.typLon
                        lon = '동경 ' + lon + '도'
                    }
                    document.getElementById('lat').textContent = `${lat}  ${lon}`

                    document.getElementById('movement').textContent = dir
                    document.getElementById('speed').textContent = typ_par_main.typSp
                    document.getElementById('pressure').textContent = typ_par_main.typPs
                    document.getElementById('wind_speed').textContent = typ_par_main.typWs
                    document.getElementById('dir-scale').textContent='이동방향 '
                    document.getElementById('speed-scale').textContent='이동속도 '
                    document.getElementById('speed-scale2').textContent='km/h'
                    if (typ_par_main.typ25==0){
                        typ25="--"
                    }else{
                        typ25=typ_par_main.typ25;
                    }
                    var strength
                    var strength_sty
                    if (typ_par_main.typWs >= 54){
                        strength ="초강력"
                        document.getElementById('strength').style = 'width:100px; text-align:center; border:1px solid; border-radius: 10px; padding:7px 0px; background-color:#7310ff; border-color: #7310ff; color:white;'
                    }else if(typ_par_main.typWs >= 45){
                        strength ="매우강"
                        document.getElementById('strength').style = 'width:100px; text-align:center; border:1px solid; border-radius: 10px; padding:7px 0px; background-color:#fe0000; border-color: #fe0000; color:white;'
                    }else if(typ_par_main.typWs >= 33){
                        strength ="강"
                        document.getElementById('strength').style = 'width:100px; text-align:center; border:1px solid; border-radius: 10px; padding:7px 0px; background-color:#fe8700; border-color: #fe8700; color:white;'
                    }else if(typ_par_main.typWs >= 25){
                        strength ="중"
                        document.getElementById('strength').style = 'width:100px; text-align:center; border:1px solid; border-radius: 10px; padding:7px 0px; background-color:#fad600; border-color: #fad600; color:black;'
                    }else{
                        strength="--"
                        document.getElementById('strength').style = 'width:100px; text-align:center; border:1px solid; border-radius: 10px; padding:7px 0px; background-color:#ffffff; border-color: #000000; color:black;'
                    }
                    console.log(strength)
                    document.getElementById('strength').textContent = strength;
                    document.getElementById('strong').textContent = typ_par_main.typ15
                    document.getElementById('strong-scale').textContent = '강풍반경 '
                    document.getElementById('strong-scale2').textContent = 'km'
                    document.getElementById('boufu').textContent = typ_par_main.typ25
                    document.getElementById('boufu-scale').textContent = '폭풍반경 '
                    document.getElementById('boufu-scale2').textContent = 'km'
                }catch(error){
                    console.log("이 페이지가 아닌가보오.")
                }
                function setVoiceList(){
                    voices = window.speechSynthesis.getVoices();
                }

                setVoiceList();
                window.speechSynthesis.onvoiceschanged = setVoiceList;

                function speak(text, opt_prop){
                    if(typeof SpeechSynthesisUtterance == 'undefined' || typeof window.speechSynthesis == 'undefined'){
                        alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
                        return;
                    }
                    var voices = window.speechSynthesis.getVoices();
                    var selectedVoice = voices.find(function(voice) {
                        return voice.name === 'Microsoft InJoon Online (Natural) - Korean (Korea)' && voice.lang === 'ko-KR';
                    });
                    window.speechSynthesis.cancel()

                    const prop = opt_prop || {}

                    const speechMsg = new SpeechSynthesisUtterance()
                    speechMsg.rate = prop.rate || 1;
                    speechMsg.pitch = prop.pitch || 1;
                    speechMsg.lang = prop.lang || 'ko-KR';
                    speechMsg.text = text
                    speechMsg.voice = selectedVoice

                    window.speechSynthesis.speak(speechMsg)
                }
                var text = ''
                console.log(strength)
                var gae =  "제 " + typ_num + "호 태풍 '" + typ_name + "'은(는) " + typ_par_main.typLoc + "에서 " + dir + "쪽을 향해 시속" + typ_par_main.typSp + "킬로미터의 속도로 이동중입니다";
                // if(strength == '--'){
                //     text = `${gae}. 태풍의 중심기압은 ${typ_par_main.typPs} 헥토파스칼이며, 중심 부근의 최대 풍속은 ${typ_par_main.typWs}미터 퍼 세컨드 입니다. 강풍반경은 ${typ_par_main.typ15}km, 폭풍반경은 ${typ_par_main.typ25}km입니다. 참고사항입니다. ${beforerem}. `
                // }else if(strength == '중'){
                //     text = `${gae}. 태풍의 중심기압은 ${typ_par_main.typPs} 헥토파스칼이며, 중심 부근의 최대 풍속은 ${typ_par_main.typWs}미터 퍼 세컨드로 강도는 중 입니다. 강풍반경은 ${typ_par_main.typ15}km, 폭풍반경은 ${typ_par_main.typ25}km입니다. 참고사항입니다. ${beforerem}. `
                // }else if(strength == '강'){
                //     text = `${gae}. 태풍의 중심기압은 ${typ_par_main.typPs} 헥토파스칼이며, 중심 부근의 최대 풍속은 ${typ_par_main.typWs}미터 퍼 세컨드로 강도는 강 입니다. 강풍반경은 ${typ_par_main.typ15}km, 폭풍반경은 ${typ_par_main.typ25}km입니다. 참고사항입니다. ${beforerem}. `
                // }else if(strength == '매우강'){
                //     text = `${gae}. 태풍의 중심기압은 ${typ_par_main.typPs} 헥토파스칼이며, 중심 부근의 최대 풍속은 ${typ_par_main.typWs}미터 퍼 세컨드로 강도는 매우강 입니다. 강풍반경은 ${typ_par_main.typ15}km, 폭풍반경은 ${typ_par_main.typ25}km입니다. 참고사항입니다. ${beforerem}. `
                // }else if(strength == '초강력'){
                //     text = `초강력 태풍 ${typ_name}에 대한 정보입니다. ${gae}. 태풍의 중심기압은 ${typ_par_main.typPs} 헥토파스칼이며, 중심 부근의 최대 풍속은 ${typ_par_main.typWs}미터 퍼 세컨드로 강도는 초강력 입니다. 강풍반경은 ${typ_par_main.typ15}km, 폭풍반경은 ${typ_par_main.typ25}km입니다. 참고사항입니다. ${beforerem}. `
                // }
                text = `${gae}. 태풍의 중심기압은 ${typ_par_main.typPs} 헥토파스칼이며, 중심 부근의 최대 풍속은 ${typ_par_main.typWs}미터 퍼 세컨드로 강도는 ${strength} 입니다. 강풍반경은 ${typ_par_main.typ15}km, 폭풍반경은 ${typ_par_main.typ25}km입니다. 참고사항입니다. ${beforerem}. `

                const btnread = document.getElementById('tts')
                "제 " + typ_num + "호 태풍 '" + typ_name + "'은(는) " + typ_par_main.typLoc + "에서 " + dir + "쪽을 향해 " + typ_par_main.typSp + "km/h의 속도로 이동중.";
                btnread.addEventListener("click", e =>{
                    speak(text, {
                        rate : 1.0,
                        pitch: 1.0,
                        lang: 'ko-KR'
                    })
                })
                document.getElementById('tts').addEventListener("click", function(){
                    alert('Microsoft Edge 브라우저로 접속하면 더욱 좋은 TTS를 이용하실 수 있습니다.')
                    alert(text)
                    text = ''
                })

            }else if(myObj.response.header.resultCode == "01"){
                document.getElementById('quake_title').textContent = "[01] 어플리케이션 에러 발생(APPLICATION_ERROR)"
            }else if(myObj.response.header.resultCode == "02"){
                document.getElementById('quake_title').textContent = "[02] 데이터베이스 에러 발생(DATABASE_ERROR)"
            }else if (myObj.response.header.resultCode == "03"){
                try{
                    document.getElementById('typhoon_title').textContent = "현재 발생하고 있는 태풍은 없습니다."
                }catch(error){
                }
            }else if (myObj.response.header.resultCode == "04"){
                document.getElementById('quake_title').textContent = "[04] HTTP 에러 발생(HTTP_ERROR)"
            }else if(myObj.response.header.resultCode == "05"){
                document.getElementById('quake_title').textContent = "[05] 서비스 연결 실패(SERVICETIME_OUT)"
            }else if(myObj.response.header.resultCode == "10"){
                document.getElementById('quake_title').textContent = "[10] 요청 파라메터가 잘못됨(INVALID_REQUEST_PARAMETER_ERROR)"
            }else if(myObj.response.header.resultCode == "11"){
                document.getElementById('quake_title').textContent = '[11] 필수 요청 파라메터가 없음(NO_MANDATORY_REQUEST_PARAMETER_ERROR)'
            }else if(myObj.response.header.resultCode == "12"){
                document.getElementById('quake_title').textContent = '[12] 해당 오픈API 서비스가 없거나 폐기됨(NO_OPENAPI_SERVICE_ERROR)'
            }else if(myObj.response.header.resultCode == "20"){
                document.getElementById('quake_title').textContent = '[20] 서비스 접근이 거부됨(SERVICE_ACCESS_DENIED_ERROR)'
            }else if(myObj.response.header.resultCode == "21"){
                document.getElementById('quake_title').textContent = '[21] 서비스 키를 일시적으로 사용할 수 없음(TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR)'
            }else if(myObj.response.header.resultCode == "22"){
                document.getElementById('quake_title').textContent = '[22] 서비스 요청 제한 횟수가 초과됨(LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR)'
            }else if(myObj.response.header.resultCode == "30"){
                document.getElementById('quake_title').textContent = '[30] 서비스 키가 등록되지 않음(SERVICE_KEY_IS_NOT_REGISTERED_ERROR)'
            }else if(myObj.response.header.resultCode == "31"){
                document.getElementById('quake_title').textContent = '[31] 서비스 키의 기한이 만료됨(DEADLINE_HAS_EXPIRED_ERROR)'
            }else if(myObj.response.header.resultCode == "32"){
                document.getElementById('quake_title').textContent = '[32] IP가 등록되지 않음(UNREGISTERED_IP_ERROR)'
            }else if(myObj.response.header.resultCode == "33"){
                document.getElementById('quake_title').textContent = '[33] 서명되지 않은 호출(UNSIGNED_CALL_ERROR)'
            }else if(myObj.response.header.resultCode == "99"){
                document.getElementById('quake_title').textContent = '[99] 기타 에러 발생(UNKNOWN_ERROR)'
            }else{
                document.getElementById('quake_title').textContent = '예외처리되지 않은 에러가 발생하였습니다'
            }
            // if() 
        }
    };
    xmlhttp.open("GET", api_url, true);
    xmlhttp.send();
    // console.log(api_url)
}
document.getElementById('next').addEventListener("click", function(plus){
    number=parseInt(number)+1;
    console.log(number);
    typhoon();
})
document.getElementById('before').addEventListener("click", function(minus){
    number=parseInt(number)-1;
    typhoon();
    console.log(number);
    if (number < 0) {
        alert("최신 태풍정보입니다.")
        number = 0;
    }
})