function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}

$(function () {
    areaSelectMaker("select[name=addressRegion]");
});

var areaSelectMaker = function (target) {
    if (target == null || $(target).length == 0) {
        console.warn("Unkwon Area Tag");
        return;
    }

    var area = {
        "수도권": {
            "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
            "경기도": ["수원시 장안구", "수원시 권선구", "수원시 팔달구", "수원시 영통구", "성남시 수정구", "성남시 중원구", "성남시 분당구", "의정부시", "안양시 만안구", "안양시 동안구", "부천시", "광명시", "평택시", "동두천시", "안산시 상록구", "안산시 단원구", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시 처인구", "용인시 기흥구", "용인시 수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
            "인천광역시": ["계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군"]
        },
        "강원권": {
            "강원도": ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"]
        },
        "충청권": {
            "충청북도": ["청주시 상당구", "청주시 서원구", "청주시 흥덕구", "청주시 청원구", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
            "충청남도": ["천안시 동남구", "천안시 서북구", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
            "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
            "세종특별자치시": ["세종특별자치시"]
        },
        "전라권": {
            "전라북도": ["전주시 완산구", "전주시 덕진구", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
            "전라남도": ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
            "광주광역시": ["광산구", "남구", "동구", "북구", "서구"]
        },
        "경상권": {
            "경상북도": ["포항시 남구", "포항시 북구", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
            "경상남도": ["창원시 의창구", "창원시 성산구", "창원시 마산합포구", "창원시 마산회원구", "창원시 진해구", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
            "부산광역시": ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"],
            "대구광역시": ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
            "울산광역시": ["남구", "동구", "북구", "중구", "울주군"]
        },
        "제주권": {
            "제주특별자치도": ["서귀포시", "제주시"]
        }
    };

    for (i = 0; i < $(target).length; i++) {
        (function (z) {
            var a1 = $(target).eq(z);
            var a2 = a1.next();
            var a3 = a2.next();

            //초기화
            init(a1, true);

            //권역 기본 생성
            var areaKeys1 = Object.keys(area);
            areaKeys1.forEach(function (Region) {
                a1.append("<option value=" + Region + ">" + Region + "</option>");
            });

            //변경 이벤트
            $(a1).on("change", function () {
                init($(this), false);
                var Region = $(this).val();
                var keys = Object.keys(area[Region]);
                keys.forEach(function (Do) {
                    a2.append("<option value=" + Do + ">" + Do + "</option>");
                });
            });

            $(a2).on("change", function () {
                a3.empty().append("<option value=''>선택</option>");
                var Region = a1.val();
                var Do = $(this).val();
                var keys = Object.keys(area[Region][Do]);
                keys.forEach(function (SiGunGu) {
                    a3.append("<option value='" + area[Region][Do][SiGunGu] + "'>" + area[Region][Do][SiGunGu] + "</option>");
                });
            });
        })(i);

        function init(t, first) {
            first ? t.empty().append("<option value=''>선택</option>") : "";
            t.next().empty().append("<option value=''>선택</option>");
            t.next().next().empty().append("<option value=''>선택</option>");
        }
    }
}
document.getElementById('confirm_btn').addEventListener("click", function () {
    console.log(document.getElementById('addressRegion1').value);
    console.log(document.getElementById('addressDo1').value);
    console.log(document.getElementById('addressSiGunGu1').value);
    document.getElementById('location').textContent = `지금, ${document.getElementById('addressDo1').value} ${document.getElementById('addressSiGunGu1').value}의 날씨는`;

    //주소 -> 좌표
    var x = 0;
    var y = 0;
    var address = document.getElementById('addressSiGunGu1').value;
    if (document.getElementById('addressDo1').value == '서울특별시') {
        switch (address) {
            case '종로구':
            case '중구':
                x = 60;
                y = 127;
                break;
            case '용산구':
                x = 60;
                y = 126;
                break;
            case '성동구':
            case '동대문구':
                x = 61;
                y = 127;
                break;
            case '광진구':
                x = 62;
                y = 126;
                break;
            case '중랑구':
                x = 62;
                y = 128;
                break;
            case '성북구':
            case '강북구':
                x = 61;
                y = 128;
                break;
            case '도봉구':
            case '노원구':
                x = 61;
                y = 129;
                break;
            case '은평구':
                x = 59;
                y = 127;
                break;
            case '서대문구':
                x = 59;
                y = 127;
                break;
            case '마포구':
                x = 59;
                y = 126;
                break;
            case '양천구':
                x = 58;
                y = 126;
                break;
            case '강서구':
                x = 57;
                y = 127;
                break;
            case '구로구':
                x = 58;
                y = 125;
                break;
            case '금천구':
                x = 58;
                y = 124;
                break;
            case '영등포구':
                x = 59;
                y = 126;
                break;
            case '동작구':
            case '관악구':
                x = 59;
                y = 125;
                break;
            case '서초구':
                x = 60;
                y = 125;
                break;
            case '강남구':
                x = 61;
                y = 125;
                break;
            case '송파구':
                x = 62;
                y = 125;
                break;
            case '강동구':
                x = 62;
                y = 126;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '부산광역시') {
        switch (address) {
            case '중구':
            case '서구':
                x = 97;
                y = 74;
                break;
            case '동구':
                x = 97;
                y = 75;
                break;
            case '영도구':
                x = 98;
                y = 74;
                break;
            case '부산진구':
                x = 97;
                y = 75;
                break;
            case '동래구':
                x = 98;
                y = 77;
                break;
            case '남구':
                x = 98;
                y = 75;
                break;
            case '북구':
                x = 97;
                y = 76;
                break;
            case '해운대구':
                x = 99;
                y = 76;
                break;
            case '사하구':
                x = 96;
                y = 73;
                break;
            case '금정구':
                x = 98;
                y = 77;
                break;
            case '강서구':
                x = 95;
                y = 74;
                break;
            case '연제구':
                x = 98;
                y = 76;
                break;
            case '수영구':
                x = 99;
                y = 75;
                break;
            case '사상구':
                x = 97;
                y = 75;
                break;
            case '기장군':
                x = 100;
                y = 78;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '대구광역시') {
        switch (address) {
            case '중구':
                x = 89;
                y = 90;
                break;
            case '동구':
                x = 90;
                y = 91;
                break;
            case '서구':
                x = 88;
                y = 90;
                break;
            case '남구':
            case '수성구':
                x = 89;
                y = 90;
                break;
            case '북구':
                x = 90;
                y = 91;
                break;
            case '달서구':
                x = 87;
                y = 90;
                break;
            case '달성군':
                x = 88;
                y = 88;
        }
    } else if (document.getElementById('addressDo1').value == '인천광역시') {

    }
    //API
    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(getToday()); /**/
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0600'); /**/
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(url + queryParams);
            try {
                var loaded = JSON.parse(this.responseText);
            } catch (error) {


                document.getElementById('location').textContent = '에러 발생.'
            }
            if (loaded.response.header.resultCode = "00") {
                var main = loaded.response.body.items.item;

                //현재 기온
                document.getElementById('now_temp').textContent = loaded.response.body.items.item[3].obsrValue;
                //1시간 강수량
                document.getElementById('now_rain').textContent = loaded.response.body.items.item[2].obsrValue;
                //습도
                document.getElementById('now_humid').textContent = loaded.response.body.items.item[1].obsrValue;
                // 바람
                var wind_dir = "NaN";
                if (loaded.response.body.items.item[1].obsrValue >= 0 || loaded.response.body.items.item[1].obsrValue < 45) {
                    wind_dir = "북-북동"
                } else if (loaded.response.body.items.item[1].obsrValue >= 45 || loaded.response.body.items.item[1].obsrValue < 90) {
                    wind_dir = "북동-동"
                } else if (loaded.response.body.items.item[1].obsrValue >= 90 || loaded.response.body.items.item[1].obsrValue < 135) {
                    wind_dir = "동-남동"
                } else if (loaded.response.body.items.item[1].obsrValue >= 135 || loaded.response.body.items.item[1].obsrValue < 180) {
                    wind_dir = "남동-남"
                } else if (loaded.response.body.items.item[1].obsrValue >= 180 || loaded.response.body.items.item[1].obsrValue < 225) {
                    wind_dir = "남-남서"
                } else if (loaded.response.body.items.item[1].obsrValue >= 225 || loaded.response.body.items.item[1].obsrValue < 270) {
                    wind_dir = "남서-서"
                } else if (loaded.response.body.items.item[1].obsrValue >= 270 || loaded.response.body.items.item[1].obsrValue < 315) {
                    wind_dir = "서-북서"
                } else if (loaded.response.body.items.item[1].obsrValue >= 315 || loaded.response.body.items.item[1].obsrValue <= 360) {
                    wind_dir = "북서-북"
                } else {
                    wind_dir = "몰?루"
                }
                document.getElementById('now_wind_dir').textContent = wind_dir;
                document.getElementById('now_wind_str').textContent = loaded.response.body.items.item[7].obsrValue;

                //그래프
                var now_temp = parseFloat(loaded.response.body.items.item[3].obsrValue)
                console.log(now_temp)
                var now = [3, now_temp, 20.0];
                try{
                    document.getElementById("now_weather_Chart").remove()
                }catch(error){
                    console.log('지울게 없습니다.')
                }
                if(window.chartObj !=undefined){
                    window.chartObj.destroy();
                }
                window.chartObj = new Chart(document.getElementById("now_weather_Chart"), {
                    type: 'bar',
                    data: {
                        labels: ["최고기온", "현재기온", "최고기온"],
                        datasets: [
                            {
                                label: "℃ ",
                                backgroundColor: ["rgb(44, 165, 203)", "#111111", "rgb(219, 69, 73)"],
                                data: now
                            }
                        ]
                    },
                    options: {
                        legend: { display: false },
                        title: {
                            display: false,
                            text: '기온'
                        }
                    }
                });
            }
        }
    };

    xhr.send('');
})

