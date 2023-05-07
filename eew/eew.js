document.getElementById('file-input').addEventListener('change', function (e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
        var contents = e.target.result;
        var jsonData = JSON.parse(contents);

        // jsonData 변수에 저장된 JSON 데이터 활용
        console.log(jsonData);
        // 이후 작업 수행
        //초기화
        document.getElementById('yosou_box').style = 'display:none'
        document.getElementById('warning_title').textContent = '';
        document.getElementById('warning_zone').textContent = '';
        document.getElementById('warning_prefecture').textContent = '';
        document.getElementById('warning_area').textContent = '';
        document.getElementById('warning').textContent = ''
        //발생시각
        var office = jsonData.editorialOffice
        if (office = '気象庁本庁'){
            office = '기상청 본청 발표'
        }else{
            office = '오사카관구기상대 발표'
        }
        var status = jsonData.status
        if(status == '通常'){
            status = '통상'
        }
        var occurtime = jsonData.body.earthquake.originTime;
        document.getElementById('occurtime').textContent = `${occurtime.slice(0, 4)}년 ${occurtime.slice(5, 7)}월 ${occurtime.slice(8, 10)}일 ${occurtime.slice(11, 13)}시 ${occurtime.slice(14, 16)}분 경 발생 | ${office}(${status})`

        //깊이
        document.getElementById('depth').textContent = '깊이 '+jsonData.body.earthquake.hypocenter.depth.value + 'km'

        //긴급지진속보
        var hou = jsonData.serialNo
        if (jsonData.body.isWarning == true) {
            if (jsonData.body.isLastInfo == true) {
                document.getElementById('title').textContent = `긴급지진속보(경보) | 최종 제 ${hou}보`
            } else {
                document.getElementById('title').textContent = `긴급지진속보(경보) | 제 ${hou}보`
            }
            document.getElementById('title').style = 'background-color:#DF3A01; color:#FACC2E;'

            //강한 흔들림에 경계
            if (jsonData.body.comments.warning.text == '強い揺れに警戒してください。') {
                jsonData.body.comments.warning.text = '강한 흔들림에 경계하십시오.'
            }

            document.getElementById('warning_title').textContent = jsonData.headline + '。　' + jsonData.body.comments.warning.text;
            document.getElementById('warning_box').style = 'display:block';

            var warning_zone = ''
            var warning_prefecture = ''
            var warning_area = ''

            //긴급지진속보 지방
            zone_list = {
                "北海道": '홋카이도',
                "東北": '도호쿠',
                "関東": '간토',
                "伊豆諸島": '이즈제도',
                "小笠原": '오가사와라',
                "甲信": '고신',
                "北陸": '호쿠리쿠',
                "東海": '도카이',
                "近畿": '긴키',
                "中国": '츄고쿠',
                "四国": '시코쿠',
                "奄美群島": '아마미군도',
                "沖縄": '오키나와'
            }
            function searchZone(value) {
                for (var key in zone_list) {
                    if (key === value) {
                        return zone_list[key];
                    }
                }
                return "-";
            } for (i = 0; i < (jsonData.body.zones).length; i++) {
                warning_zone += searchZone(jsonData.body.zones[i].name) + ', '
            }

            //긴급지진속보 도도부현
            prefecture_list = {
                "北海道道央": "홋카이도 도오",
                "北海道道南": "홋카이도 도남",
                "北海道道北": "홋카이도 도호쿠",
                "北海道道東": "홋카이도 도토",
                "青森": "아오모리",
                "岩手": "이와테",
                "宮城": "미야기",
                "秋田": "아키타",
                "山形": "야마가타",
                "福島": "후쿠시마",
                "茨城": "이바라키",
                "栃木": "토치기",
                "群馬": "군마",
                "埼玉": "사이타마",
                "千葉": "치바",
                "東京": "도쿄",
                "伊豆諸島": "이즈 제도",
                "小笠原": "오가사와라",
                "神奈川": "카나가와",
                "新潟": "니가타",
                "富山": "토야마",
                "石川": "이시카와",
                "福井": "후쿠이",
                "山梨": "야마나시",
                "長野": "나가노",
                "岐阜": "기후",
                "静岡": "시즈오카",
                "愛知": "아이치",
                "三重": "미에",
                "滋賀": "시가",
                "京都": "교토",
                "大阪": "오사카",
                "兵庫": "효고",
                "奈良": "나라",
                "和歌山": "와카야마",
                "鳥取": "돗토리",
                "島根": "시마네",
                "岡山": "오카야마",
                "広島": "히로시마",
                "山口": "야마구치",
                "徳島": "도쿠시마",
                "香川": "카가와",
                "愛媛": "에히메",
                "高知": "고치",
                "福岡": "후쿠오카",
                "佐賀": "사가",
                "長崎": "나가사키",
                "熊本": "구마모토",
                "大分": "오이타",
                "宮崎": "미야자키",
                "鹿児島": "가고시마",
                "奄美群島": "아마미 군도",
                "沖縄本島": "오키나와 본섬",
                "大東島": "다이토 섬",
                "宮古島": "미야케 섬",
                "八重山": "야에 산"
            }
            function searchPrefecture(value) {
                for (var key in prefecture_list) {
                    if (key === value) {
                        return prefecture_list[key];
                    }
                }
                return "-";
            }
            for (i = 0; i < (jsonData.body.prefectures).length; i++) {
                warning_prefecture += searchPrefecture(jsonData.body.prefectures[i].name) + ', '
            }

            //긴급지진속보 구역
            area_list = {
                "石狩地方北部": "이시카리 지방 북부",
                "石狩地方中部": "이시카리 지방 중부",
                "石狩地方南部": "이시카이 지방 남부",
                "後志地方北部": "시리베시 지방 북부",
                "後志地方東部": "시리베시 지방 동부",
                "後志地方西部": "시리베시 지방 서부",
                "空知地方北部": "소라치 지방 북부",
                "空知地方中部": "소라치 지방 중부",
                "空知地方南部": "소라치 지방 남부",
                "渡島地方北部": "오시마 지방 북부",
                "渡島地方東部": "오시마 지방 동부",
                "渡島地方西部": "오시마 지방 서부",
                "檜山地方": "히야마 지방",
                "北海道奥尻島": "홋카이도 오쿠시리 섬",
                "胆振地方西部": "이부리 지방 서부",
                "胆振地方中東部": "이부리 지방 중동부",
                "日高地方西部": "히다카 지방 서부",
                "日高地方中部": "히다카 지방 중부",
                "日高地方東部": "히다카 지방 동부",
                "上川地方北部": "카미카와 지방 북부",
                "上川地方中部": "카미카와 지방 중부",
                "上川地方南部": "카미카와 지방 남부",
                "留萌地方中北部": "루모이 지방 중북부",
                "留萌地方南部": "루모이 지방 남부",
                "宗谷地方北部": "소야 지방 북부",
                "宗谷地方南部": "소야 지방 남부",
                "北海道利尻礼文": "홋카이도 리시리레에분",
                "網走地方": "아바시리 지방",
                "北見地方": "키타미 지방",
                "紋別地方": "몬베쓰 지방",
                "十勝地方北部": "토카치 지방 북부",
                "十勝地方中部": "토카지 지방 중부",
                "十勝地方南部": "토카치 지방 남부",
                "釧路地方北部": "쿠시로 지방 북부",
                "釧路地方中南部": "쿠시로 지방 중남부",
                "根室地方北部": "네무로 지방 북부",
                "根室地方中部": "네무로 지방 중부",
                "根室地方南部": "네무로지방남부",
                "青森県津軽北部": "아오모리 현 쓰가루 북부",
                "青森県津軽南部": "아오모리 현 쓰가루 남부",
                "青森県三八上北": "아오모리 현 삼파치카미키타",
                "青森県下北": "아오모리 현 시모키타",
                "岩手県沿岸北部": "이와테 현 연안 북부",
                "岩手県沿岸南部": "이와테 현 연안 남부",
                "岩手県内陸北部": "이와테 현 내륙 북부",
                "岩手県内陸南部": "이와테 현 내륙 남부",
                "宮城県北部": "미야기 현 북부",
                "宮城県中部": "미야기 현 중부",
                "宮城県南部": "미야기 현 남부",
                "秋田県沿岸北部": "아키타 현 연안 북부",
                "秋田県沿岸南部": "아키타 현 연안 남부",
                "秋田県内陸北部": "아키타 현 내륙 북부",
                "秋田県内陸南部": "아키타 현 내륙 남부",
                "山形県庄内": "야마가타 현 쇼나이",
                "山形県最上": "야마가타 현 사이조",
                "山形県村山": "야마가타 현 무라야마",
                "山形県置賜": "야마가타 현 오키타마",
                "福島県中通り": "후쿠시마 현 나카도리",
                "福島県浜通り": "후쿠시마 현 하마도리",
                "福島県会津": "후쿠시마 현 아이즈",
                "茨城県北部": "이바라키 현 북부",
                "茨城県南部": "이바라키 현 남부",
                "栃木県北部": "토치기 현 북부",
                "栃木県南部": "토치기 현 남부",
                "群馬県北部": "군마 현 북부",
                "群馬県南部": "군마 현 남부",
                "埼玉県北部": "사이타마 현 북부",
                "埼玉県南部": "사이타마 현 남부",
                "埼玉県秩父": "사이나마 현 지치부",
                "千葉県北東部": "치바 현 북동부",
                "千葉県北西部": "치바 현 북서부",
                "千葉県南部": "치바 현 남부",
                "東京都２３区": "도쿄 도 23구",
                "東京都多摩東部": "도쿄 도 다마 동부",
                "東京都多摩西部": "도쿄 도 다마 서부",
                "伊豆大島": "이즈오 섬",
                "新島": "니이 섬",
                "神津島": "코즈 섬",
                "三宅島": "미야케 섬",
                "八丈島": "하치조 섬",
                "小笠原": "오가사와라",
                "神奈川県東部": "카나가와 현 동부",
                "神奈川県西部": "카나가와 현 서부",
                "新潟県上越": "니가타 현 조에쓰",
                "新潟県中越": "니가타 현 주에쓰",
                "新潟県下越": "니가타 현 카에츠",
                "新潟県佐渡": "니가타 현 사도",
                "富山県東部": "토야마 현 동부",
                "富山県西部": "토야마 현 서부",
                "石川県能登": "이시카와 현 노토",
                "石川県加賀": "이시카와 현 카가",
                "福井県嶺北": "후쿠이 현 레이호쿠",
                "福井県嶺南": "후쿠이 현 레이난",
                "山梨県東部・富士五湖": "야마나시 현 동부・후지 오호",
                "山梨県中・西部": "야마나시 현 중・서부",
                "長野県北部": "나가노 현 북부",
                "長野県中部": "나가노 현 중부",
                "長野県南部": "나가노 현 남부",
                "岐阜県飛騨": "기후 현 히다",
                "岐阜県美濃東部": "기후 현 미노 동부",
                "岐阜県美濃中西部": "기후 현 미노 중서부",
                "静岡県伊豆": "시즈오카 현 이즈",
                "静岡県東部": "시즈오카 현 동부",
                "静岡県中部": "시즈오카 현 중부",
                "静岡県西部": "시즈오카 현 서부",
                "愛知県東部": "아이치 현 동부",
                "愛知県西部": "아이치 현 서부",
                "三重県北部": "미에 현 북부",
                "三重県中部": "미에 현 중부",
                "三重県南部": "미에 현 남부",
                "滋賀県北部": "시가 현 북부",
                "滋賀県南部": "시가 현 남부",
                "京都府北部": "교토 부 북부",
                "京都府南部": "교토 부 남부",
                "大阪府北部": "오사카 부 북부",
                "大阪府南部": "오사카 부 남부",
                "兵庫県北部": "효고 현 북부",
                "兵庫県南東部": "효고 현 남동부",
                "兵庫県南西部": "효고 현 남서부",
                "兵庫県淡路島": "효고 현 아와지 섬",
                "奈良県": "나라 현",
                "和歌山県北部": "와카야마 현 북부",
                "和歌山県南部": "와카야마 현 남부",
                "鳥取県東部": "돗토리 현 동부",
                "鳥取県中部": "돗토리 현 중부",
                "鳥取県西部": "돗토리 현 서부",
                "島根県東部": "시마네 현 동부",
                "島根県西部": "시마네 현 서부",
                "島根県隠岐": "시마네 현 오키",
                "岡山県北部": "오카야마 현 북부",
                "岡山県南部": "오카야마 현 남부",
                "広島県北部": "히로시마 현 북부",
                "広島県南東部": "히로시마 현 남동부",
                "広島県南西部": "히로시마 현 남서부",
                "山口県北部": "야마구치 현 북부",
                "山口県東部": "야마구치 현 동부",
                "山口県中部": "야마구치 현 중부",
                "山口県西部": "야마구치 현 서부",
                "徳島県北部": "도쿠시마 현 북부",
                "徳島県南部": "도쿠시마 현 남부",
                "香川県東部": "카가와 현 동부",
                "香川県西部": "카가와 현 서부",
                "愛媛県東予": "에히메 현 토요",
                "愛媛県中予": "에히메 현 나카요",
                "愛媛県南予": "에히메 현 미나미요",
                "高知県東部": "고치 현 동부",
                "高知県中部": "고치 현 중부",
                "高知県西部": "고치 현 서부",
                "福岡県福岡": "후쿠오카 현 후쿠오카",
                "福岡県北九州": "후쿠오카 현 키타큐슈",
                "福岡県筑豊": "후쿠오카 현 치쿠호",
                "福岡県筑後": "후쿠오카 현 치쿠고",
                "佐賀県北部": "사가 현 북부",
                "佐賀県南部": "사가 현 남부",
                "長崎県北部": "나가사키 현 북부",
                "長崎県南西部": "나가사키 현 남서부",
                "長崎県島原半島": "나가사키 현 시마바라 반도",
                "長崎県対馬": "나가사키 현 쓰시마",
                "長崎県壱岐": "나가사키 현 이키",
                "長崎県五島": "나가사키 현 고토",
                "熊本県阿蘇": "구마모토 현 아소",
                "熊本県熊本": "구마모토 현 구마모토",
                "熊本県球磨": "구마모토 현 쿠마",
                "熊本県天草・芦北": "구마모토 현 아마쿠사・아시키타",
                "大分県北部": "오이타 현 북부",
                "大分県中部": "오이타 현 중부",
                "大分県南部": "오이타 현 남부",
                "大分県西部": "오이타 현 서부",
                "宮崎県北部平野部": "미야자키 현 북부 평야부",
                "宮崎県北部山沿い": "미야자키 현 북부 산기슭",
                "宮崎県南部平野部": "미야자키 현 남부 평야부",
                "宮崎県南部山沿い": "미야자키 현 남부 산기슭",
                "鹿児島県薩摩": "가고시마 현 사쓰마",
                "鹿児島県大隅": "가고시마 현 오스미",
                "鹿児島県十島村": "가고시마 현 도시마무라",
                "鹿児島県甑島": "가고시마 현 코시키 섬",
                "鹿児島県種子島": "가고시마 현 다네가 섬",
                "鹿児島県屋久島": "가고시마 현 야쿠 섬",
                "鹿児島県奄美北部": "가고시마 현 아마미 북부",
                "鹿児島県奄美南部": "가고시마 현 아마미 남부",
                "沖縄県本島北部": "오키나와 현 본섬 북부",
                "沖縄県本島中南部": "오키나와 현 본섬 중남부",
                "沖縄県久米島": "오키나와 현 구메 섬",
                "沖縄県大東島": "오키나와 현 다이토 섬",
                "沖縄県宮古島": "오키나와 현 미야케 섬",
                "沖縄県石垣島": "오키나와 현 이시가키 섬",
                "沖縄県与那国島": "오키나와 현 요나구니 섬",
                "沖縄県西表島": "오키나와 현 이리오모테 섬"
            }
            function searchArea(value) {
                for (var key in area_list) {
                    if (key === value) {
                        return area_list[key];
                    }
                }
                return "-";
            }
            for (i = 0; i < (jsonData.body.regions).length; i++) {
                warning_area += searchArea(jsonData.body.regions[i].name) + ', '
            }

            document.getElementById('warning_zone').textContent = `발표 지방: ${warning_zone.slice(0, -2)}`;
            document.getElementById('warning_prefecture').textContent = `발표 도도부현: ${warning_prefecture.slice(0, -2)}`;
            document.getElementById('warning_area').textContent = `발표 구역: ${warning_area.slice(0, -2)}`;


            if (jsonData.body.isCanceled == true) {
                document.getElementById('title').textContent = `긴급지진속보(취소) | 제 ${hou}보`
                document.getElementById('warning_title').textContent = '방금 전 긴급지진속보는 취소되었습니다.'
            }
        } else if (jsonData.body.isWarning == false) {
            document.getElementById('title').style = 'background-color:orange; color:white;'
            if (jsonData.body.isLastInfo == true) {
                document.getElementById('title').textContent = `긴급지진속보(예보) | 최종 제 ${hou}보`
            } else {
                document.getElementById('title').textContent = `긴급지진속보(예보) | 제 ${hou}보`
            }
            document.getElementById('warning_box').style = 'display:none';
            document.getElementById('warning').style = 'display:none';
            if (jsonData.body.isCanceled == true) {
                document.getElementById('title').textContent = `긴급지진속보(취소) | 제 ${hou}보`
                document.getElementById('warning_title').textContent = '방금 전 긴급지진속보는 취소되었습니다.'
            }
        }
        //규모
        document.getElementById('magnitude').textContent = jsonData.body.earthquake.magnitude.value;
        mag = parseFloat(jsonData.body.earthquake.magnitude.value); document.getElementById('is_plum').textContent = ''
        if (mag == 1.0) {
            mag_box.style = 'background-color:black; color:white;'
            document.getElementById('is_plum').textContent = '※이 긴급지진속보는 PLUM법을 활용해 발표되었습니다'
        }
        else if (mag <= 3.5) {
            mag_box.style = 'background-color:#f2f2ff;'
        } else if (mag <= 4.0) {
            mag_box.style = 'background-color:yellow;'
        } else if (mag <= 5.0) {
            mag_box.style = 'background-color:orange;'
        } else if (mag <= 6.0) {
            mag_box.style = 'background-color:red;'
        } else if (mag <= 7.0) {
            mag_box.style = 'background-color:#760000;color:white;'
        } else {
            mag_box.style = 'background-color:purple;color:white;'
        }
        //최대진도
        max_int_box = document.getElementById('max_int_box');
        var max_int = ''
        try {
            if (jsonData.body.intensity.forecastMaxInt.to == 'over') {
                document.getElementById('max_intensity').textContent = `${jsonData.body.intensity.forecastMaxInt.from} 정도 이상`
                max_int = jsonData.body.intensity.forecastMaxInt.from
            } else {
                if (jsonData.body.intensity.forecastMaxInt.from == jsonData.body.intensity.forecastMaxInt.to) {
                    max_int = jsonData.body.intensity.forecastMaxInt.from
                    document.getElementById('max_intensity').textContent = max_int
                } else {
                    document.getElementById('max_intensity').textContent = `${jsonData.body.intensity.forecastMaxInt.from} ~ ${jsonData.body.intensity.forecastMaxInt.to}`
                    max_int = jsonData.body.intensity.forecastMaxInt.to
                }
            }
            if (max_int == '0') {
                max_long_int_box.style = 'background-color:white'
            } else if (max_int == '1') {
                max_int_box.style = 'background-color:#f2f2ff'
            } else if (max_int == '2') {
                max_int_box.style = 'background-color:#b3eaed'
            } else if (max_int == '3') {
                max_int_box.style = 'background-color:#0041ff'
            } else if (max_int == '4') {
                max_int_box.style = 'background-color:#fae696'
            } else if (max_int == '5-') {
                max_int_box.style = 'background-color:#ffe600'
            } else if (max_int == '5+') {
                max_int_box.style = 'background-color:#ff9900'
            } else if (max_int == '6-') {
                max_int_box.style = 'background-color:#ff2800'
            } else if (max_int == '6+') {
                max_int_box.style = 'background-color:#a50021'
            } else if (max_int == '7') {
                max_int_box.style = 'background-color:#b40068'
            }
        } catch (error) {
            max_int_box.style = 'background-color:white;'
            document.getElementById('max_intensity').textContent = `불명`
            document.getElementById('title').style = 'background-color:blue; color:white;'
        }

        //최대 장주기 지진동
        var max_long_int_box = document.getElementById('max_long_int_box')
        var max_long_int = ''
        try {
            if (jsonData.body.intensity.forecastMaxLgInt.to == 'over') {
                document.getElementById('max_long_intensity').textContent = `${jsonData.body.intensity.forecastMaxLgInt.from} 정도 이상`
                max_long_int = jsonData.body.intensity.forecastMaxLgInt.from
            } else {
                if (jsonData.body.intensity.forecastMaxLgInt.from == jsonData.body.intensity.forecastMaxLgInt.to) {
                    max_long_int = jsonData.body.intensity.forecastMaxLgInt.to
                    document.getElementById('max_long_intensity').textContent = max_long_int;
                } else {
                    document.getElementById('max_long_intensity').textContent = `${jsonData.body.intensity.forecastMaxLgInt.from} ~ ${jsonData.body.intensity.forecastMaxLgInt.to}`
                    max_long_int = jsonData.body.intensity.forecastMaxLgInt.to
                }
            }
            if (max_long_int == '0') {
                max_long_int_box.style = 'background-color:white'

            } else if (max_long_int == '1') {
                max_long_int_box.style = 'background-color:#0041ff'
            } else if (max_long_int == '2') {
                max_long_int_box.style = 'background-color:#ffe600'
            } else if (max_long_int == '3') {
                max_long_int_box.style = 'background-color:#ff2800'
            } else if (max_long_int == '4') {
                max_long_int_box.style = 'background-color:#a50021'
            }
        } catch (error) {
            document.getElementById('max_long_intensity').textContent = `-`;
            max_long_int_box.style = 'background-color:white;'
        }


        try {
            if (jsonData.body.intensity.appendix.maxIntChange == '0') {
                document.getElementById('maxIntChange').textContent = '거의 변화 없음'
            } else if (jsonData.body.intensity.appendix.maxIntChange == '1') {
                document.getElementById('maxIntChange').textContent = '1.0 이상 상승'
            } else if (jsonData.body.intensity.appendix.maxIntChange == '2') {
                document.getElementById('maxIntChange').textContent = '1.0 이상 감소'
            }
        } catch (error) {
            document.getElementById('maxIntChange').textContent = '정보가 없습니다.'
        }
        try {
            if (jsonData.body.intensity.appendix.maxLgIntChange == '0') {
                document.getElementById('maxLgIntChange').textContent = '거의 변화 없음'
            } else if (jsonData.body.intensity.appendix.maxLgIntChange == '1') {
                document.getElementById('maxLgIntChange').textContent = '1 이상 상승'
            } else if (jsonData.body.intensity.appendix.maxLgIntChange == '2') {
                document.getElementById('maxLgIntChange').textContent = '1 이상 감소'
            }
        } catch (error) {
            document.getElementById('maxLgIntChange').textContent = '정보가 없습니다.'
        }
        try {
            if (jsonData.body.intensity.appendix.maxIntChangeReason == '0') {
                document.getElementById('maxIntChangeReason').textContent = '거의 변화 없음'
            } else if (jsonData.body.intensity.appendix.maxIntChangeReason == '1') {
                document.getElementById('maxIntChangeReason').textContent = '주로 규모가 변화했기 때문 (1.0 이상)'
            } else if (jsonData.body.intensity.appendix.maxIntChangeReason == '2') {
                document.getElementById('maxIntChangeReason').textContent = '주로 진앙 위치가 변화했기 때문 (10km 이상)'
            } else if (jsonData.body.intensity.appendix.maxIntChangeReason == '3') {
                document.getElementById('maxIntChangeReason').textContent = '규모와 진앙 위치가 변화했기 때문 (각각 1.0 이상, 10km 이상)'
            } else if (jsonData.body.intensity.appendix.maxIntChangeReason == '4') {
                document.getElementById('maxIntChangeReason').textContent = '진원의 깊이가 변화했기 때문(30km 이상 변화)'
            } else if (jsonData.body.intensity.appendix.maxIntChangeReason == '9') {
                document.getElementById('maxIntChangeReason').textContent = 'PLUM법에 의한 예측이 변화했기 때문'
            }
        } catch (error) {
            document.getElementById('maxIntChangeReason').textContent = '정보가 없습니다.'
        }

        //accuracy
        var landOrSea = jsonData.body.earthquake.hypocenter.landOrSea
        var epi_1 = jsonData.body.earthquake.hypocenter.accuracy.epicenters[0]
        var epi_2 = jsonData.body.earthquake.hypocenter.accuracy.epicenters[1]
        var epi_dep = jsonData.body.earthquake.hypocenter.accuracy.depth
        var epi_mag = jsonData.body.earthquake.hypocenter.accuracy.magnitudeCalculation
        var mag_calc = jsonData.body.earthquake.hypocenter.accuracy.numberOfMagnitudeCalculation

        if (landOrSea == '内陸') {
            document.getElementById('landOrSea').textContent = '(내륙지진)'
        } else {
            document.getElementById('landOrSea').textContent = '(해역지진)'
        }

        if (epi_1 == '0') {
            epi_1 = '불명'
        } else if (epi_1 == '1') {
            epi_1 = 'P파/S파 레벨 초과, IPF 1점, 또는 "가정진원요소" [기상청 데이터]'
        } else if (epi_1 == '2') {
            epi_1 = 'IPF법 2점 [기상청 데이터]'
        } else if (epi_1 == '3') {
            epi_1 = 'IPF법 3점, 4점 [기상청 데이터]'
        } else if (epi_1 == '4') {
            epi_1 = 'IPF법 5점 이상[기상청 데이터]'
        } else if (epi_1 == '5') {
            epi_1 = 'NIED시스템(4점 이하, 또는 정밀도 정보 없음) [Hi-net 데이터]'
        } else if (epi_1 == '6') {
            epi_1 = 'NIED시스템(5점 이상) [Hi-net 데이터]'
        } else if (epi_1 == '7') {
            epi_1 = 'EPOS(해역[관측망외])'
        } else if (epi_1 == '8') {
            epi_1 = 'EPOS(내륙[관측망내])'
        }

        if (epi_2 == '0') {
            epi_2 = '불명'
        } else if (epi_2 == '1') {
            epi_2 = 'P파/S파 레벨 초과, IPF 1점, 또는 "가정진원요소" [기상청 데이터]'
        } else if (epi_2 == '2') {
            epi_2 = 'IPF법 2점'
        } else if (epi_2 == '3') {
            epi_2 = 'IPF법 3점, 4점'
        } else if (epi_2 == '4') {
            epi_2 = 'IPF법 5점'
        } else if (epi_2 == '9') {
            epi_2 = '최종보 상당의 정밀도'
        }

        if (epi_dep == '0') {
            epi_dep = '불명'
        } else if (epi_dep == '1') {
            epi_dep = 'P파/S파 레벨 초과, IPF 1점, 또는 "가정진원요소" [기상청 데이터]'
        } else if (epi_dep == '2') {
            epi_dep = 'IPF법 2점 [기상청 데이터]'
        } else if (epi_dep == '3') {
            epi_dep = 'IPF법 3점, 4점 [기상청 데이터]'
        } else if (epi_dep == '4') {
            epi_dep = 'IPF법 5점 이상[기상청 데이터]'
        } else if (epi_dep == '5') {
            epi_dep = 'NIED시스템(4점 이하, 또는 정밀도 정보 없음) [Hi-net 데이터]'
        } else if (epi_dep == '6') {
            epi_dep = 'NIED시스템(5점 이상) [Hi-net 데이터]'
        } else if (epi_dep == '7') {
            epi_dep = 'EPOS(해역[관측망외])'
        } else if (epi_dep == '8') {
            epi_dep = 'EPOS(내륙[관측망내])'
        }

        if (epi_mag == '0') {
            epi_mag = '불명'
        } else if (epi_mag == '2') {
            epi_mag = 'NIED 시스템 [Hi-net 데이터]'
        } else if (epi_mag == '3') {
            epi_mag = '전점 P상'
        } else if (epi_mag == '4') {
            epi_mag = 'P상/전상 혼재'
        } else if (epi_mag == '5') {
            epi_mag = '전점 전상'
        } else if (epi_mag == '6') {
            epi_mag = 'EPOS'
        } else if (epi_mag == '8') {
            epi_mag = 'P파/S파 레벨 초과, IPF 1점, 또는 "가정진원요소"'
        }

        if (mag_calc == '0') {
            mag_calc = '불명'
        } else if (mag_calc == '1') {
            mag_calc = '1점, P파/S파 레벨 초과, 또는 "가정진원요소"'
        } else if (mag_calc == '2') {
            mag_calc = '2점'
        } else if (mag_calc == '3') {
            mag_calc = '3점'
        } else if (mag_calc == '4') {
            mag_calc = '4점'
        } else if (mag_calc == '5') {
            mag_calc = '5점 이상'
        }

        document.getElementById('epicenters_1').textContent = epi_1;
        document.getElementById('epicenters_2').textContent = epi_2;
        document.getElementById('accuracy_depth').textContent = epi_dep;
        document.getElementById('magnitudeCalculation').textContent = epi_mag;
        document.getElementById('numberOfMagnitudeCalculation').textContent = mag_calc;

        //진원
        var hypocenter = jsonData.body.earthquake.hypocenter.code;
        var hypocenter_box = document.getElementById('hypocenter')
        document.getElementById('hypocenter').textContent = jsonData.body.earthquake.hypocenter.name;

        document.getElementById('hypocenter').href = `https://www.google.com/maps/place/${jsonData.body.earthquake.hypocenter.coordinate.latitude.text},${jsonData.body.earthquake.hypocenter.coordinate.longitude.text}`
        var list = {
            "100": "이시카리 지방 북부",
            "101": "이시카리 지방 동부",
            "102": "이시카리 지방 남부",
            "105": "오시마 지방 북부",
            "106": "오시마 지방 동부",
            "107": "오시마 지방 남부",
            "110": "히야마 지방",
            "115": "시리베시 지방 북부",
            "116": "시리베시 지방 동부",
            "117": "시리베시 지방 서부",
            "120": "소라치 지방 북부",
            "121": "소라치 지방 중부",
            "122": "소라치 지방 남부",
            "125": "가미카와 지방 북부",
            "126": "가미카와 지방 중부",
            "127": "가미카와 지방 남부",
            "130": "루모이 지방 중북부",
            "131": "루모이 지방 남부",
            "135": "소야 지방 북부",
            "136": "소야 지방 남부",
            "140": "아바시리 지방",
            "141": "기타미 지방",
            "142": "몬베스 지방",
            "145": "이부리 지방 서부",
            "146": "이부리 지방 중동부",
            "150": "히다카 지방 남부",
            "151": "히다카 지방 중부",
            "152": "히다카 지방 동부",
            "155": "토카치 지방 북부",
            "156": "토카치 지방 중부",
            "157": "토카치 지방 북부",
            "160": "쿠시로 지방 북부",
            "161": "쿠시로 지방 중남부",
            "165": "네무로 지방 북부",
            "166": "네무로 지방 중부",
            "167": "네무로 지방 남부",
            "180": "홋카이도 남서해",
            "181": "홋카이도 서방 바다",
            "182": "이시카리 만",
            "183": "홋카이도 북서해",
            "184": "소야 해협",
            "186": "쿠나시르 섬 근해",
            "187": "에토로후 섬 부근",
            "188": "홋카이도 동방해",
            "189": "네무로 반도 남동해",
            "190": "쿠시로 앞바다",
            "191": "토카치 앞바다",
            "192": "우라카와 앞바다",
            "193": "토마코미아 앞바다",
            "194": "우치우라 만",
            "195": "소야 동방바다",
            "196": "아바시리 앞바다",
            "197": "에토로후 섬 남동해",
            "200": "아오모리 현 쓰가루 북부",
            "201": "아오모리 현 쓰가루 남부",
            "202": "아오모리 현 삼파치카미키타",
            "203": "아오모리 현 시모키타",
            "210": "이와테 현 연안 북부",
            "211": "이와테 현 연안 남부",
            "212": "이와테 현 내륙 북부",
            "213": "이와테 현 애륙 남부",
            "220": "미야기 현 북부",
            "221": "미야기 현 남부",
            "222": "미야기 현 중부",
            "230": "아키타 현 연안 북부",
            "231": "아키타 현 연안 남부",
            "232": "아키타 현 연안 북부",
            "233": "아키타 현 연안 남부",
            "240": "야마가타 현 쇼나이",
            "241": "야마가타 현 사이조",
            "242": "야마가타 현 무라야마",
            "243": "야마가타 현 오키타마",
            "250": "후쿠시마 현 나카도리",
            "251": "후쿠시마 현 하마도리",
            "252": "후쿠시마 현 아이즈",
            "280": "쓰가루 해협",
            "281": "야마사타 현 앞바다",
            "282": "아키타 현 앞바다",
            "283": "아오모리 현 서방바다",
            "284": "무쓰 만",
            "285": "아오모리 현 동방바다",
            "286": "이와테 현 앞바다",
            "287": "미야기 현 앞바다",
            "288": "산리쿠 해",
            "289": "후쿠시마 현 앞바다",
            "300": "이바라키 현 북부",
            "301": "이바라키 현 남부",
            "309": "치바 현 남동해",
            "310": "토치기 현 북부",
            "311": "토치기 현 남부",
            "320": "군마 현 북부",
            "321": "군마 현 남부",
            "330": "사이타마 현 북부",
            "331": "사이타마 현 남부",
            "332": "사이타마 현 지치부",
            "340": "치바 현 북동부",
            "341": "치바 현 북서부",
            "342": "치바 현 남부",
            "349": "보소반도 남방바다",
            "350": "도쿄도 23구",
            "351": "도쿄도 다마 동부",
            "352": "도쿄도 다마 서부",
            "360": "카나가와 현 동부",
            "361": "카나가와 현 서부",
            "370": "니가타 현 조에쓰 지방",
            "371": "니가타 현 주에쓰 지방",
            "372": "니가타 현 카에쓰 지방",
            "375": "니가타 현 사도",
            "378": "니가타 현 카에쓰 앞바다",
            "379": "니가타 현 조에쓰 앞바다",
            "380": "토야마 현 동부",
            "381": "토야마 현 서부",
            "390": "이시카와 현 노토 지방",
            "391": "이시카와 현 카가 지방",
            "400": "후쿠이 현 레이호쿠",
            "401": "후쿠이 현 레이미나미",
            "411": "야마나시 현 중・서부",
            "412": "야마나시 현 동부・후지오호",
            "420": "나가노 현 북부",
            "421": "나가노 현 중부",
            "422": "나가노 현 남부",
            "430": "기후 현 히다지방",
            "431": "기후 현 미노 동부",
            "432": "기후 현 미노 중서부",
            "440": "시즈오카 현 이즈지방",
            "441": "시즈오카 현 동부",
            "442": "시즈오카 현 중부",
            "443": "시즈오카 현 서부",
            "450": "아이치 현 동부",
            "451": "아이치 현 서부",
            "460": "미에 현 북부",
            "461": "미에 현 중부",
            "462": "미에 현 남부",
            "469": "미에 현 남동해",
            "471": "이바라키 현 앞바다",
            "472": "관동동방해",
            "473": "치바 현 동방바다",
            "475": "하치조 섬 동방바다",
            "476": "하치조섬 근해",
            "477": "도쿄만",
            "478": "사가미 만",
            "480": "이즈오섬 근해",
            "481": "이즈반도 동방바다",
            "482": "미야케 섬 근해",
            "483": "니이섬・코즈섬 근해",
            "485": "스루가 만",
            "486": "스루가만 남방바다",
            "487": "엔슈나다",
            "489": "미카와 만",
            "490": "이세 만",
            "492": "와카사 만",
            "493": "후쿠이 현 앞바다",
            "494": "이시카와 현 서방바다",
            "495": "노토 반도 앞바다",
            "497": "도야마 만",
            "498": "사도 부근",
            "499": "도카이도 남방바다",
            "500": "시가 현 북부",
            "501": "시가 현 남부",
            "510": "교토 부 북부",
            "511": "교토 부 남부",
            "520": "오사카 부 북부",
            "521": "오사카부 남부",
            "530": "효고 현 북부",
            "531": "효고 현 남동부",
            "532": "효고 현 남서부",
            "540": "나라 현",
            "550": "와카야마 현 북부",
            "551": "와카야마 현 남부",
            "560": "돗토리 현 동부",
            "562": "돗토리 현 중부",
            "563": "돗토리 현 남부",
            "570": "시마네 현 동부",
            "571": "시마네 현 남부",
            "580": "오카야마 현 북부",
            "581": "오카야마 현 남부",
            "590": "히로시마 현 북부",
            "591": "히로시마 현 남동부",
            "592": "히로시마 현 남서부",
            "600": "도쿠시마 현 북부",
            "601": "도쿠시마 현 남부",
            "610": "카가와 현 동부",
            "611": "카가와 현 서부",
            "620": "에히메 현 토요",
            "621": "에히메 현 나카요",
            "622": "에히메 현 미나미요",
            "630": "고치 현 동부",
            "631": "고치 현 중부",
            "632": "고치 현 서부",
            "673": "토사만",
            "674": "기이수도",
            "675": "오사카만",
            "676": "하리마나다",
            "677": "세토 내해 중부",
            "678": "아키나다",
            "679": "스오나다",
            "680": "이요나다",
            "681": "분고 수도",
            "682": "야마구치 현 북서 해",
            "683": "시마네 현 앞바다",
            "684": "돗토리 현 앞바다",
            "685": "오키섬 앞바다",
            "686": "효고 현 북방 바다",
            "687": "교토 부 앞바다",
            "688": "아와지 섬 근해",
            "689": "와카야마 현 남방부",
            "700": "야마구치 현 북부",
            "702": "야마구치 현 서부",
            "703": "야마구치 현 동부",
            "704": "야마구치 현 중부",
            "710": "후쿠오카 현 후쿠오카 지방",
            "711": "후쿠오카 현 키타규슈 지방",
            "712": "후쿠오카 현 치쿠호",
            "713": "후쿠오카 현 치쿠고",
            "720": "사가 현 북부",
            "721": "사가 현 남부",
            "730": "나가사키 현 북부",
            "731": "나가사키 현 남서부",
            "732": "나가사키 현 시마바라 반도",
            "740": "구마모토 현 아소",
            "741": "구마모토 현 구마모토 지방",
            "742": "구마모토 현 쿠마 지방",
            "743": "구마모토현 아마쿠사・아시키타 지방",
            "750": "오이타 현 북부",
            "751": "오이타 현 중부",
            "752": "오이타 현 남부",
            "753": "오이타 현 서부",
            "760": "미야자키 현 북부 평야부",
            "761": "미야자키 현 북부 산기슭",
            "762": "미야자키 현 남부 평야부",
            "763": "미야자키 현 남부 산기슭",
            "770": "가고시마 현 사쓰마 지방",
            "771": "가고시마 현 오스미 지방",
            "783": "고토 열도 근해",
            "784": "야마쿠사 나다",
            "785": "아리아케 해",
            "786": "타치바나 만",
            "787": "가고시마 만",
            "790": "다네가시마 근해",
            "791": "히나타 나다",
            "793": "아마미오 섬 근해",
            "795": "이키・쓰시마 근해",
            "796": "후쿠오카 현 북서 해",
            "797": "사쓰마반도 서방바다",
            "798": "토카라열도 근해",
            "799": "아마미오 섬 북서해",
            "820": "오스미만도 동방바다",
            "821": "규슈지방 남동해",
            "822": "다네가 섬 남동해",
            "823": "아마미오 섬 북동해",
            "850": "오키나와 본섬 근해",
            "851": "미나미다이토 섬 근해",
            "852": "오키나와 본섬 남방바다",
            "853": "미야코지마 근해",
            "854": "이시가키 섬 근해",
            "855": "이시가키 섬 남방바다",
            "856": "이리오모테 섬 근해",
            "857": "요나구니 섬 근해",
            "858": "오키나와 본섬 북동해",
            "859": "미야코지마 북서해",
            "860": "이시가키 섬 북서해",
            "900": "대만 근해",
            "901": "동중국해",
            "902": "시코쿠 해",
            "903": "도리시마 섬 근해",
            "904": "도리시마 섬 동방바다",
            "905": "오호츠크 해남부",
            "906": "사할린 서방 바다",
            "907": "동해 북부",
            "908": "동해 중부",
            "909": "동해 서부",
            "911": "치치 섬 근해",
            "912": "쿠릴열도",
            "913": "쿠릴 열도 남동해",
            "914": "홋카이도 남동해",
            "915": "도호쿠 지방 동방바다",
            "916": "오가사와라 제도 서방바다",
            "917": "이오섬 근해",
            "918": "오가사와라 제도 동방바다",
            "919": "남해도 동방 바다",
            "920": "사쓰난 섬 동방 바다",
            "921": "혼슈 남방바다",
            "922": "사할린 남부 근해",
            "930": "북서 태평양",
            "932": "마리아나 제도",
            "933": "황해",
            "934": "한반도 남부",
            "935": "한반도 북부",
            "936": "중국 동북부",
            "937": "블라디보스토크 부근",
            "938": "시베리아 남부",
            "939": "사할린 근해",
            "940": "알류산 열도",
            "941": "캄챠카 반도 근해",
            "942": "북미 서부",
            "943": "북미 중부",
            "944": "북미 동부",
            "945": "미국",
            "946": "남미 서부",
            "947": "남미 중부",
            "948": "남미 동부",
            "949": "북동 태평양",
            "950": "남태평양",
            "951": "인도 차이나 반도 부근",
            "952": "필리핀 부근",
            "953": "인도네시아 부근",
            "954": "괌 부근",
            "955": "뉴기니 섬 부근",
            "956": "뉴질랜드 부근",
            "957": "호주 부근",
            "958": "시베리아 부근",
            "959": "러시아 서부",
            "960": "러시아 중부",
            "961": "러시아 동부",
            "962": "중앙 아시아",
            "963": "중국 서부",
            "964": "중국 중부",
            "965": "중국 동부",
            "966": "인도 부근",
            "967": "인도양",
            "968": "중동",
            "969": "유럽 서부",
            "970": "유럽 중부",
            "971": "유럽 동부",
            "972": "지중해",
            "973": "아프리카 서부",
            "974": "아프리카 중부",
            "975": "아프리카 동부",
            "976": "북대서양",
            "977": "남대서양",
            "978": "북극 부근",
            "979": "남극 부근",
            "999": "원지"
        }
        function searchValueInData(value) {
            for (var key in list) {
                if (key === value) {
                    return list[key];
                }
            }
            return "-";
        }
        document.getElementById('hypocenter').textContent = searchValueInData(hypocenter);
        try {
            region = jsonData.body.intensity.regions;
            var region_data, region_data_fore;
            var condition = []
            for (i = 0; i < region.length; i++) {
                var region_max_int, region_max_long_int;
                if (region[i].forecastMaxInt.to == 'over') {
                    region_max_int = region[i].forecastMaxInt.from + ' 정도 이상'
                } else {
                    if (region[i].forecastMaxInt.from == region[i].forecastMaxInt.to) {
                        region_max_int = region[i].forecastMaxInt.from
                    } else {
                        region_max_int = region[i].forecastMaxInt.from + ' ~ ' + region[i].forecastMaxInt.to;
                    }
                }
                if (region[i].forecastMaxLgInt.to == 'over') {
                    region_max_long_int = region[i].forecastMaxLgInt.from + ' 정도 이상'
                } else {
                    if (region[i].forecastMaxLgInt.from == region[i].forecastMaxLgInt.to) {
                        region_max_long_int = region[i].forecastMaxLgInt.from
                    } else {
                        region_max_long_int = region[i].forecastMaxLgInt.from + ' ~ ' + region[i].forecastMaxLgInt.to;
                    }
                }
                if ("condition" in region[i]) {
                    if (region[i].condition == '既に主要動到達と推測') {
                        condition.push('이미 주요동 도달로 추측')
                    } else {
                        condition.push(region[i].condition)
                    }
                } else {
                    condition.push((region[i].arrivalTime).slice(11, 19) + '경 도달 예측')
                }
                if (region[i].isPlum == false) {
                    region[i].isPlum = 'X'
                } else {
                    region[i].isPlum = 'O'
                }
                if (region[i].isWarning == false) {
                    region[i].isWarning = '예보'
                } else {
                    region[i].isWarning = '경보'
                }
                region_data += `[${region[i].isWarning}] ${searchValueInData(region[i].code)} : 예상진도(${region_max_int}), 예상계급(${region_max_long_int}) | ${condition[i]} | PLUM: ${region[i].isPlum} \n`

            }
            // console.log(region_data)
            document.getElementById('warning').textContent = region_data.slice(9,);
        } catch (error) {
            document.getElementById('warning').textContent = '지역별 예상 정보가 없습니다';
        }
    };

    reader.readAsText(file);
});
document.getElementById('yosou').addEventListener("click", function () {
    document.getElementById('yosou_box').style = 'display:block'
    document.getElementById('warning').style = 'display:block'
})