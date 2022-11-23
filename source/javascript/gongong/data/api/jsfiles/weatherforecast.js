function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}
let today = new Date();
hours = today.getHours();
hours = hours - 1;
hours = String(hours);
// console.log(hours);
if (hours.length == 1) {
    hours = "0" + hours + "00"
} else {
    hours = hours + "00"
}


var now_chart = new Chart(document.getElementById("now_weather_Chart"), {
    type: 'bar',
    data: {
        labels: ["최저기온", "현재기온", "최고기온"],
        datasets: [
            {
                label: "℃ ",
                backgroundColor: ["rgb(44, 165, 203)", "#FFFF99", "rgb(219, 69, 73)"],
                data: [0, 0, 0]
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: { display: false },
        title: {
            display: false,
            text: '기온'
        }
    }
});

$(function () {
    areaSelectMaker("select[name=addressRegion]");
});

var main;

var areaSelectMaker = function (target) {
    if (target == null || $(target).length == 0) {
        console.warn("Unkwon Area Tag");
        return;
    }

    var area = {
        "수도권": {
            "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
            "경기도": ["수원시 장안구", "수원시 권선구", "수원시 팔달구", "수원시 영통구", "성남시 수정구", "성남시 중원구", "성남시 분당구", "의정부시", "안양시 만안구", "안양시 동안구", "부천시", "광명시", "평택시", "동두천시", "안산시 상록구", "안산시 단원구", "고양시 덕양구", "고양시 일산동구", "고양시 일산서구", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시 처인구", "용인시 기흥구", "용인시 수지구", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
            "인천광역시": ["계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "중구", "강화군", "옹진군 백령면", "옹진군 연평면", '옹진군']
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
            "경상북도": ["포항시 남구", "포항시 북구", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군", "독도"],
            "경상남도": ["창원시 의창구", "창원시 성산구", "창원시 마산합포구", "창원시 마산회원구", "창원시 진해구", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
            "부산광역시": ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구", "기장군"],
            "대구광역시": ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
            "울산광역시": ["남구", "동구", "북구", "중구", "울주군"]
        },
        "제주권": {
            "제주특별자치도": ["서귀포시", "제주시", "이어도"]
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
    // document.getElementById('weather').style.display ='block'
    // document.getElementById('now_weather_Chart').style.display ='block'
    // console.log(document.getElementById('addressRegion1').value);
    // console.log(document.getElementById('addressDo1').value);
    // console.log(document.getElementById('addressSiGunGu1').value);
    document.getElementById('location').textContent = `${document.getElementById('addressDo1').value} ${document.getElementById('addressSiGunGu1').value}의 날씨`;

    //주소 -> 좌표
    var x = 0;
    var y = 0;
    var area_code = 0
    var address = document.getElementById('addressSiGunGu1').value;
    if (document.getElementById('addressDo1').value == '서울특별시') {
        area_code = 109
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
            default:
                x = 60;
                y = 127;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '부산광역시') {
        area_code = 159
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
            default:
                x = 98;
                y = 76;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '대구광역시') {
        area_code = 143
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
                break;
            default:
                x = 89;
                y = 90;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '인천광역시') {
        area_code = 109
        switch (address) {
            case '중구':
                x = 53;
                y = 125;
                break;
            case '동구':
                x = 54;
                y = 125;
                break;
            case '미추홀구':
                x = 55;
                y = 124;
                break;
            case '연수구':
                x = 55;
                y = 123;
                break;
            case '남동구':
                x = 56;
                y = 124;
                break;
            case '부평구':
                x = 55;
                y = 125;
                break;
            case '계양구':
                x = 56;
                y = 126;
                break;
            case '서구':
                x = 55;
                y = 125;
                break;
            case '강화군':
                x = 50;
                y = 130;
                break;
            case '옹진군':
                x = 50;
                y = 120;
                break;
            case '옹진군 연평면':
                x = 38;
                y = 129;
                break;
            case '옹진군 백령면':
                x = 21;
                y = 135;
                break;
            default:
                x = 55;
                y = 124;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '광주광역시') {
        area_code = 156
        switch (address) {
            case '동구':
                x = 60;
                y = 74;
                break;
            case '서구':
                x = 59
                y = 74;
                break;
            case '남구':
                x = 59;
                y = 73;
                break;
            case '북구':
                x = 59;
                y = 75;
                break;
            case '광산구':
                x = 58;
                y = 75;
                break;
            default:
                x = 58;
                y = 74;
        }
    } else if (document.getElementById('addressDo1').value == '대전광역시') {
        area_code = 133
        switch (address) {
            case '동구':
                x = 68;
                y = 100;
                break;
            case '중구':
            case '서구':
                x = 67;
                y = 100;
                break;
            case '유성구':
                x = 66;
                y = 101;
                break;
            case '대덕구':
                x = 68;
                y = 101;
                break;
            default:
                x = 67;
                y = 100;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '울산광역시') {
        area_code = 159
        switch (address) {
            case '중구':
                x = 102;
                y = 84;
                break;
            case '남구':
                x = 101;
                y = 84;
                break;
            case '동구':
                x = 104;
                y = 83;
                break;
            case '북구':
                x = 103;
                y = 85;
                break;
            case '울주군':
                x = 100;
                y = 85;
                break;
            default:
                x = 102;
                y = 84;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '세종특별자치시') {
        area_code = 133
        switch (address) {
            case '세종특별자치시':
                x = 65;
                y = 105;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '경기도') {
        area_code = 109
        switch (address) {
            case '수원시 장안구':
                x = 60;
                y = 121;
                break;
            case '수원시 권선구':
                x = 60;
                y = 120;
                break;
            case '수원시 팔달구':
                x = 61;
                y = 120;
                break;
            case '수원시 영통구':
                x = 62;
                y = 120;
                break;
            case '성남시 수정구':
            case '성남시 중원구':
                x = 63;
                y = 124;
                break;
            case '성남시 분당구':
                x = 62;
                y = 123;
                break;
            case '의정부시':
                x = 61;
                y = 131;
                break;
            case '안양시 만안구':
                x = 59;
                y = 123;
                break;
            case '안양시 동안구':
                x = 60;
                y = 123;
                break;
            case '부천시':
                x = 57;
                y = 125;
                break;
            case '광명시':
                x = 58;
                y = 125;
                break;
            case '평택시':
                x = 62;
                y = 114;
                break;
            case '동두천시':
                x = 61;
                y = 134;
                break;
            case '안산시 상록구':
                x = 58;
                y = 121;
                break;
            case '안산시 단원구':
                x = 57;
                y = 121;
                break;
            case '고양시 덕양구':
                x = 57;
                y = 128;
                break;
            case '고양시 일산동구':
                x = 56;
                y = 129;
                break;
            case '고양시 일산서구':
                x = 56;
                y = 129;
                break;
            case '과천시':
                x = 60;
                y = 124;
                break;
            case '구리시':
                x = 62;
                y = 127;
                break;
            case '남양주시':
                x = 64;
                y = 128;
                break;
            case '오산시':
                x = 62;
                y = 118;
                break;
            case '시흥시':
                x = 57;
                y = 123;
                break;
            case '군포시':
                x = 59;
                y = 122;
                break;
            case '의왕시':
                x = 60;
                y = 122;
                break;
            case '하남시':
                x = 64;
                y = 126;
                break;
            case '용인시 처인구':
                x = 64;
                y = 119;
                break;
            case '용인시 기흥구':
                x = 62;
                y = 120;
                break;
            case '용인시 수지구':
                x = 62;
                y = 121;
                break;
            case '파주시':
                x = 56;
                y = 131;
                break;
            case '이천시':
                x = 68;
                y = 121;
                break;
            case '안성시':
                x = 65;
                y = 115;
                break;
            case '김포시':
                x = 55;
                y = 128;
                break;
            case '화성시':
                x = 57;
                y = 119;
                break;
            case '광주시':
                x = 65;
                y = 123;
                break;
            case '양주시':
                x = 61;
                y = 131;
                break;
            case '포천시':
                x = 64;
                y = 134;
                break;
            case '여주시':
                x = 71;
                y = 121;
                break;
            case '연천군':
                x = 61;
                y = 138;
                break;
            case '가평군':
                x = 69;
                y = 133;
                break;
            case '양평군':
                x = 69;
                y = 125;
                break;
            default:
                x = 60;
                y = 120;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '강원도') {
        area_code = 105
        switch (address) {
            case '춘천시':
                x = 73;
                y = 134;
                break;
            case '원주시':
                x = 76;
                y = 122;
                break;
            case '강릉시':
                x = 92;
                y = 131;
                break;
            case '동해시':
                x = 97;
                y = 127;
                break;
            case '태백시':
                x = 95;
                y = 119;
                break;
            case '속초시':
                x = 87;
                y = 141;
                break;
            case '홍천군':
                x = 75;
                y = 130;
                break;
            case '횡성군':
                x = 77;
                y = 125;
                break;
            case '영월군':
                x = 86;
                y = 119;
                break;
            case '평창군':
                x = 84;
                y = 123;
                break;
            case '정선군':
                x = 89;
                y = 123;
                break;
            case '철원군':
                x = 65;
                y = 139;
                break;
            case '화천군':
                x = 72;
                y = 139;
                break;
            case '양구군':
                x = 77;
                y = 139;
                break;
            case '인제군':
                x = 80;
                y = 138;
                break;
            case '고성군':
                x = 85;
                y = 145;
                break;
            case '양양군':
                x = 88;
                y = 138;
                break;
            default:
                x = 73;
                y = 134;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '충청북도') {
        area_code = 131
        switch (address) {
            case '청주시 상당구':
                x = 69;
                y = 106;
                break;
            case '청주시 서원구':
                x = 69;
                y = 107;
                break;
            case '청주시 흥덕구':
                x = 67;
                y = 106;
                break;
            case '청주시 청원구':
                x = 69;
                y = 107;
                break;
            case '충주시':
                x = 76;
                y = 114;
                break;
            case '제천시':
                x = 81;
                y = 118;
                break;
            case '보은군':
                x = 73;
                y = 103;
                break;
            case '옥천군':
                x = 71;
                y = 99;
                break;
            case '영동군':
                x = 74;
                y = 97;
                break;
            case '증평군':
                x = 71;
                y = 110;
                break;
            case '진천군':
                x = 68;
                y = 111;
                break;
            case '괴산군':
                x = 74;
                y = 111;
                break;
            case '음성군':
                x = 72;
                y = 113;
                break;
            case '단양군':
                x = 84;
                y = 115;
                break;
            default:
                x = 69;
                y = 107;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '충청남도') {
        area_code = 133
        switch (address) {
            case '천안시 동남구':
                x = 63;
                y = 110;
                break;
            case '천안시 서북구':
                x = 63;
                y = 112;
                break;
            case '공주시':
                x = 63;
                y = 102;
                break;
            case '보령시':
                x = 54;
                y = 100;
                break;
            case '아산시':
                x = 60;
                y = 110;
                break;
            case '서산시':
                x = 51;
                y = 110;
                break;
            case '논산시':
                x = 62;
                y = 97;
                break;
            case '계룡시':
                x = 65;
                y = 99;
                break;
            case '당진시':
                x = 54;
                y = 112;
                break;
            case '금산군':
                x = 69;
                y = 95;
                break;
            case '부여군':
                x = 59;
                y = 99;
                break;
            case '서천군':
                x = 55;
                y = 94;
                break;
            case '청양군':
                x = 57;
                y = 103;
                break;
            case '홍성군':
                x = 55;
                y = 106;
                break;
            case '예산군':
                x = 58;
                y = 107;
                break;
            case '태안군':
                x = 48;
                y = 109;
                break;
            default:
                x = 68;
                y = 100;
        }
    } else if (document.getElementById('addressDo1').value == '전라북도') {
        area_code = 146
        switch (address) {
            case '전주시 완산구':
                x = 63;
                y = 89;
                break;
            case '전주시 덕진구':
                x = 63;
                y = 89;
                break;
            case '군산시':
                x = 56;
                y = 92;
                break;
            case '익산시':
                x = 60;
                y = 91;
                break;
            case '정읍시':
                x = 58;
                y = 83;
                break;
            case '남원시':
                x = 68;
                y = 80;
                break;
            case '김제시':
                x = 59;
                y = 88;
                break;
            case '완주군':
                x = 63;
                y = 89;
                break;
            case '진안군':
                x = 68;
                y = 88;
                break;
            case '무주군':
                x = 72;
                y = 93;
                break;
            case '장수군':
                x = 70;
                y = 85;
                break;
            case '임실군':
                x = 66;
                y = 84;
                break;
            case '순창군':
                x = 63;
                y = 79;
                break;
            case '고창군':
                x = 56;
                y = 80;
                break;
            case '부안군':
                x = 56;
                y = 87;
                break;
            default:
                x = 63;
                y = 89;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '전라남도') {
        area_code = 156
        switch (address) {
            case '목포시':
                x = 50;
                y = 67;
                break;
            case '여수시':
                x = 73;
                y = 66;
                break;
            case '순천시':
                x = 70;
                y = 70;
                break;
            case '나주시':
                x = 56;
                y = 71;
                break;
            case '광양시':
                x = 73;
                y = 70;
                break;
            case '담양군':
                x = 61;
                y = 78;
                break;
            case '곡성군':
                x = 66;
                y = 77;
                break;
            case '구례군':
                x = 69;
                y = 75;
                break;
            case '고흥군':
                x = 66;
                y = 62;
                break;
            case '보성군':
                x = 62;
                y = 66;
                break;
            case '화순군':
                x = 61;
                y = 72;
                break;
            case '장흥군':
                x = 59;
                y = 64;
                break;
            case '강진군':
                x = 57;
                y = 63;
                break;
            case '해남군':
                x = 54;
                y = 61;
                break;
            case '영암군':
                x = 56;
                y = 66;
                break;
            case '무안군':
                x = 52;
                y = 71;
                break;
            case '함평군':
                x = 52;
                y = 72;
                break;
            case '영광군':
                x = 52;
                y = 77;
                break;
            case '장성군':
                x = 57;
                y = 77;
                break;
            case '완도군':
                x = 57;
                y = 56;
                break;
            case '진도군':
                x = 48;
                y = 59;
                break;
            case '신안군':
                x = 50;
                y = 66;
                break;
            default:
                x = 51;
                y = 67;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '경상북도') {
        area_code = 143
        switch (address) {
            case '포항시 남구':
                x = 102;
                y = 94;
                break;
            case '포항시 북구':
                x = 102;
                y = 95;
                break;
            case '경주시':
                x = 100;
                y = 91;
                break;
            case '김천시':
                x = 80;
                y = 96;
                break;
            case '안동시':
                x = 91;
                y = 106;
                break;
            case '구미시':
                x = 84;
                y = 96;
                break;
            case '영주시':
                x = 89;
                y = 111;
                break;
            case '영천시':
                x = 95;
                y = 93;
                break;
            case '상주시':
                x = 81;
                y = 102;
                break;
            case '문경시':
                x = 81;
                y = 106;
                break;
            case '경산시':
                x = 91;
                y = 90;
                break;
            case '군위군':
                x = 88;
                y = 99;
                break;
            case '의성군':
                x = 90;
                y = 101;
                break;
            case '청송군':
                x = 96;
                y = 103;
                break;
            case '영양군':
                x = 97;
                y = 108;
                break;
            case '영덕군':
                x = 102;
                y = 103;
                break;
            case '청도군':
                x = 91;
                y = 86;
                break;
            case '고령군':
                x = 83;
                y = 87;
                break;
            case '성주군':
                x = 83;
                y = 91;
                break;
            case '칠곡군':
                x = 85;
                y = 93;
                break;
            case '예천군':
                x = 86;
                y = 107;
                break;
            case '봉화군':
                x = 90;
                y = 113;
                break;
            case '울진군':
                x = 102;
                y = 115;
                break;
            case '울릉군':
                x = 127;
                y = 127;
                break;
            case '독도':
                x = 144;
                y = 123;
                break;
            default:
                x = 89;
                y = 91;
        }
    } else if (document.getElementById('addressDo1').value == '경상남도') {
        area_code = 159
        switch (address) {
            case '창원시 의창구':
                x = 90;
                y = 77;
                break;
            case '창원시 성산구':
                x = 91;
                y = 76;
                break;
            case '창원시 마산합포구':
            case '창원시 마산회원구':
                x = 89;
                y = 76;
                break;
            case '창원시 진해구':
                x = 91;
                y = 75;
                break;
            case '진주시':
                x = 81;
                y = 75;
                break;
            case '통영시':
                x = 87;
                y = 68;
                break;
            case '사천시':
                x = 80;
                y = 71;
                break;
            case '김해시':
                x = 95;
                y = 77;
                break;
            case '밀양시':
                x = 92;
                y = 83;
                break;
            case '거제시':
                x = 90;
                y = 69;
                break;
            case '양산시':
                x = 97;
                y = 79;
                break;
            case '의령군':
                x = 83;
                y = 78;
                break;
            case '함안군':
                x = 86;
                y = 77;
                break;
            case '창녕군':
                x = 87;
                y = 83;
                break;
            case '고성군':
                x = 85;
                y = 71;
                break;
            case '남해군':
                x = 77;
                y = 68;
                break;
            case '하동군':
                x = 74;
                y = 73;
                break;
            case '산청군':
                x = 76;
                y = 80;
                break;
            case '함양군':
                x = 74;
                y = 82;
                break;
            case '거창군':
                x = 77;
                y = 86;
                break;
            case '합천군':
                x = 81;
                y = 84;
                break;
            default:
                x = 91;
                y = 77;
                break;
        }
    } else if (document.getElementById('addressDo1').value == '제주특별자치도') {
        area_code = 184
        switch (address) {
            case '제주시':
                x = 53;
                y = 38;
                break;
            case '서귀포시':
                x = 52;
                y = 33;
                break;
            case '이어도':
                x = 28;
                y = 8;
            default:
                x = 52;
                x = 38;
                break;
        }
    } else {
        area_code = 108
    }
    var now_temp = 0;
    //API
    var ultra_now_xhr = new XMLHttpRequest();
    var ultra_now_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'; /*URL*/
    var ultra_now_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    ultra_now_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(getToday()); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hours); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
    ultra_now_queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
    ultra_now_xhr.open('GET', ultra_now_url + ultra_now_queryParams);
    ultra_now_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            // console.log(ultra_now_url + ultra_now_queryParams);
            try {
                var loaded = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('location').textContent = '에러 발생.'
            }
            if (loaded.response.header.resultCode = "00") {
                main = loaded.response.body.items.item;

                //현재 기온
                document.getElementById('now_temp').textContent = loaded.response.body.items.item[3].obsrValue;
                //1시간 강수량
                document.getElementById('now_rain').textContent = loaded.response.body.items.item[2].obsrValue;
                //습도
                document.getElementById('now_humid').textContent = loaded.response.body.items.item[1].obsrValue;
                // 바람
                var wind_dir = loaded.response.body.items.item[5].obsrValue
                document.getElementById('now_wind_dir').style = 'transform: rotate(' + wind_dir + 'deg)';

                document.getElementById('now_wind_str').textContent = loaded.response.body.items.item[7].obsrValue;

                //그래프
                now_temp = parseFloat(loaded.response.body.items.item[3].obsrValue)
                now_temp = Number(now_temp)
                wind = Number(loaded.response.body.items.item[7].obsrValue) * 3.6
                //체감기온
                console.log(wind)
                var body_temp = 13.12 + 0.6215 * now_temp
                body_temp = body_temp - 11.37 * Math.pow(wind, 0.16)
                body_temp = body_temp + 0.3965 * Math.pow(wind, 0.16) * now_temp;
                body_temp = Math.ceil(body_temp * 10) / 10
                document.getElementById('body_temp').textContent = body_temp;
            }
        }
    };

    var ultra_fore_xhr = new XMLHttpRequest();
    var ultra_fore_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'; /*URL*/
    var ultra_fore_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    ultra_fore_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(getToday()); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hours); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
    ultra_fore_queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
    ultra_fore_xhr.open('GET', ultra_fore_url + ultra_fore_queryParams);
    ultra_fore_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            // console.log(ultra_fore_url + ultra_fore_queryParams);
            try {
                var ultra_fore_loaded = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('location').textContent = '에러 발생.'
            }
            if (ultra_fore_loaded.response.header.resultCode = "00") {
                var ultra_fore_main = ultra_fore_loaded.response.body.items.item;
                var ultra_temp1 = ultra_temp2 = ultra_temp3 = ultra_temp4 = ultra_temp5 = ultra_temp6 = 0;
                var ultra_temp = []
                var ultra_wind = []
                var ultra_wind_dir = []
                var ultra_humid = []
                var ultra_rain = []
                var ultra_sky = []
                var ultra_rain_form = []
                for (i = 0; i < ultra_fore_main.length; i++) {
                    if (ultra_fore_main[i].category == 'T1H') {
                        ultra_temp.push(ultra_fore_main[i].fcstValue)
                    } else if (ultra_fore_main[i].category == 'WSD') {
                        ultra_wind.push(ultra_fore_main[i].fcstValue)
                    } else if (ultra_fore_main[i].category == 'REH') {
                        ultra_humid.push(ultra_fore_main[i].fcstValue)
                    } else if (ultra_fore_main[i].category == 'VEC') {
                        ultra_wind_dir.push(ultra_fore_main[i].fcstValue)
                    } else if (ultra_fore_main[i].category == 'RN1') {
                        if (ultra_fore_main[i].fcstValue == '강수없음') {
                            ultra_rain.push('--')
                        } else {
                            ultra_rain.push(ultra_fore_main[i].fcstValue)
                        }
                    } else if (ultra_fore_main[i].category == 'SKY') {
                        if (ultra_fore_main[i].fcstValue == '1') {
                            ultra_sky.push('맑음')
                        } else if (ultra_fore_main[i].fcstValue == '3') {
                            ultra_sky.push('구름 많음')
                        } else if (ultra_fore_main[i].fcstValue == '4') {
                            ultra_sky.push('흐림')
                        }
                    } else if (ultra_fore_main[i].category == 'PTY') {
                        if (ultra_fore_main[i].fcstValue == '0') {
                            ultra_rain_form.push('-')
                        } else if (ultra_fore_main[i].fcstValue == '1') {
                            ultra_rain_form.push('비')
                        } else if (ultra_fore_main[i].fcstValue == '2') {
                            ultra_rain_form.push('비/눈')
                        } else if (ultra_fore_main[i].fcstValue == '3') {
                            ultra_rain_form.push('눈')
                        } else if (ultra_fore_main[i].fcstValue == '5') {
                            ultra_rain_form.push('빗방울')
                        } else if (ultra_fore_main[i].fcstValue == '6') {
                            ultra_rain_form.push('비/눈날림')
                        } else if (ultra_fore_main[i].fcstValue == '7') {
                            ultra_rain_form.push('눈날림')
                        }
                    }
                }
                document.getElementById('ultra_temp1').textContent = `${ultra_temp[0]}℃`
                document.getElementById('ultra_temp2').textContent = `${ultra_temp[1]}℃`
                document.getElementById('ultra_temp3').textContent = `${ultra_temp[2]}℃`
                document.getElementById('ultra_temp4').textContent = `${ultra_temp[3]}℃`
                document.getElementById('ultra_temp5').textContent = `${ultra_temp[4]}℃`
                document.getElementById('ultra_temp6').textContent = `${ultra_temp[5]}℃`

                document.getElementById('ultra_wind1').textContent = `${ultra_wind[0]}m/s`
                document.getElementById('ultra_wind2').textContent = `${ultra_wind[1]}m/s`
                document.getElementById('ultra_wind3').textContent = `${ultra_wind[2]}m/s`
                document.getElementById('ultra_wind4').textContent = `${ultra_wind[3]}m/s`
                document.getElementById('ultra_wind5').textContent = `${ultra_wind[4]}m/s`
                document.getElementById('ultra_wind6').textContent = `${ultra_wind[5]}m/s`

                document.getElementById('ultra_wind_dir1').textContent = `${ultra_wind_dir[0]}도`
                document.getElementById('ultra_wind_dir2').textContent = `${ultra_wind_dir[1]}도`
                document.getElementById('ultra_wind_dir3').textContent = `${ultra_wind_dir[2]}도`
                document.getElementById('ultra_wind_dir4').textContent = `${ultra_wind_dir[3]}도`
                document.getElementById('ultra_wind_dir5').textContent = `${ultra_wind_dir[4]}도`
                document.getElementById('ultra_wind_dir6').textContent = `${ultra_wind_dir[5]}도`
                document.getElementById('ultra_wind_dir1').style = 'transform: rotate(' + ultra_wind_dir[0] + 'deg); display: block '
                document.getElementById('ultra_wind_dir2').style = 'transform: rotate(' + ultra_wind_dir[1] + 'deg); display: block '
                document.getElementById('ultra_wind_dir3').style = 'transform: rotate(' + ultra_wind_dir[2] + 'deg); display: block '
                document.getElementById('ultra_wind_dir4').style = 'transform: rotate(' + ultra_wind_dir[3] + 'deg); display: block '
                document.getElementById('ultra_wind_dir5').style = 'transform: rotate(' + ultra_wind_dir[4] + 'deg); display: block '
                document.getElementById('ultra_wind_dir6').style = 'transform: rotate(' + ultra_wind_dir[5] + 'deg); display: block '

                document.getElementById('ultra_humid1').textContent = `${ultra_humid[0]}%`
                document.getElementById('ultra_humid2').textContent = `${ultra_humid[1]}%`
                document.getElementById('ultra_humid3').textContent = `${ultra_humid[2]}%`
                document.getElementById('ultra_humid4').textContent = `${ultra_humid[3]}%`
                document.getElementById('ultra_humid5').textContent = `${ultra_humid[4]}%`
                document.getElementById('ultra_humid6').textContent = `${ultra_humid[5]}%`

                document.getElementById('ultra_rain1').textContent = `${ultra_rain[0]}`
                document.getElementById('ultra_rain2').textContent = `${ultra_rain[1]}`
                document.getElementById('ultra_rain3').textContent = `${ultra_rain[2]}`
                document.getElementById('ultra_rain4').textContent = `${ultra_rain[3]}`
                document.getElementById('ultra_rain5').textContent = `${ultra_rain[4]}`
                document.getElementById('ultra_rain6').textContent = `${ultra_rain[5]}`

                document.getElementById('ultra_sky1').textContent = `${ultra_sky[0]}`
                document.getElementById('ultra_sky2').textContent = `${ultra_sky[1]}`
                document.getElementById('ultra_sky3').textContent = `${ultra_sky[2]}`
                document.getElementById('ultra_sky4').textContent = `${ultra_sky[3]}`
                document.getElementById('ultra_sky5').textContent = `${ultra_sky[4]}`
                document.getElementById('ultra_sky6').textContent = `${ultra_sky[5]}`

                document.getElementById('ultra_rain_form1').textContent = `${ultra_rain_form[0]}`
                document.getElementById('ultra_rain_form2').textContent = `${ultra_rain_form[1]}`
                document.getElementById('ultra_rain_form3').textContent = `${ultra_rain_form[2]}`
                document.getElementById('ultra_rain_form4').textContent = `${ultra_rain_form[3]}`
                document.getElementById('ultra_rain_form5').textContent = `${ultra_rain_form[4]}`
                document.getElementById('ultra_rain_form6').textContent = `${ultra_rain_form[5]}`
            }
        }
    };
    var max_temp;
    var min_temp;
    var fore_xhr = new XMLHttpRequest();
    var fore_url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
    var fore_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    fore_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    fore_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
    fore_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    fore_queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(getToday()); /**/
    fore_queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent("0200"); /**/
    fore_queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(x); /**/
    fore_queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(y); /**/
    fore_xhr.open('GET', fore_url + fore_queryParams);
    fore_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            // console.log(fore_url + fore_queryParams);
            try {
                var fore_loaded = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('location').textContent = '에러 발생.'
            }
            if (fore_loaded.response.header.resultCode = "00") {
                var fore_main = fore_loaded.response.body.items.item;
                for (i = 0; i < fore_main.length; i++) {
                    if (fore_main[i].category == "TMX") {
                        max_temp = fore_main[i].fcstValue;
                    }
                    if (fore_main[i].category == "TMN") {
                        min_temp = fore_main[i].fcstValue;
                    }
                    document.getElementById('min_temp').textContent = "▼" + min_temp;
                    document.getElementById('max_temp').textContent = "▲" + max_temp;
                }


            }
        }
        // console.log(now_temp)
        var now = [min_temp, now_temp, max_temp];
        now_chart.data.datasets[0].data = now;
        now_chart.update();
    }
    var info_xhr = new XMLHttpRequest();
    var info_url = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrInfo'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent(area_code); /**/
    queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday() - 1); /**/
    queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
    info_xhr.open('GET', info_url + queryParams);
    info_xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            try {
                var info_loaded = JSON.parse(this.responseText);
            } catch (error) {
                document.getElementById('weather_info').textContent = '에러 발생.'
            }
            if (info_loaded.response.header.resultCode = "00") {
                var info_main = info_loaded.response.body.items.item;
                var yyyymmdd = String(info_main[0].tmFc);
                var year = yyyymmdd.slice(0, 4);
                var month = yyyymmdd.slice(4, 6);
                var date = yyyymmdd.slice(6, 8);
                var hour = yyyymmdd.slice(8, 10);
                var minute = yyyymmdd.slice(10, 12);
                document.getElementById('info_time').textContent = `${month}월 ${date}일 ${hour}시 ${minute}분 발표`
                document.getElementById('weather_info').textContent = (info_main[0].t1).slice(0, -4)
            }
        }
    };
    // var sokbo_xhr = new XMLHttpRequest();
    // var sokbo_url = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrBrkNews'; /*URL*/
    // var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    // queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    // queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent(108); /**/
    // queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday() - 1); /**/
    // queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
    // sokbo_xhr.open('GET', sokbo_url + queryParams);
    // console.log(sokbo_url+queryParams)
    // sokbo_xhr.onreadystatechange = function () {
    //     if (this.readyState == 4) {
    //         try {
    //             var sokbo_loaded = JSON.parse(this.responseText);
    //         } catch (error) {
    //             document.getElementById('weather_sokbo').textContent = '에러 발생.'
    //         }
    //         if(sokbo_loaded.response.header.resultCode = '00'){
    //             var sokbo_main = sokbo_loaded.body.items.item
    //             var yyyymmdd = String(sokbo_main[0].tmFc);
    //             var year = yyyymmdd.slice(0, 4);
    //             var month = yyyymmdd.slice(4, 6);
    //             var date = yyyymmdd.slice(6, 8);
    //             var hour = yyyymmdd.slice(8, 10);
    //             var minute = yyyymmdd.slice(10, 12);
    //             console.log(month + date + hour + minute)
    //             document.getElementById('sokbo_time').textContent = `${month}월 ${date}일 ${hour}시 ${minute}분 발표`
    //             document.getElementById('weather_sokbo').textContent = sokbo_main[0].t1
    //         }
    //     }
    // };

    ultra_now_xhr.send('');
    ultra_fore_xhr.send('');
    fore_xhr.send('');
    info_xhr.send('')
    // sokbo_xhr.send('');
})
document.getElementById('ultra_time1').textContent = `${today.getHours()}시`
let date = new Date();
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time2').textContent = `${String(date).slice(16, 18)}시`;
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time3').textContent = `${String(date).slice(16, 18)}시`;
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time4').textContent = `${String(date).slice(16, 18)}시`;
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time5').textContent = `${String(date).slice(16, 18)}시`;
date.setHours(date.getHours() + 1)
document.getElementById('ultra_time6').textContent = `${String(date).slice(16, 18)}시`;