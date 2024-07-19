function wid_resize(){
    var w = window.innerWidth;
    var wid = w - 300;
    // console.log(wid);
    document.getElementById('map').style.width = wid + "px";
}

function hei_resize(){
    const rightHeight = document.getElementById('right').offsetHeight;
    const nowHeight = document.getElementById('now').offsetHeight;
    const heightDifference = rightHeight - nowHeight - 10;

    document.getElementById('yoho_container').style.maxHeight = heightDifference + 'px';
    document.getElementById('yoho_container').style.height = heightDifference + 'px';
}
window.addEventListener('resize', function () {
    wid_resize()
    hei_resize()
})
wid_resize()

function getClass(cls){
    var typcls
    switch(cls){
        case '台風(TY)':
            typcls = '태풍(TY)';
            break;
        case '台風(STS)':
            typcls = '태풍(STS)';
            break;
        case '台風(TS)':
            typcls = '태풍(TS)';
            break;
        case '熱帯低気圧(TD)':
            typcls = '열대저기압(TD)';
            break;
        case '“ハリケーン(Hurricane)':
            typcls = '허리케인(Hurricane)';
            break;
        case '“発達した熱帯低気圧(Tropical Storm)':
            typcls = '발달한 열대저기압(Tropical Storm)';
            break;
        case '温帯低気圧(LOW)':
            typcls = '온대저기압(LOW)';
            break;
    }
    return typcls
}

var map = L.map('map').setView([37.5665, 126.9780], 6); // 서울 좌표, 적절한 줌 레벨

// OpenStreetMap 타일을 추가합니다.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap, © 気象庁'
}).addTo(map);

function mon_day(time) {
    return `${time.slice(5, 7)}월 ${time.slice(8, 10)}일 ${time.slice(11, 13)}시 ${time.slice(14, 16)}분`
}

// 방향과 거리 데이터를 파싱하여 좌표를 계산하는 함수
function getLatLngFromDistanceAndDirection(lat, lng, distance, direction) {
    const R = 6371; // 지구 반지름 (단위: km)
    const d = distance / R; // 각 거리
    const radLat = lat * Math.PI / 180;
    const radLng = lng * Math.PI / 180;
    let bearing;

    switch (direction) {
        case '北':
            bearing = 0;
            break;
        case '北東':
            bearing = 45;
            break;
        case '東':
            bearing = 90;
            break;
        case '南東':
            bearing = 135;
            break;
        case '南':
            bearing = 180;
            break;
        case '南西':
            bearing = 225;
            break;
        case '西':
            bearing = 270;
            break;
        case '北西':
            bearing = 315;
            break;
        default:
            return [lat, lng];
    }

    const radBearing = bearing * Math.PI / 180;
    const newLat = Math.asin(Math.sin(radLat) * Math.cos(d) + Math.cos(radLat) * Math.sin(d) * Math.cos(radBearing));
    const newLng = radLng + Math.atan2(Math.sin(radBearing) * Math.sin(d) * Math.cos(radLat), Math.cos(d) - Math.sin(radLat) * Math.sin(newLat));

    return [newLat * 180 / Math.PI, newLng * 180 / Math.PI];
}

function long(direction) {
    var bearing
    switch (direction) {
        case '北':
            bearing = 0;
            break;
        case '北東':
            bearing = 45;
            break;
        case '東':
            bearing = 90;
            break;
        case '南東':
            bearing = 135;
            break;
        case '南':
            bearing = 180;
            break;
        case '南西':
            bearing = 225;
            break;
        case '西':
            bearing = 270;
            break;
        case '北西':
            bearing = 315;
            break;
    }
    return bearing
}
function dir_kr(direction) {
    var bearing
    switch (direction) {
        case '北':
            bearing = '북';
            break;
        case '北北東':
            bearing = '북북동';
            break;
        case '北東':
            bearing = '북동';
            break;
        case '東北東':
            bearing = '동북동';
            break;
        case '東':
            bearing = '동';
            break;
        case '東南東':
            bearing = '동남동';
            break;
        case '南東':
            bearing = '동남';
            break;
        case '南南東':
            bearing = '남남동';
            break;
        case '南':
            bearing = '남';
            break;
        case '南南西':
            bearing = '남남서';
            break;
        case '南西':
            bearing = '남서';
            break;
        case '西南西':
            bearing = '서남서';
            break;
        case '西':
            bearing = '서';
            break;
        case '西北西':
            bearing = '서북서';
            break;
        case '北西':
            bearing = '북서';
            break;
        case '北北西':
            bearing = '북북서';
            break;
    }
    return bearing
}
function speed_kr(spd) {
    var speed
    switch (spd) {
        case 'ゆっくり':
            speed = '느림';
            break;
        case 'ほとんど停滞':
            speed = '거의 정체';
            break;
    }
    return speed
}
function getSize(size) {
    if (size == '大型') {
        document.getElementById('now_size').style = 'display:block; background-color: red; color: white;';
        document.getElementById('now_size').textContent = '대형'
    } else if (size == '超大型') {
        document.getElementById('now_size').style = 'display:block; background-color: rgb(195, 0, 255); color: white';
        document.getElementById('now_size').textContent = '초대형'
    } else {
        document.getElementById('now_size').style = 'display:none;'
    }
}
function getStrength(str) {
    if (str == '強い') {
        document.getElementById('now_strength').style = 'display:block; background-color: yellow; color:black'
        document.getElementById('now_strength').textContent = '강'
    } else if (str == '非常に強い') {
        document.getElementById('now_strength').style = 'display:block; background-color: red; color: white;';
        document.getElementById('now_strength').textContent = '매우강'
    } else if (str == '猛烈な') {
        document.getElementById('now_strength').style = 'display:block; background-color: rgb(195,0,255); color:white';
        document.getElementById('now_strength').textContent = '맹렬한'
    } else {
        document.getElementById('now_strength').style = 'display:none'
    }
}

function getStrength_text(str){
    if (str == '強い') {
        return '강'
    } else if (str == '非常に強い') {
        return '매우강'
    } else if (str == '猛烈な') {
        return '맹렬한'
    } else {
        return '--'
    }
}

function getDestinationCoordinate(latitude, longitude, bearing, distance) {
    // 지구의 반지름 (단위: km)
    var radius = 6371.0;

    // 위도와 경도를 라디안으로 변환
    var lat1 = latitude * Math.PI / 180;
    var lon1 = longitude * Math.PI / 180;
    var bearingRad = bearing * Math.PI / 180;

    // 새로운 지점의 위도 계산
    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance / radius) +
        Math.cos(lat1) * Math.sin(distance / radius) * Math.cos(bearingRad));

    // 새로운 지점의 경도 계산
    var lon2 = lon1 + Math.atan2(Math.sin(bearingRad) * Math.sin(distance / radius) * Math.cos(lat1),
        Math.cos(distance / radius) - Math.sin(lat1) * Math.sin(lat2));

    // 위도와 경도를 도로 변환하여 반환
    return [lat2 * 180 / Math.PI, lon2 * 180 / Math.PI];
}
// 예시 입력 처리
function plotPointsFromInput(input, color, centerLatLng) {
    const center = centerLatLng;
    const directions = input.split(', ');
    const d = []
    const points = directions.map(direction => {
        const [distance, dir] = direction.split(' ');
        d.push(parseInt(distance.slice(0, -2)))
        return getLatLngFromDistanceAndDirection(center[0], center[1], parseFloat(distance), dir);
    });

    const totalDistance = directions.reduce((acc, direction) => {
        const [distance, dir] = direction.split(' ');
        return acc + parseFloat(distance);
    }, 0);
    const averageDistance = totalDistance / directions.length;
    // console.log(averageDistance)

    if (d[0] > d[1]) {
        var dir = directions[0].split(' ');
        var code = getDestinationCoordinate(centerLatLng[0], centerLatLng[1], long(dir[1]), d[0] - averageDistance)
        var newMarker = L.circle(code, {
            radius: averageDistance * 1000,
            color: color,
            fillColor: '#00ff0000'
        }).addTo(map)
    } else if (d[0] < d[1]) {
        var dir = directions[0].split(' ');
        var code = getDestinationCoordinate(centerLatLng[0], centerLatLng[1], long(dir[1]), d[1] - averageDistance)
        var newMarker = L.circle(code, {
            radius: averageDistance * 1000,
            color: color,
            fillColor: '#00ff0000'
        }).addTo(map)
    } else {
        var newMarker = L.circle(centerLatLng, {
            radius: d[0] * 1000,
            color: color,
            fillColor: '#00ff0000'
        }).addTo(map)
    }
}

const button = document.getElementById('fetch-data-btn');
const inputId = document.getElementById('input-id');
const dataContainer = document.getElementById('data-container');

button.addEventListener('click', () => {
    const id = inputId.value.trim();
    if (id) {
        fetchDataAndDisplay(id);
    } else {
        alert('전문 ID 입력하세요.');
    }
});

function getCoordinate(cord) {
    var centerCord
    if(cord.length == 12){
        centerCord = [cord.slice(1, 5), cord.slice(6, -1)]
    }else if(cord.length == 11){
        centerCord = [cord.slice(1, 4), cord.slice(5, -1)]
    }
    return centerCord
}

var now_typhoon_center = L.icon({
    iconUrl: './typhoon.svg',
    iconSize: [25, 25]
})

function fetchDataAndDisplay(id) {
    const apiUrl = `https://data.api.dmdata.jp/v1/${id}?key=AKe.YkzgIvL0rBrQlre-bBOkGHFRoNTs_CBldPIyxvp3aoFJ`; // 실제 API URL로 교체하세요

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('문제가 발생했습니다.');
            }
            return response.text();
        })
        .then(xmlText => {
            const yohoContainer = document.getElementById('yoho_container');
            while (yohoContainer.firstChild) {
                yohoContainer.removeChild(yohoContainer.firstChild);
            }
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");
            // console.log(xmlDoc)

            var body = xmlDoc.querySelector('Body')
            console.log(body)
            var center_line = []

            //실황
            var now = body.querySelector('MeteorologicalInfo:nth-of-type(1) > Item')
            //중심
            var center_source = now.querySelector('Kind:nth-of-type(3) > Property > CenterPart')
            var centerLatLng = getCoordinate(center_source.querySelector('Coordinate:nth-of-type(1)').textContent);
            center_line.push(centerLatLng);
            L.marker(centerLatLng, { icon: now_typhoon_center }).addTo(map);
            var remark = now.querySelector('Kind:nth-of-type(1) > Property > TyphoonNamePart > Remark').textContent

            //내용
            document.getElementById('typ_serial').textContent = `태풍 제${(now.querySelector('Number').textContent).slice(-2,)}호`
            document.getElementById('publish_time').textContent = `${mon_day(xmlDoc.querySelector('ReportDateTime').textContent)} 발표`
            document.getElementById('now_time').textContent = `${mon_day(body.querySelector('MeteorologicalInfo:nth-of-type(1) > DateTime').textContent)} 현재`

            document.getElementById('center_hpa').textContent = center_source.querySelector('Pressure').textContent
            // console.log(now)

            var conditionTag = center_source.getElementsByTagName('jmx_eb:Coordinate')[0];
            var condition = conditionTag.getAttribute('condition');
            if (condition == '正確') {
                condition = '정확'
            } else if (condition == 'ほぼ正確') {
                condition = '거의 정확'
            } else if (condition == '不正確') {
                condition = '부정확'
            } else {
                condition = '--'
            }
            document.getElementById('acc').textContent = condition;
            
            var dir = center_source.querySelector('Direction').textContent
            if (dir == '') {
                dir = '부정'
            } else {
                dir = dir_kr(dir)
            }
            document.getElementById('mov_dir').textContent = dir

            var speed = center_source.querySelector('Speed:nth-of-type(2)')
            if (speed.textContent == '') {
                document.getElementById('mov_spd').textContent = speed_kr(speed.getAttribute('condition'))
                document.getElementById('mov_tan').style = 'display:none;'
                document.getElementById('mov_spd').style = 'font-size:1.5em;'
            } else {
                document.getElementById('mov_spd').textContent = speed.textContent;
                document.getElementById('mov_tan').style = 'display:block;'
                document.getElementById('mov_spd').style = 'font-size:27px;'
            }
            //등급
            var typ_prop = now.querySelector('Property > ClassPart')
            getSize(typ_prop.querySelector('AreaClass').textContent)
            getStrength(typ_prop.querySelector('IntensityClass').textContent)
            console.log(remark)
            document.getElementById('now_class').textContent = getClass(typ_prop.querySelector('TyphoonClass').textContent)
            if (remark == '台風消滅（熱帯低気圧化）' || remark == '台風消滅（域外へ出る）' || remark == '台風消滅（温帯低気圧化）') {
                document.getElementById('remark').textContent = '이 태풍은 소멸했습니다.';
                document.getElementById('center_max_wind_speed').textContent = '--';
                document.getElementById('center_max_shun_wind_speed').textContent = '--';
            } else {
                if(remark == '台風発生'){
                    document.getElementById('remark').textContent = '태풍이 발생했습니다.'
                }
                //바람
                var cen_wind = now.querySelector('Kind:nth-of-type(4)')
                //강풍역
                cen_yellow = cen_wind.querySelector('WarningAreaPart:nth-of-type(2)')
                try {
                    var fir = `${cen_yellow.querySelector('Axis:nth-of-type(1) > Radius:nth-of-type(2)').textContent}km ${cen_yellow.querySelector('Axis:nth-of-type(1) > Direction').textContent} `
                    var sec = `${cen_yellow.querySelector('Axis:nth-of-type(2) > Radius:nth-of-type(2)').textContent}km ${cen_yellow.querySelector('Axis:nth-of-type(2) > Direction').textContent} `
                    plotPointsFromInput(`${fir}, ${sec}`, 'yellow', centerLatLng);
                } catch (error) {
                    var rad = cen_yellow.querySelector('Axis > Radius:nth-of-type(2)').textContent
                    console.log(rad)
                    if(rad == ''){
                        document.getElementById('remark').textContent = '태풍의 발생이 예상됩니다.'
                        document.getElementById('typ_serial').textContent = '태풍 발생 예상'
                    }else{
                        plotPointsFromInput(`${rad}km 北, ${rad}km 南`, 'yellow', centerLatLng)
                    }
                } 
                //폭풍역
                cen_red = cen_wind.querySelector('WarningAreaPart:nth-of-type(1)')
                if (cen_red.querySelector('Axis:nth-of-type(1) > Radius:nth-of-type(2)').textContent == '') {
                    //폭풍역 없음
                } else {
                    try {
                        var fir = `${cen_red.querySelector('Axis:nth-of-type(1) > Radius:nth-of-type(2)').textContent}km ${cen_red.querySelector('Axis:nth-of-type(1) > Direction').textContent} `
                        var sec = `${cen_red.querySelector('Axis:nth-of-type(2) > Radius:nth-of-type(2)').textContent}km ${cen_red.querySelector('Axis:nth-of-type(2) > Direction').textContent} `
                        plotPointsFromInput(`${fir}, ${sec}`, 'red', centerLatLng);
                    } catch (error) {
                        var rad = cen_red.querySelector('Axis > Radius:nth-of-type(2)').textContent;
                        plotPointsFromInput(`${rad}km 北, ${rad}km 南`, 'red', centerLatLng)
                    }
                }

                //내용
                document.getElementById('center_max_wind_speed').textContent = cen_wind.querySelector('WindPart > WindSpeed:nth-of-type(2)').textContent
                document.getElementById('center_max_shun_wind_speed').textContent = cen_wind.querySelector('WindPart > WindSpeed:nth-of-type(4)').textContent;

                hei_resize()
                //예보
                const forecast = xmlDoc.querySelectorAll('MeteorologicalInfos > MeteorologicalInfo');

                for (i = 1; i < forecast.length; i++) {
                    // console.log(forecast[i])
                    var items = forecast[i]
                    //예보원 및 정보
                    var for_center = items.querySelector('Item > Kind:nth-of-type(2)')
                    try {
                        var rad = for_center.querySelector('Property > CenterPart > ProbabilityCircle > Axes > Axis > Radius:nth-of-type(2)').textContent;
                        var basepoint = for_center.querySelector('Property > CenterPart > ProbabilityCircle > BasePoint:nth-of-type(1)').textContent;
                        var prop = { color: 'white;', dashArray: '5, 5', dashOffset: 0 }
                        plotPointsFromInput(`${rad}km 北, ${rad}km 南`, 'white', getCoordinate(basepoint))
                        center_line.push(getCoordinate(basepoint))

                        var yohoTimeIcon = L.divIcon({
                            className: 'yoho_time_icon',
                            html: `<div class="yoho_time_icon_label" style="font-family: 'NanumSquareNeoBold'; width: 200px;">${mon_day(items.querySelector('DateTime').textContent).slice(3,-3)} 예보</div>`
                        })
                        L.marker(getLatLngFromDistanceAndDirection(getCoordinate(basepoint)[0], getCoordinate(basepoint)[1], parseInt(rad) + 5, "南東"), { icon: yohoTimeIcon }).addTo(map);

                        //폭풍경계역
                        var yoho_red = items.querySelector('Item > Kind:nth-of-type(3) > Property > WarningAreaPart')
                        console.log(yoho_red)
                        if(yoho_red.querySelector('Circle > Axes > Axis > Radius').textContent == ''){
                            // console.log('폭풍경계역 없음')
                        }else{
                            var red_cir = yoho_red.querySelector('Circle > Axes > Axis')
                            try{
                                var fir = `${red_cir.querySelector('Axis:nth-of-type(1) > Radius:nth-of-type(2)').textContent}km ${cen_yellow.querySelector('Axis:nth-of-type(1) > Direction').textContent}`
                                var sec = `${red_cir.querySelector('Axis:nth-of-type(2) > Radius:nth-of-type(2)').textContent}km ${cen_yellow.querySelector('Axis:nth-of-type(2) > Direction').textContent}`
                                plotPointsFromInput(`${fir}, ${sec}`, 'red', getCoordinate(basepoint));
                            }catch(error){
                                var rad = red_cir.querySelector('Axis > Radius:nth-of-type(2)').textContent
                                plotPointsFromInput(`${rad}km 北, ${rad}km 南`, 'red', getCoordinate(basepoint))
                            }
                        }

                        //사이드바 정보
                        //c15c3e6a4092fca95e1c6b27eaba50d4f585ff10273dd995db546f18b2488064ce6e7e815c615305cfdd29b622f30d15
                        const info_container = document.getElementById('yoho_container');

                        const divElement = document.createElement('div');
                        divElement.className = 'yoho_box';
                        
                        const targetClass = document.createElement('p');
                        targetClass.textContent = getClass(items.querySelector('Item > Kind:nth-of-type(1) > Property > ClassPart > TyphoonClass').textContent)
                        targetClass.className = 'yoho_class';
                        divElement.appendChild(targetClass)


                        const targetTime = document.createElement('p');
                        targetTime.textContent = `${mon_day(items.querySelector('DateTime').textContent).slice(0,-3)} 예보`;
                        targetTime.className = 'yoho_targetTime'
                        divElement.appendChild(targetTime)

                        const divBox = document.createElement('div');
                        divBox.className = 'under';

                        const divHPa = document.createElement('div');
                        divHPa.className = 'under_box'; 
                        const titleHPa = document.createElement('h3');
                        titleHPa.textContent = '중심기압';
                        divHPa.appendChild(titleHPa);
                        const divHPa_div = document.createElement('div');
                        const infoHPa = document.createElement('h2');
                        infoHPa.className = 'yoho_hPa';
                        infoHPa.textContent = for_center.querySelector('Pressure').textContent
                        divHPa_div.appendChild(infoHPa);
                        const divHPa_tan = document.createElement('p');
                        divHPa_tan.className = 'yoho_tan';
                        divHPa_tan.textContent = ` hPa`
                        divHPa_div.appendChild(divHPa_tan);
                        divHPa.appendChild(divHPa_div)
                        divBox.appendChild(divHPa)

                        const divMaxSpeed = document.createElement('div');
                        divMaxSpeed.className = 'under_box'; 
                        const titleMaxSpeed = document.createElement('h3');
                        titleMaxSpeed.textContent = '최대풍속';
                        divMaxSpeed.appendChild(titleMaxSpeed);
                        const divMaxSpeed_div = document.createElement('div');
                        const infoMaxSpeed = document.createElement('h2');
                        infoMaxSpeed.className = 'yoho_maxSpeed';
                        infoMaxSpeed.textContent = items.querySelector('Item > Kind:nth-of-type(3) > Property > WindPart > WindSpeed:nth-of-type(2)').textContent
                        divMaxSpeed_div.appendChild(infoMaxSpeed);
                        const divMaxSpeed_tan = document.createElement('p');
                        divMaxSpeed_tan.className = 'yoho_tan';
                        divMaxSpeed_tan.textContent = ` m/s`
                        divMaxSpeed_div.appendChild(divMaxSpeed_tan);
                        divMaxSpeed.appendChild(divMaxSpeed_div)
                        divBox.appendChild(divMaxSpeed)


                        const divStr = document.createElement('div');
                        divStr.className = 'under_box';
                        const titleStr = document.createElement('h3');
                        titleStr.textContent = '강도';
                        divStr.appendChild(titleStr);
                        const infoStr = document.createElement('h2');
                        infoStr.className = 'yoho_str';
                        infoStr.textContent = getStrength_text(items.querySelector('Item > Kind:nth-of-type(1) > Property > ClassPart > IntensityClass').textContent)
                        divStr.appendChild(infoStr)
                        divBox.appendChild(divStr)

                        const divMaxIntSpeed = document.createElement('div');
                        divMaxIntSpeed.className = 'under_box'; 
                        const titleMaxIntSpeed = document.createElement('h3');
                        titleMaxIntSpeed.textContent = '최대순간풍속';
                        divMaxIntSpeed.appendChild(titleMaxIntSpeed);
                        const divMaxIntSpeed_div = document.createElement('div');
                        const infoMaxIntSpeed = document.createElement('h2');
                        infoMaxIntSpeed.className = 'yoho_MaxIntSpeed';
                        infoMaxIntSpeed.textContent = items.querySelector('Item > Kind:nth-of-type(3) > Property > WindPart > WindSpeed:nth-of-type(4)').textContent
                        divMaxIntSpeed_div.appendChild(infoMaxIntSpeed);
                        const divMaxIntSpeed_tan = document.createElement('p');
                        divMaxIntSpeed_tan.className = 'yoho_tan';
                        divMaxIntSpeed_tan.textContent = ` m/s`
                        divMaxIntSpeed_div.appendChild(divMaxIntSpeed_tan);
                        divMaxIntSpeed.appendChild(divMaxIntSpeed_div)
                        divBox.appendChild(divMaxIntSpeed)

                        
                        const divMoveDir = document.createElement('div');
                        divMoveDir.className = 'under_box';
                        const titleMoveDir = document.createElement('h3');
                        titleMoveDir.textContent = '이동방향';
                        divMoveDir.appendChild(titleMoveDir);
                        const infoMoveDir = document.createElement('h2');
                        infoMoveDir.className = 'yoho_MoveDir';
                        infoMoveDir.textContent = dir_kr(for_center.querySelector('Property > CenterPart > Direction').textContent)
                        divMoveDir.appendChild(infoMoveDir)
                        divBox.appendChild(divMoveDir)

                        var for_speed = for_center.querySelector('Speed:nth-of-type(2)')
                        const divMoveSpeed = document.createElement('div');
                        divMoveSpeed.className = 'under_box'; 
                        const titleMoveSpeed = document.createElement('h3');
                        titleMoveSpeed.textContent = '이동속도';
                        divMoveSpeed.appendChild(titleMoveSpeed);
                        const divMoveSpeed_div = document.createElement('div');
                        const infoMoveSpeed = document.createElement('h2');
                        infoMoveSpeed.className = 'yoho_MoveSpeed';
                        divMoveSpeed_div.appendChild(infoMoveSpeed);
                        const divMoveSpeed_tan = document.createElement('p');
                        divMoveSpeed_tan.className = 'yoho_tan';
                        divMoveSpeed_tan.textContent = `km/h`
                        if(for_speed.textContent != ''){
                            divMoveSpeed_div.appendChild(divMoveSpeed_tan);
                            infoMoveSpeed.textContent = for_speed.textContent;
                        }else{
                            infoMoveSpeed.textContent = speed_kr(for_speed.getAttribute('condition'))
                        }
                        divMoveSpeed.appendChild(divMoveSpeed_div)
                        divBox.appendChild(divMoveSpeed)


                        divElement.appendChild(divBox)
                        info_container.append(divElement);
                    } catch (error) {
                        console.log(error)
                    }
                }
                var center_lines = L.polyline(center_line, {
                    color: 'white', dashArray: '10, 10',
                    dashOffset: '0', weight: 2
                }).addTo(map);
                map.fitBounds(center_lines.getBounds());
                hei_resize()
            }


        })
}
// plotPointsFromInput('500km 北, 500km 南', 'red', [34.36550442888604, 132.43116442051286])