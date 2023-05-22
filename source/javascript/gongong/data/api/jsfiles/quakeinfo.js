var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}
var url = 'http://apis.data.go.kr/1360000/EqkInfoService/getEqkMsg';
var earthquake_json = {
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
                        "cnt": 1,
                        "fcTp": 3,
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_3_20221029082749.png",
                        "inT": "최대진도 Ⅴ(충북),Ⅳ(경북),Ⅲ(강원,경기,대전)",
                        "lat": 36.88,
                        "loc": "충북 괴산군 북동쪽 11km 지역",
                        "lon": 127.88,
                        "mt": 4.1,
                        "rem": "지진 발생 인근 지역은 지진동을 느낄 수 있음. 안전에 유의하기 바람.",
                        "stnId": 108,
                        "tmEqk": 20221029082749,
                        "tmFc": 202210290835,
                        "tmSeq": 1070,
                        "dep": 13
                    },
                    {
                        "cnt": 1,
                        "fcTp": 3,
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_3_20221029082733.png",
                        "inT": "최대진도 Ⅴ(충북),Ⅳ(경북),Ⅲ(강원,경기,대전)",
                        "lat": 36.88,
                        "loc": "충북 괴산군 북동쪽 11km 지역",
                        "lon": 127.88,
                        "mt": 3.5,
                        "rem": "지진 발생 인근 지역은 지진동을 느낄 수 있음. 안전에 유의하기 바람.",
                        "stnId": 108,
                        "tmEqk": 20221029082733,
                        "tmFc": 202210290830,
                        "tmSeq": 1068,
                        "dep": 13
                    },
                    {
                        "cnt": 1,
                        "fcTp": 14,
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_14_20221029082749.png",
                        "inT": "최대진도 Ⅴ(충북),Ⅳ(강원,경북),Ⅲ(경기,대전,서울,세종,충남)",
                        "lat": 36.88,
                        "loc": "충북 괴산군 북동쪽 12km 지역",
                        "lon": 127.89,
                        "mt": 4.3,
                        "rem": "위 정보는 이동속도가 빠른 지진파(P파)만을 이용하여 자동 추정한 정보임.\n수동으로 분석한 정보는 지진정보로 추가 발표할 예정임",
                        "stnId": 108,
                        "tmEqk": 20221029082749,
                        "tmFc": 202210290828,
                        "tmSeq": 1067,
                        "dep": 0
                    },
                    {
                        "cnt": 1,
                        "fcTp": 14,
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_14_20221029082733.png",
                        "inT": "최대진도 Ⅳ(충북),Ⅲ(경북),Ⅱ(강원,경기,대전,세종,충남)",
                        "lat": 36.88,
                        "loc": "충북 괴산군 북동쪽 11km 지역",
                        "lon": 127.88,
                        "mt": 3.5,
                        "rem": "위 정보는 이동속도가 빠른 지진파(P파)만을 이용하여 자동 추정한 정보임.\n수동으로 분석한 정보는 지진정보로 추가 발표할 예정임",
                        "stnId": 108,
                        "tmEqk": 20221029082733,
                        "tmFc": 202210290827,
                        "tmSeq": 1066,
                        "dep": 0
                    },
                    {
                        "cnt": 1, 
                        "fcTp": 2, 
                        "img": "http://www.weather.go.kr/w/repositary/image/eqk/img/eqk_img_2_20221123100814.png", 
                        "inT": "", 
                        "lat": 40.84, 
                        "loc": "터키 아다파자리 동쪽 48km 지역", 
                        "lon": 30.97, 
                        "mt": 8.2, 
                        "rem": "국내영향없음. 위 자료는 미지질조사소(USGS) 분석결과임.", 
                        "stnId": 108, 
                        "tmEqk": 20221123100814, 
                        "tmFc": 202211231027, 
                        "tmSeq": 1166, 
                        "dep": 4 
                    }
                ]
            },
            "pageNo": 1,
            "numOfRows": 10,
            "totalCount": 4
        }
    }
}
// API URL 구하기
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
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
queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(twoago_year + twoago_month + twoago_date); /**/
queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        try {
            var myObj = JSON.parse(this.responseText);
            // var myObj = earthquake_json;
        } catch (error) {
            document.getElementById('quake_title').textContent = "예상치 못한 오류가 발생했습니다."
        }
        if (myObj.response.header.resultCode == "00") {
            try {
                document.getElementById('quake_info').style.display = 'block';
                document.getElementById('quake_info_br').style.display = 'block';
            } catch (error) {

            }
            var quakeinfo = myObj.response.body.items.item[2];
            //발생 시각 구하기
            var yyyymmdd = String(quakeinfo.tmEqk);
            var year = yyyymmdd.slice(0, 4);
            var month = yyyymmdd.slice(4, 6);
            var date = yyyymmdd.slice(6, 8);
            var hour = yyyymmdd.slice(8, 10);
            var minute = yyyymmdd.slice(10, 12);
            var sec = yyyymmdd.slice(12, 14);
            document.getElementById('quake_time').textContent = year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분 " + sec + "초";
            try {
                //타이틀
                var intensity_color = quakeinfo.inT
                intensity_color = intensity_color[5]
                var int_info
                if (quakeinfo.fcTp == 2) {
                    //국외지진정보
                    if (quakeinfo.mt >= 8.0) {
                        document.getElementById('quake_title').textContent = '해외에서 거대지진이 발생했습니다.'
                        document.getElementById('quake_title').style = 'background-color: red; color:yellow; text-align:center';
                    } else if (quakeinfo.mt >= 7.0) {
                        document.getElementById('quake_title').textContent = '해외에서 매우 강한 지진이 발생했습니다.'
                        document.getElementById('quake_title').style = 'background-color: yellow; color:black; text-align:center';
                    } else if (quakeinfo.mt >= 6.0) {
                        document.getElementById('quake_title').textContent = '해외에서 강한 지진이 발생했습니다.'
                    } else {
                        document.getElementById('quake_title').textContent = '해외에서 지진이 발생했습니다.'
                    }
                    //진도 예외 처리
                    int_info = "국외지진정보는 최대진도 정보가 제공되지 않습니다"
                    document.getElementById('intensity').textContent = int_info
                    try {
                        document.getElementById('int').style = 'background-color:white;'
                        document.getElementById('quake_img').src = quakeinfo.img
                        document.getElementById('mag-m').textContent = 'M'
                        if((quakeinfo.loc).includes('일본')){
                            document.getElementById('mag-l').textContent = 'j'
                        }else if((quakeinfo.loc).includes('대만')){
                            document.getElementById('mag-l').textContent = 'L'
                        }else{
                            document.getElementById('mag-l').textContent = 'w'
                        }
                        document.getElementById('info_kind').textContent = '지진정보 > 국외지진정보'
                    } catch (error) {
                        document.getElementById('quake_img').src = quakeinfo.img

                    }
                } else if (quakeinfo.fcTp == 3 || quakeinfo.fcTp == 5) {
                    //국내지진정보 || 국내지진정보 재통보
                    if (quakeinfo.mt >= 5.0) {
                        document.getElementById('quake_title').textContent = '규모 5.0 이상의 매우 강한 지진이 발생했습니다.'
                        document.getElementById('quake_title').style = 'background-color: red; color:yellow; text-align:center';
                    } else if (quakeinfo.mt >= 4.0) {
                        document.getElementById('quake_title').textContent = '규모 4.0 이상의 강한 지진이 발생했습니다.'
                        document.getElementById('quake_title').style = 'background-color: orange; color:black; text-align:center';
                    } else if (quakeinfo.mt >= 3.0) {
                        document.getElementById('quake_title').textContent = '규모 3.0 이상의 약간 강한 지진이 발생했습니다.'
                        document.getElementById('quake_title').style = 'background-color: yellow; color:black; text-align:center';
                    } else if (quakeinfo.mt >= 2.0) {
                        document.getElementById('quake_title').textContent = '규모 2.0 이상의 지진이 발생했습니다.'
                    } else {
                        document.getElementById('quake_title').textContent = '국내에서 지진이 발생했습니다.'
                    }
                    int_info = (quakeinfo.inT).slice(5,)
                    document.getElementById('intensity').textContent = int_info
                    var tongbo = '/i_'
                    int_info = quakeinfo.inT
                    try{
                        document.getElementById('info_kind').textContent = '지진정보 > 지진정보'
                    }catch(error){
                    }
                } else if (quakeinfo.fcTp == 14) {
                    document.getElementById('quake_title').textContent = '지진속보 발표. 흔들림에 대비.';
                    document.getElementById('quake_title').style = 'background-color: yellow; color:black; text-align:center;';
                    int_info = (quakeinfo.inT).slice(5,)
                    document.getElementById('intensity').textContent = int_info
                    int_info = quakeinfo.inT
                    try{
                        document.getElementById('info_kind').textContent = '지진속보 > 지진속보'
                    }catch(error){
                    }
                } else if (quakeinfo.fcTp == 11 || quakeinfo.fcTp == 13 || quakeinfo.fcTp == 12) {
                    document.getElementById('quake_title').textContent = '지진조기경보 발표. 흔들림에 경계.';
                    document.getElementById('quake_title').style = 'background-color: red; color:yellow; text-align:center;';
                    int_info = (quakeinfo.inT).slice(5,)
                    document.getElementById('intensity').textContent = int_info
                    int_info = quakeinfo.inT
                    try{
                        document.getElementById('info_kind').textContent = '지진속보 > 지진조기경보'
                    }catch(error){
                    }
                }
                if (quakeinfo.fcTp == 11 || quakeinfo.fcTp == 13 || quakeinfo.fcTp == 12 || quakeinfo.fcTp == 14) {
                    document.getElementById('kma').textContent = '기상청 실시간 지진감시'
                    document.getElementById('kma').href = 'https://www.weather.go.kr/pews/'
                    document.getElementById('dep').style.display = 'none'
                    document.getElementById('magbox').style = 'width:100%;'
                    var tongbo = '/e_'
                }
                if (quakeinfo.fcTp == 11 || quakeinfo.fcTp == 13 || quakeinfo.fcTp == 12 || quakeinfo.fcTp == 14 || quakeinfo.fcTp == 3 || quakeinfo.fcTp == 5) {
                    try {
                        document.getElementById('int_exp_title').textContent = '진도 등급별 현상'
                        if (intensity_color == 'Ⅰ') {
                            document.getElementById('int').style = 'background-color:#fff';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '대부분 사람들은 느낄 수 없으나, 지진계에는 기록된다.'
                        } else if (intensity_color == 'Ⅱ') {
                            document.getElementById('int').style = 'background-color:#a0e6ff';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '조용한 상태나 건물 위층에 있는 소수의 사람만 느낀다.'
                        } else if (intensity_color == 'Ⅲ') {
                            document.getElementById('int').style = 'background-color:#92d050';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '실내, 특히 건물 위층에 있는 사람이 현저하게 느끼며, 정지하고 있는 차가 약간 흔들린다.'
                        } else if (intensity_color == 'Ⅳ') {
                            document.getElementById('int').style = 'background-color:#ffff00';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '실내에서 많은 사람이 느끼고, 밤에는 잠에서 깨기도 하며, 그릇과 창문 등이 흔들린다.'
                        } else if (intensity_color == 'Ⅴ') {
                            document.getElementById('int').style = 'background-color:#ffc000';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '거의 모든 사람이 진동을 느끼고, 그릇, 창문 등이 깨지기도 하며, 불안정한 물체는 넘어진다.'
                        } else if (intensity_color == 'Ⅵ') {
                            document.getElementById('int').style = 'background-color:#ff0000; color:white;';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '모든 사람이 느끼고, 일부 무거운 가구가 움직이며, 벽의 석회가 떨어지기도 한다.'
                        } else if (intensity_color == 'Ⅶ') {
                            document.getElementById('int').style = 'background-color:#a32777; color:white;';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '일반 건물에 약간의 피해가 발생하며, 부실한 건물에는 상당한 피해가 발생한다.'
                        } else if (intensity_color == 'Ⅷ') {
                            document.getElementById('int').style = 'background-color:#632523; color:white;';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '일반 건물에 부분적 붕괴 등 상당한 피해가 발생하며, 부실한 건물에는 심각한 피해가 발생한다.'
                        } else if (intensity_color == 'Ⅸ') {
                            document.getElementById('int').style = 'background-color:#4c2600; color:white';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '잘 설계된 건물에도 상당한 피해가 발생하며, 일반 건축물에는 붕괴 등 큰 피해가 발생한다.'
                        } else if (intensity_color == 'Ⅹ') {
                            document.getElementById('int').style = 'background-color:#000; color:white;';
                            document.getElementById('max_int').style = 'color:#fff';
                            document.getElementById('intensity').style = 'color:#fff';
                            document.getElementById('int_exp_int').textContent = intensity_color;
                            document.getElementById('int_exp_exp').textContent = '대부분의 석조 및 골조 건물이 파괴되고, 기차선로가 휘어진다.'
                        } else {
                            document.getElementById('int').style = 'background-color:#fff'
                        }
                        if (intensity_color == 'Ⅰ') {
                            var img= quakeinfo.img;
                        }else{
                            var img = 'https://www.weather.go.kr/w/repositary/DATA/EQK/INTENSITY/' + year + month + '/' + date + tongbo + quakeinfo.fcTp + '_' + yyyymmdd + '.png'
                        }
                        document.getElementById('quake_img').src = img
                        document.getElementById('mag-m').textContent = 'M'
                        document.getElementById('mag-l').textContent = 'L'
                    } catch (error) {
                        document.getElementById('quake_img').src = quakeinfo.img
                    }
                }
                try {
                    document.getElementById('max_int').textContent = '최대진도'
                } catch (error) { }
                //
                document.getElementById('quake_location').textContent = quakeinfo.loc;
                var g_lat, g_lon = '0'
                try {
                    if (quakeinfo.lat < 0) {
                        lat = String(quakeinfo.lat)
                        lat = lat.slice(1,)
                        document.getElementById('lat').textContent = '남위 ' + lat + '도'
                        g_lat = '-'+lat
                    } else if (quakeinfo.lat > 0) {
                        lat = quakeinfo.lat
                        document.getElementById('lat').textContent = '북위 ' + lat + '도'
                        g_lat = lat
                    }
                    if (quakeinfo.lon < 0) {
                        lon = String(quakeinfo.lon)
                        lon = lon.slice(1,)
                        document.getElementById('lon').textContent = '서경 ' + lon + '도'
                        g_lon = '-' + lon
                    } else if (quakeinfo.lon > 0) {
                        lon = quakeinfo.lon
                        document.getElementById('lon').textContent = '동경 ' + lon + '도'
                        g_lon = lon
                    }
                    document.getElementById('googlemap').src= `https://www.google.com/maps/embed/v1/place?q=${g_lat},${g_lon}&zoom=8&key=AIzaSyBQgB3o1gm_rKSDffaobjw4fgGxiGrx39I`
                } catch (error) {
                    console.log(error)
                }

                //규모 처리
                var mag = String(quakeinfo.mt)
                if (mag.length == 1) {
                    document.getElementById('magnitude').textContent = quakeinfo.mt + ".0"
                } else {
                    document.getElementById('magnitude').textContent = quakeinfo.mt
                }

                //깊이 처리
                if (quakeinfo.dep == 0) {
                    document.getElementById('depth').textContent = "5"
                    document.getElementById('dep-asdf').textContent = 'km 미만';
                } else {
                    document.getElementById('depth').textContent = quakeinfo.dep;
                    document.getElementById('dep-asdf').textContent = 'km';
                }
                try {
                    document.getElementById('dep-scale').textContent = '깊이 '
                    document.getElementById('mag-scale').textContent = '규모 '
                } catch (error) {

                }


                //참고사항
                document.getElementById('quake_rem').textContent = quakeinfo.rem;

                try {
                    height = img.height
                    document.getElementById('qcontent').style = 'height:height'
                } catch (error) {

                }
            } catch (error) {
                document.getElementById('quake_rem').textContent = quakeinfo.rem;
                document.getElementById('quake_location').textContent = quakeinfo.loc;
                var mag = quakeinfo.mt
                if (mag.length == 1) {
                    document.getElementById('magnitude').textContent = quakeinfo.mt + ".0"
                } else {
                    document.getElementById('magnitude').textContent = quakeinfo.mt
                }
                document.getElementById('depth').textContent = '--km'
                document.getElementById('quake_img').src = quakeinfo.img

            }
            try{
                document.getElementById('map1').addEventListener("click",function(){
                    document.getElementById('quake_img').style='; margin:0px; '
                    document.getElementById('googlemap').style='display:none'
                    document.getElementById('map2').style='background-color: #cbcbcb;'
                    document.getElementById('map1').style='background-color: #ffffff;'
                })
                document.getElementById('map2').addEventListener("click",function(){
                    document.getElementById('googlemap').style='display:block; margin-bottom: 4px;'
                    document.getElementById('quake_img').style='display:none'
                    document.getElementById('map1').style='background-color: #cbcbcb;'
                    document.getElementById('map2').style='background-color: #ffffff;'
                    document.getElementById('googlemap').src= `https://www.google.com/maps/embed/v1/place?q=${g_lat},${g_lon}&zoom=8&key=AIzaSyBQgB3o1gm_rKSDffaobjw4fgGxiGrx39I`
                })
            }catch(error){

            }

            var userAgent = navigator.userAgent;
            
            function setVoiceList() {
                voices = window.speechSynthesis.getVoices();
            }
            
            setVoiceList();
            window.speechSynthesis.onvoiceschanged = setVoiceList;

            function speak(text, opt_prop) {
                if (typeof SpeechSynthesisUtterance == 'undefined' || typeof window.speechSynthesis == 'undefined') {
                    alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
                    return;
                }
                var voices = window.speechSynthesis.getVoices();
                console.log(voices)
                var selectedVoice = voices.find(function(voice) {
                    return voice.name === 'Microsoft InJoon Online (Natural) - Korean (Korea)' && voice.lang === 'ko-KR';
                });
                window.speechSynthesis.cancel()

                const prop = opt_prop || {}

                const speechMsg = new SpeechSynthesisUtterance()
                speechMsg.rate = prop.rate || 1;
                speechMsg.pitch = prop.pitch || 1;
                speechMsg.lang = prop.lang || 'ko-KR'
                speechMsg.text = text
                speechMsg.voice = selectedVoice

                window.speechSynthesis.speak(speechMsg)
            }

            var int = int_info
            int = int.replace('Ⅰ', '진도 1')
            int = int.replace('Ⅱ', '진도 2가')
            int = int.replace('Ⅲ', '진도 3이')
            int = int.replace('Ⅳ', '진도 4가')
            int = int.replace('Ⅴ', '진도 5가')
            int = int.replace('Ⅵ', '진도 6이')
            int = int.replace('Ⅶ', '진도 7이')
            int = int.replace('Ⅷ', '진도 8이')
            int = int.replace('Ⅸ', '진도 9가')
            int = int.replace('Ⅹ', '진도 10 이상이')
            if (quakeinfo.fcTp == 2) {
                int = int_info
            } else {
                int += '입니다'
            }
            var dept
            if (quakeinfo.dep == 0) {
                dept = "5km 미만"
            }else{
                dept = quakeinfo.dep + "km"
            }
            // console.log(int_info)
            const text = `${month}월 ${date}일 ${hour}시 ${minute}분 경, ${quakeinfo.loc}에서 지진이 발생했습니다. 지진의 규모는 ${quakeinfo.mt}, 진원의 깊이는 ${dept} 입니다. 진도정보입니다. ${int}. 참고사항입니다. ${quakeinfo.rem}`
            const btnread = document.getElementById('tts')
            btnread.addEventListener("click", e => {
                speak(text, {
                    rate: 1.0,
                    pitch: 1.0,
                    lang: 'ko-KR'
                })
            })
            document.getElementById('tts').addEventListener("click", function(){
                alert('Microsoft Edge 브라우저로 접속하면 더욱 좋은 TTS를 이용하실 수 있습니다.')
                alert(text)
            })
        } else if (myObj.response.header.resultCode == "01") {
            document.getElementById('quake_title').textContent = "[01] 어플리케이션 에러 발생(APPLICATION_ERROR)"
        } else if (myObj.response.header.resultCode == "02") {
            document.getElementById('quake_title').textContent = "[02] 데이터베이스 에러 발생(DATABASE_ERROR)"
        } else if (myObj.response.header.resultCode == "03") {
            try {
                document.getElementById('quake_title').textContent = "최근 3일간 발표된 지진정보는 없습니다."
            } catch (error) {
            }
        } else if (myObj.response.header.resultCode == "04") {
            document.getElementById('quake_title').textContent = "[04] HTTP 에러 발생(HTTP_ERROR)"
        } else if (myObj.response.header.resultCode == "05") {
            document.getElementById('quake_title').textContent = "[05] 서비스 연결 실패(SERVICETIME_OUT)"
        } else if (myObj.response.header.resultCode == "10") {
            document.getElementById('quake_title').textContent = "[10] 요청 파라메터가 잘못됨(INVALID_REQUEST_PARAMETER_ERROR)"
        } else if (myObj.response.header.resultCode == "11") {
            document.getElementById('quake_title').textContent = '[11] 필수 요청 파라메터가 없음(NO_MANDATORY_REQUEST_PARAMETER_ERROR)'
        } else if (myObj.response.header.resultCode == "12") {
            document.getElementById('quake_title').textContent = '[12] 해당 오픈API 서비스가 없거나 폐기됨(NO_OPENAPI_SERVICE_ERROR)'
        } else if (myObj.response.header.resultCode == "20") {
            document.getElementById('quake_title').textContent = '[20] 서비스 접근이 거부됨(SERVICE_ACCESS_DENIED_ERROR)'
        } else if (myObj.response.header.resultCode == "21") {
            document.getElementById('quake_title').textContent = '[21] 서비스 키를 일시적으로 사용할 수 없음(TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR)'
        } else if (myObj.response.header.resultCode == "22") {
            document.getElementById('quake_title').textContent = '[22] 서비스 요청 제한 횟수가 초과됨(LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR)'
        } else if (myObj.response.header.resultCode == "30") {
            document.getElementById('quake_title').textContent = '[30] 서비스 키가 등록되지 않음(SERVICE_KEY_IS_NOT_REGISTERED_ERROR)'
        } else if (myObj.response.header.resultCode == "31") {
            document.getElementById('quake_title').textContent = '[31] 서비스 키의 기한이 만료됨(DEADLINE_HAS_EXPIRED_ERROR)'
        } else if (myObj.response.header.resultCode == "32") {
            document.getElementById('quake_title').textContent = '[32] IP가 등록되지 않음(UNREGISTERED_IP_ERROR)'
        } else if (myObj.response.header.resultCode == "33") {
            document.getElementById('quake_title').textContent = '[33] 서명되지 않은 호출(UNSIGNED_CALL_ERROR)'
        } else if (myObj.response.header.resultCode == "99") {
            document.getElementById('quake_title').textContent = '[99] 기타 에러 발생(UNKNOWN_ERROR)'
        } else {
            document.getElementById('quake_title').textContent = '예외처리되지 않은 에러가 발생하였습니다'
        }
    }
};
xhr.send('');
console.log(url + queryParams)