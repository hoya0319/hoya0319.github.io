// URL에서 lat과 long 매개변수 값을 가져오는 함수
function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// 기본 중심 좌표와 줌 레벨 설정
var defaultLat = 36.5;
var defaultLong = 127.5;
var defaultZoom = 7;

// URL에서 lat과 long 매개변수 값을 가져옴
var userLat = getParameterByName('lat');
var userLong = getParameterByName('lon');
var userZoom = getParameterByName('zoom');

// 사용자 입력값이 있는 경우 해당 위치로 지도의 중심을 설정
// 입력값이 없는 경우 기본값으로 설정
var centerLat = userLat ? parseFloat(userLat) : defaultLat;
var centerLong = userLong ? parseFloat(userLong) : defaultLong;
var zoomLevel = userZoom ? parseFloat(userZoom) : defaultZoom

// 지도 생성 및 중심 위치 설정
var map = L.map('map').setView([centerLat, centerLong], zoomLevel);
// URL에서 기존 좌표값 가져오기
var lat = parseFloat(getParameterByName('lat'));
var lon = parseFloat(getParameterByName('lon'));
var zoom = parseInt(getParameterByName('zoom'));

// 지도 이동 이벤트 핸들러
function onMapMove(e) {
    var center = map.getCenter();
    var newUrl = window.location.origin + '?lat=' + center.lat.toFixed(6) + '&lon=' + center.lng.toFixed(6) + '&zoom=' + map.getZoom();
    window.history.pushState({ path: newUrl }, '', newUrl);
}

// 지도 이동 이벤트 등록
map.on('moveend', onMapMove);

// 기존 좌표값이 있는 경우 해당 좌표로 지도 중심 이동
if (!isNaN(lat) && !isNaN(lon)) {
    map.setView([lat, lon], zoom || 7);
}
// 타일 레이어 추가
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 20,
}).addTo(map);

//first 지우기
document.getElementById('first_close').addEventListener('click', function () {
    document.getElementById('first').style = 'display:none'
    document.getElementById('back').style = 'display:none'
})

var now_loc = L.icon({
    iconUrl: './resource/loc.png',
    iconSize: [35, 35],
})
const locMarker = L.layerGroup().addTo(map)

//투고 시 위치정보 수동
function onMapClick(e) {
    locMarker.clearLayers();
    var latitude = e.latlng.lat.toFixed(6);
    var longitude = e.latlng.lng.toFixed(6);

    document.getElementById('input_lat').value = latitude;
    document.getElementById('input_lon').value = longitude;
    var now_loc_marker = L.marker([latitude, longitude], { icon: now_loc }).addTo(map)
    locMarker.addLayer(now_loc_marker)
}
map.on('click', onMapClick);

//위치정보 수집
document.getElementById('now_location').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    var options = {
        enableHighAccuracy: true
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(moveNowLoc, showError, options);
    } else {
        console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
});
var now_icon = L.icon({
    iconUrl: './resource/now.svg',
    iconSize: [25, 25]
})
function moveNowLoc(position) {
    const latitude = position.coords.latitude.toFixed(6);
    const longitude = position.coords.longitude.toFixed(6);

    map.setView([latitude, longitude], 15);
    L.marker([latitude, longitude], { icon: now_icon }).addTo(map);
}
document.getElementById('auto').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지
    var options = {
        enableHighAccuracy: true
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else {
        console.error('Geolocation을 지원하지 않는 브라우저입니다.');
    }
});
function showPosition(position) {
    locMarker.clearLayers();
    const latitude = position.coords.latitude.toFixed(6);
    const longitude = position.coords.longitude.toFixed(6);

    document.getElementById('input_lat').value = latitude;
    document.getElementById('input_lon').value = longitude;

    var now_loc_marker = L.marker([latitude, longitude], { icon: now_loc }).addTo(map)
    locMarker.addLayer(now_loc_marker)
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error('위치 정보 요청이 거부되었습니다.');
            break;
        case error.POSITION_UNAVAILABLE:
            console.error('위치 정보를 사용할 수 없습니다.');
            break;
        case error.TIMEOUT:
            console.error('위치 정보 요청이 시간 초과되었습니다.');
            break;
        case error.UNKNOWN_ERROR:
            console.error('알 수 없는 오류가 발생했습니다.');
            break;
    }
}


/**disasterType의 데이터를 한국어로 변환시켜줍니다.*/
function getDisasterDescription(disasterType) {
    let disaster = '';

    for (let j = 0; j < disasterType.length; j++) {
        switch (disasterType[j]) {
            case 'earthquake':
                disaster += '지진, ';
                break;
            case 'heavyrain':
                disaster += '폭우, ';
                break;
            case 'lightning':
                disaster += '번개, ';
                break;
            case 'landslide':
                disaster += '산사태, ';
                break;
            case 'flood':
                disaster += '홍수, ';
                break;
            case 'fire':
                disaster += '화재, ';
                break;
            case 'hot':
                disaster += '폭염, ';
                break;
            case 'cold':
                disaster += '한파, ';
                break;
            case 'heavysnow':
                disaster += '폭설, ';
                break;
            case 'wind':
                disaster += '강풍, ';
                break;
            case 'tornado':
                disaster += '토네이도, ';
                break;
            case 'tsunami':
                disaster += '지진해일, ';
                break;
            case 'surge':
                disaster += '폭풍해일, ';
                break;
            case 'pollution':
                disaster += '대기오염, ';
                break;
            case 'social':
                disaster += '사회재난, ';
                break;
            case 'volcano':
                disaster += '화산, ';
                break;
            case 'etc':
                disaster += '기타재해, ';
                break;
        }
    }

    // 마지막 쉼표(,) 제거
    if (disaster.length > 0) {
        disaster = disaster.slice(0, -2);
    }

    return disaster;
}
/**situationType의 데이터를 한국어로 변환시켜줍니다.*/
function getSituationDescription(situationType) {
    let situation = '';
    switch (situationType) {
        case 'occur':
            situation = '재해 발생!';
            break;
        case 'occur_bf':
            situation = '재해 발생 직전';
            break;
        case 'danger':
            situation = '위험 감지';
            break;
        case 'difference':
            situation = '평소와 다름';
            break;
        case 'usual':
            situation = '평소';
            break;
    }
    return situation;
}

//시간
var nowDate = new Date();
//유효시각
var validTime = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000)

//아이콘들
const earthquake = L.divIcon({
    className: 'earthquake',
    html: '<i class="fa-solid fa-house-crack" style="font-size:20px; margin-left:-5px; margin-top:-10px;"></i>'
})
const heavyrain = L.divIcon({
    className: 'heavyrain',
    html: '<i class="fa-solid fa-cloud-showers-heavy" style="font-size:20px; margin-left:-4px; margin-top:-10px;"></i>'
})
const lightning = L.divIcon({
    className: 'lightning',
    html: '<i class="fa-solid fa-bolt-lightning" style="font-size:20px; margin-left:-1px; margin-top:-3px;"></i>'
})
const landslide = L.divIcon({
    className: 'landslide',
    html: '<i class="fa-solid fa-mountain" style="font-size:20px; margin-left:-4px; margin-top:-10px;"></i>'
})
const flood = L.divIcon({
    className: 'flood',
    html: '<i class="fa-solid fa-house-flood-water" style="font-size:20px; margin-left:-5.5px; margin-top:-10px;"></i>'
})
const fire = L.divIcon({
    className: 'fire',
    html: '<i class="fa-solid fa-fire" style="font-size:20px; margin-left:-3px; margin-top:-6px;"></i>'
})
const hot = L.divIcon({
    className: 'hot',
    html: '<i class="fa-solid fa-sun" style="font-size:20px; margin-left:-4px; margin-top:-4px;"></i>'
})
const cold = L.divIcon({
    className: 'cold',
    html: '<i class="fa-solid fa-snowflake" style="font-size:20px; margin-left:-3px; margin-top:-4px;"></i>'
})
const heavysnow = L.divIcon({
    className: 'heavysnow',
    html: '<i class="fa-solid fa-cloud-meatball" style="font-size:20px; margin-left:-4px; margin-top:-4px;"></i>'
})
const wind = L.divIcon({
    className: 'wind',
    html: '<i class="fa-solid fa-wind" style="font-size:20px; margin-left:-4px; margin-top:-4px;"></i>'
})
const tornado = L.divIcon({
    className: 'tornado',
    html: '<i class="fa-solid fa-tornado" style="font-size:20px; margin-left:-3px; margin-top:-3px;"></i>'
})
const tsunami = L.divIcon({
    className: 'tsunami',
    html: '<i class="fa-solid fa-house-tsunami" style="font-size:20px; margin-left:-6px; margin-top:-4px;"></i>'
})
const surge = L.divIcon({
    className: 'surge',
    html: '<i class="fa-solid fa-water" style="font-size:20px; margin-left:-5px; margin-top:-5px;"></i>'
})
const pollution = L.divIcon({
    className: 'pollution',
    html: '<i class="fa-solid fa-smog" style="font-size:20px; margin-left:-6px; margin-top:-4px;"></i>'
})
const social = L.divIcon({
    className: 'social',
    html: '<i class="fa-solid fa-triangle-exclamation" style="font-size:20px; margin-left:-4px; margin-top:-6px;"></i>'
})
const volcano = L.divIcon({
    className: 'volcano',
    html: '<i class="fa-solid fa-volcano" style="font-size:20px; margin-left:-4px; margin-top:-6px;"></i>'
})
const etc = L.divIcon({
    className: 'etc',
    html: '<i class="fa-solid fa-ellipsis" style="font-size:20px; margin-left:-3px; margin-top:-4px;"></i>'
})
const twoPlus = L.divIcon({
    className: 'twoPlus',
    html: '<i class="fa-solid fa-plus" style="font-size:20px; margin-left:-3px; margin-top:-4px;"></i>'
})
const red = L.icon({
    iconUrl: './resource/red.svg',
    iconSize: [32, 32]
})
const orange = L.icon({
    iconUrl: './resource/orange.svg',
    iconSize: [32, 32]
})
const yellow = L.icon({
    iconUrl: './resource/yellow.svg',
    iconSize: [32, 32]
})
const gray = L.icon({
    iconUrl: './resource/gray.svg',
    iconSize: [32, 32]
})
const white = L.icon({
    iconUrl: './resource/white.svg',
    iconSize: [32, 32]
})

markerData = {
    "response": {
        "header": {
            "resultCode": "200"
        },
        "body": {
            "dataType": "json",
            "data": {
                "reports": [
                    {
                        "name": "테스트예용~",
                        "id": "0",
                        "pressTime": "2023-06-01T12:52:42.353Z",
                        "validTime": "2023-06-04T11:52:42.353Z",
                        "location": [
                            "36.507381",
                            "126.922263"
                        ],
                        "disasterType": [
                            "earthquake"
                        ],
                        "situationType": "occur",
                        "comment": "우리 집이 무너져쓰요!"
                    },
                    {
                        "name": "asdf~",
                        "id": "0",
                        "pressTime": "2023-06-02T12:52:42.353Z",
                        "validTime": "2023-06-04T11:52:42.353Z",
                        "location": [
                            "37.507381",
                            "126.922263"
                        ],
                        "disasterType": [
                            "tsunami"
                        ],
                        "situationType": "occur_bf",
                        "comment": "뭐임"
                    },
                    {
                        "name": "3",
                        "id": "0",
                        "pressTime": "2023-06-03T12:52:42.353Z",
                        "validTime": "2023-06-04T11:52:42.353Z",
                        "location": [
                            "37.507381",
                            "127.922263"
                        ],
                        "disasterType": [
                            "flood"
                        ],
                        "situationType": "danger",
                        "comment": "으앙"
                    },
                    {
                        "name": "4",
                        "id": "0",
                        "pressTime": "2023-06-04T12:52:42.353Z",
                        "validTime": "2023-06-04T11:52:42.353Z",
                        "location": [
                            "36.507381",
                            "127.722263"
                        ],
                        "disasterType": [
                            "cold"
                        ],
                        "situationType": "difference",
                        "comment": "으앙"
                    },
                    {
                        "name": "5",
                        "id": "0",
                        "pressTime": "2023-06-05T12:52:42.353Z",
                        "validTime": "2023-06-04T11:52:42.353Z",
                        "location": [
                            "37.807381",
                            "126.222263"
                        ],
                        "disasterType": [
                            "volcano"
                        ],
                        "situationType": "usual",
                        "comment": "으앙"
                    },
                    {
                        "name": "6",
                        "id": "0",
                        "pressTime": "2023-06-06T12:52:42.353Z",
                        "validTime": "2023-06-04T11:52:42.353Z",
                        "location": [
                            "37.807381",
                            "126.662263"
                        ],
                        "disasterType": [
                            "landslide"
                        ],
                        "situationType": "usual",
                        "comment": "으앙"
                    },
                    {
                        "name": "7",
                        "id": "0",
                        "pressTime": "2023-06-09T12:52:42.353Z",
                        "validTime": "2023-06-10T11:52:42.353Z",
                        "location": [
                            "38.007381",
                            "127.262263"
                        ],
                        "disasterType": [
                            "lightning"
                        ],
                        "situationType": "occur",
                        "comment": "노구라 1초에 2번씩 치는중ㄷㄷㄷ"
                    }
                ]
            }
        }
    }
}

var markers = [];
const reportMarker = L.layerGroup().addTo(map);
var markerId = 0;
var data = markerData.response.body.data.reports
function situationStyle(type){
    var situation_style = document.getElementById('situation')
    if(type=='occur'){
        situation_style.style = 'background-color: rgb(255, 0, 0); display:block; color:white;'
    } else if(type=='occur_bf'){
        situation_style.style = 'background-color: rgb(255, 125, 0); display:block; color:black;'
    } else if(type=='danger'){
        situation_style.style = 'background-color: rgb(255, 244, 0); display:block; color:black;'
    } else if(type=='difference'){
        situation_style.style = 'background-color: rgb(131, 131, 131); display:block; color:black;'
    } else if(type=='usual'){
        situation_style.style = 'background-color: rgb(228, 228, 228); display:block; color:black;'
    }
    document.getElementById('notification').style = 'display:block'
}


//마커
function pingReportMarker() {
    for (var i = 0; i < data.length; i++) {
        var markerData = data[i]; // 마커에 대한 데이터

        // 마커 생성
        if (markerData.situationType == 'occur') {
            var marker = L.marker(markerData.location, { icon: red }).addTo(map);
        } else if (markerData.situationType == 'occur_bf') {
            var marker = L.marker(markerData.location, { icon: orange }).addTo(map);
        } else if (markerData.situationType == 'danger') {
            var marker = L.marker(markerData.location, { icon: yellow }).addTo(map);
        } else if (markerData.situationType == 'difference') {
            var marker = L.marker(markerData.location, { icon: gray }).addTo(map);
        } else if (markerData.situationType == 'usual') {
            var marker = L.marker(markerData.location, { icon: white }).addTo(map);
        }
        reportMarker.addLayer(marker)
        if ((markerData.disasterType).length == 1) {
            if (markerData.disasterType == 'earthquake') {
                marker = L.marker(markerData.location, { icon: earthquake }).addTo(map);
            } else if (markerData.disasterType == 'heavyrain') {
                marker = L.marker(markerData.location, { icon: heavyrain }).addTo(map);
            } else if (markerData.disasterType == 'lightning') {
                marker = L.marker(markerData.location, { icon: lightning }).addTo(map);
            } else if (markerData.disasterType == 'landslide') {
                marker = L.marker(markerData.location, { icon: landslide }).addTo(map);
            } else if (markerData.disasterType == 'flood') {
                marker = L.marker(markerData.location, { icon: flood }).addTo(map);
            } else if (markerData.disasterType == 'fire') {
                marker = L.marker(markerData.location, { icon: fire }).addTo(map);
            } else if (markerData.disasterType == 'hot') {
                marker = L.marker(markerData.location, { icon: hot }).addTo(map);
            } else if (markerData.disasterType == 'cold') {
                marker = L.marker(markerData.location, { icon: cold }).addTo(map);
            } else if (markerData.disasterType == 'heavysnow') {
                marker = L.marker(markerData.location, { icon: heavysnow }).addTo(map);
            } else if (markerData.disasterType == 'wind') {
                marker = L.marker(markerData.location, { icon: wind }).addTo(map);
            } else if (markerData.disasterType == 'tornado') {
                marker = L.marker(markerData.location, { icon: tornado }).addTo(map);
            } else if (markerData.disasterType == 'tsunami') {
                marker = L.marker(markerData.location, { icon: tsunami }).addTo(map);
            } else if (markerData.disasterType == 'surge') {
                marker = L.marker(markerData.location, { icon: surge }).addTo(map);
            } else if (markerData.disasterType == 'pollution') {
                marker = L.marker(markerData.location, { icon: pollution }).addTo(map);
            } else if (markerData.disasterType == 'social') {
                marker = L.marker(markerData.location, { icon: social }).addTo(map);
            } else if (markerData.disasterType == 'volcano') {
                marker = L.marker(markerData.location, { icon: volcano }).addTo(map);
            } else if (markerData.disasterType == 'etc') {
                marker = L.marker(markerData.location, { icon: etc }).addTo(map);
            }
            reportMarker.addLayer(marker)
        } else {
            marker = L.marker(markerData.location, { icon: twoPlus }).addTo(map);
            reportMarker.addLayer(marker)
        }

        marker.id = i;
        marker.on('click', function () {
            // 클릭한 마커의 id와 같은 index에 있는 내용을 출력합니다.
            var content = data[this.id];
            // console.log(this.id)

            //재해 종류
            var disasterType = content.disasterType;
            //상황

            document.getElementById('see_report_title').textContent = `${content.name}님의 보고`
            document.getElementById('report_time').textContent = timeFunction(content.pressTime)+ ' 기준'
            document.getElementById('disaster').textContent = getDisasterDescription(disasterType) + ' 보고'
            document.getElementById('situation').textContent = getSituationDescription(content.situationType);
            document.getElementById('comment').textContent = content.comment;
            map.setView(content.location, 12)
            situationStyle(content.situationType)
        });
    }
    document.getElementById('name').value = ''
    document.getElementById('input_lat').value = ''
    document.getElementById('input_lon').value = ''
    document.getElementById('explain').value = ''
}
pingReportMarker()

//보고 버튼
var loc = [];
document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault(); // 폼 제출의 기본 동작 방지

    //정보 수집
    var disaster = document.getElementById('disaster_type');
    var selectedOptions = Array.from(disaster.selectedOptions).map(function (option) {
        return option.value;
    });

    if (email == null) {
        alert('로그인이 필요합니다.')
        window.location.replace("http://" + window.location.hostname + ((location.port == "" || location.port == undefined) ? "" : ":" + location.port) + "/index.html");
    } else {
        if ((document.getElementById('name').value).length == 0) {
            alert('이름을 입력해주세요.');
            return;
        }
        if (selectedOptions.length === 0) {
            alert('적어도 하나의 재해 종류를 선택해주세요.');
            return;
        }
        if (document.getElementById('input_lat').value == '' && document.getElementById('input_lon').value == '') {
            alert('위치정보를 입력해주세요.');
            return;
        }
        loc.push([document.getElementById('input_lat').value, document.getElementById('input_lon').value])
        var ok = confirm(`  입력하신 정보가 확실합니까?
        > ${getDisasterDescription(selectedOptions)} | ${getSituationDescription(document.getElementById('situation_type').value)}
        > ${document.getElementById('explain').value}`)
        if (ok) {
            //서버 전송
            var jsonData = {
                name: document.getElementById('name').value,
                id: '',
                pressTime: nowDate,
                validTime: validTime,
                location: [document.getElementById('input_lat').value, document.getElementById('input_lon').value],
                disasterType: selectedOptions,
                situationType: document.getElementById('situation_type').value,
                comment: document.getElementById('explain').value
            }
            data.push(jsonData)
            // L.marker([document.getElementById('input_lat').value, document.getElementById('input_lon').value], {icon:red}).addTo(map)
            // L.marker([document.getElementById('input_lat').value, document.getElementById('input_lon').value], { icon: earthquake }).addTo(map)
            reportMarker.clearLayers();
            pingReportMarker()
        } else {
            alert('다시한번 확인해주세요')
        }
    }
});
var count = 0
document.getElementById('see_mobile_tab').addEventListener('click', function () {
    count += 1
    if (count % 2 == 1) {
        document.getElementById('content').style = `top:30%;`
    } else {
        document.getElementById('content').style = `top:90%;`
    }
    // console.log(count)
})

/**시간 변환*/
function timeFunction(dateTime) {
    var date = new Date(dateTime);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hour = ('0' + date.getHours()).slice(-2);
    var minute = ('0' + date.getMinutes()).slice(-2);
    var second = ('0' + date.getSeconds()).slice(-2);

    return year + '년 ' + month + '월 ' + day + '일 ' + hour + '시 ' + minute + '분 ' + second + '초';
}
//보고 리스트
const container = document.getElementById('list');
revdata = data.slice().reverse();
for (let i = 0; i < revdata.length; i++) {
    const currentData = revdata[i];
    const divElement = document.createElement('div');
    divElement.className = 'dataDiv'

    const title = document.createElement('h4');
    title.textContent = timeFunction(currentData.pressTime);
    divElement.appendChild(title);
    const context = document.createElement('h3');
    context.textContent = getDisasterDescription(currentData.disasterType) + ' | ' + getSituationDescription(currentData.situationType);
    divElement.appendChild(context);

    //스타일
    if (currentData.situationType == 'occur') {
        divElement.style.backgroundColor = `#f00`
        divElement.style.color = `white`
    } else if (currentData.situationType == 'occur_bf') {
        divElement.style.backgroundColor = `#ff7d00`
    } else if (currentData.situationType == 'danger') {
        divElement.style.backgroundColor = `#fff400`
    } else if (currentData.situationType == 'difference') {
        divElement.style.backgroundColor = `#838383`
    } else if (currentData.situationType == 'usual') {
        divElement.style.backgroundColor = `#e4e4e4`
    }

    divElement.addEventListener('click', () => {
        document.getElementById('see_report_title').textContent = `${currentData.name}님의 보고`;
        document.getElementById('report_time').textContent = timeFunction(currentData.pressTime)+ ' 기준';
        document.getElementById('disaster').textContent = getDisasterDescription(currentData.disasterType) + ' 보고';
        document.getElementById('situation').textContent = getSituationDescription(currentData.situationType);
        document.getElementById('comment').textContent = currentData.comment;
        situationStyle(currentData.situationType)

        map.setView(currentData.location, 12)
    })

    container.appendChild(divElement)
}

var email = localStorage.getItem('email');
if (email == null) {
    document.getElementById('bf_login').style.display = 'block'
    document.getElementById('togo').style.display = 'none'
} else if (email != null) {
    document.getElementById('bf_login').style.display = 'none'
    document.getElementById('togo').style.display = 'block'
}
document.getElementById('logout').addEventListener('click', function () {
    localStorage.clear()
    alert('로그아웃되었습니다.')
    window.location.replace("http://" + window.location.hostname + ((location.port == "" || location.port == undefined) ? "" : ":" + location.port) + "/index.html");
})

pastData = {
    "response": {
        "header": {
            "resultCode": "200"
        },
        "body": {
            "dataType": "json",
            "data": {
                "reports": [
                    {
                        "name": "2016 경주지진",
                        "value": "5.8ML",
                        "occurtime": "2016-09-16T12:52:42.353Z",
                        "location": [
                            "35.77",
                            "129.18"
                        ],
                        "disasterType": "지진",
                        "report": [{
                            "location": ["35.844520", "129.208640"],
                            "felt": "red"
                        },
                        {
                            "location": ["35.949597", "129.370799"],
                            "felt": "orange"
                        }
                        ],
                        "other_info": "진도정보: ",
                        "free": '재산피해: ㅁㄴㅇㄹ'
                    },
                    {
                        "name": "2017 포항지진",
                        "value": "5.4ML",
                        "occurtime": "2017-11-12T12:52:42.353Z",
                        "location": [
                            "36.109",
                            "129.366"
                        ],
                        "disasterType": "지진",
                        "report": [{
                            "location": ["36.024609", "129.312414"],
                            "felt": "red"
                        },
                        {
                            "location": ["35.949597", "129.370799"],
                            "felt": "orange"
                        },
                        {
                            "location": ["35.976617", "129.276457"],
                            "felt": "red"
                        }
                        ],
                        "other_info": "진도정보:\nⅥ(포항), Ⅳ(강원, 경남, 대구, 부산, 울산, 충북), Ⅲ(전북)",
                        "free": '인명피해:\n부상자 92명, 이재민 1,797명\n\n재산피해:\n672억 원\n양동마을 고택 손상 등 문화재 피해 다수'
                    },
                    {
                        "name": "2022 중부권 폭우",
                        "value": "381.5㎜",
                        "occurtime": "2022-08-08T00:00:00.000Z",
                        "location": [
                            "37.497640",
                            "127.027573"
                        ],
                        "disasterType": "폭우",
                        "report": [{
                            "location": ["37.501283", "126.987195"],
                            "felt": "red"
                        },
                        {
                            "location": ["37.497061", "126.915628"],
                            "felt": "orange"
                        }
                        ],
                        "other_info": "서울특별시 동작구 신대방동 일대 시간당 최고 141.5 mm",
                        "free": '인명피해:\n사망자 14명, 실종자 2명, 부상자 26명, 이재민 1,050명\n\n재산피해:\n658억원'
                    }
                ]
            }
        }
    }
}
const pastMarker = L.layerGroup().addTo(map)
// console.log(pastData.response.body.data.reports[0].report)
const report_box = document.getElementById('report');
(pastData.response.body.data.reports).reverse()
for (i = 0; i < (pastData.response.body.data.reports).length; i++) {
    const currentData = pastData.response.body.data.reports[i];
    const divElement = document.createElement('div');
    divElement.className = 'dataDiv';

    const title = document.createElement('h4');
    title.textContent = currentData.name;
    divElement.appendChild(title);
    const context = document.createElement('h3');
    context.textContent = currentData.disasterType + ' | ' + currentData.value;
    divElement.appendChild(context);

    divElement.addEventListener('click', () => {
        pastMarker.clearLayers();
        reportMarker.clearLayers();
        locMarker.clearLayers();
        document.getElementById('section1').style = 'display:none'
        document.getElementById('section2').style = 'display:none'
        document.getElementById('past_legend').style = 'display:block'
        document.getElementById('back_report').style = 'display:block'
        document.getElementById('past_disaster').style = 'display:block'
        document.getElementById('past_number').style = 'display:block; display: flex;'
        var red = 0; var orange = 0;var yellow = 0;var blue = 0;var green = 0;var white = 0;
        if (currentData.disasterType == '지진') {
            function pingPastMarker() {
                for (j = 0; j < (currentData.report).length; j++) {
                    var past_marker
                    if (currentData.report[j].felt == 'red') {
                        past_icon = L.icon({
                            iconUrl: './resource/red.svg',
                            iconSize: [20, 20]
                        })
                        past_marker = L.marker(currentData.report[j].location, { icon: past_icon }).addTo(map)
                        red += 1
                        document.getElementById('past_red').textContent = ': '+ red;
                    } else if (currentData.report[j].felt == 'orange') {
                        past_icon = L.icon({
                            iconUrl: './resource/orange.svg',
                            iconSize: [20, 20]
                        })
                        past_marker = L.marker(currentData.report[j].location, { icon: past_icon }).addTo(map)
                        orange += 1
                        document.getElementById('past_orange').textContent = ': '+orange;
                    } else if (currentData.report[j].felt == 'yellow') {
                        past_icon = L.icon({
                            iconUrl: './resource/yellow.svg',
                            iconSize: [20, 20]
                        })
                        past_marker = L.marker(currentData.report[j].location, { icon: past_icon }).addTo(map)
                        yellow += 1
                        document.getElementById('past_yellow').textContent = ': '+yellow;
                    } else if (currentData.report[j].felt == 'green') {
                        past_icon = L.icon({
                            iconUrl: './resource/green.svg',
                            iconSize: [20, 20]
                        })
                        past_marker = L.marker(currentData.report[j].location, { icon: past_icon }).addTo(map)
                        green += 1
                        document.getElementById('past_green').textContent = ': '+green;
                    } else if (currentData.report[j].felt == 'blue') {
                        past_icon = L.icon({
                            iconUrl: './resource/blue.svg',
                            iconSize: [20, 20]
                        })
                        past_marker = L.marker(currentData.report[j].location, { icon: past_icon }).addTo(map)
                        blue += 1
                        document.getElementById('past_blue').textContent = ': '+blue;
                    } else if (currentData.report[j].felt == 'white') {
                        past_icon = L.icon({
                            iconUrl: './resource/white.svg',
                            iconSize: [20, 20]
                        })
                        past_marker = L.marker(currentData.report[j].location, { icon: past_icon }).addTo(map)
                        white += 1
                        document.getElementById('past_white').textContent = ': '+white;
                    }
                    pastMarker.addLayer(past_marker)
                }
                epicenter = L.icon({
                    iconUrl: './resource/epicenter.png',
                    iconSize: [40, 40]
                })
                epi_marker = L.marker(currentData.location, { icon: epicenter }).addTo(map)
                pastMarker.addLayer(epi_marker)
            }
            document.getElementById('red').textContent = '무시무시하게 흔들림';
            document.getElementById('orange').textContent = '격렬하게 흔들림';
            document.getElementById('yellow').textContent = '강한 흔들림';
            document.getElementById('green').textContent = '약한 흔들림';
            document.getElementById('blue').textContent = '흔들린것 같은 느낌';
            document.getElementById('white').textContent = '흔들림 감지 없음';
            document.getElementById('value').textContent = '규모: ' + currentData.value;

        } else if (currentData.disasterType == '폭우') {
            function pingPastMarker() {
                for (j = 0; j < (currentData.report).length; j++) {
                    var past_marker
                    if (currentData.report[j].felt == 'red') {
                        past_icon = L.icon({
                            iconUrl: './resource/red.svg',
                            iconSize: [20, 20]
                        })
                        past_marker = L.marker(currentData.report[j].location, { icon: past_icon }).addTo(map)
                        red += 1
                        document.getElementById('past_red').textContent = ': '+red;
                    } else if (currentData.report[j].felt == 'orange') {
                        past_icon = L.icon({
                            iconUrl: './resource/orange.svg',
                            iconSize: [20, 20]
                        })
                        past_marker = L.marker(currentData.report[j].location, { icon: past_icon }).addTo(map)
                        orange += 1
                        document.getElementById('past_orange').textContent = ': '+orange;
                    }
                    pastMarker.addLayer(past_marker)
                }
                epicenter = L.icon({
                    iconUrl: './resource/epicenter.png',
                    iconSize: [40, 40]
                })
                epi_marker = L.marker(currentData.location, { icon: epicenter }).addTo(map)
                pastMarker.addLayer(epi_marker)
            }
            document.getElementById('red').textContent = '거주 불가능';
            document.getElementById('orange').textContent = '심각한 피해';
            document.getElementById('yellow').textContent = '피해 발생';
            document.getElementById('green').textContent = '상황이 심각함';
            document.getElementById('blue').textContent = '평소와 다름';
            document.getElementById('white').textContent = '평소랑 다름 없음';
            document.getElementById('value').textContent = currentData.value;
        }
        document.getElementById('past_name').textContent = currentData.name
        document.getElementById('past_occurtime').textContent = timeFunction(currentData.occurtime)
        document.getElementById('other').textContent = currentData.other_info;
        document.getElementById('free').textContent = currentData.free;

        map.setView(currentData.location, 9)
        pingPastMarker()
    })

    report_box.appendChild(divElement)
}
document.getElementById('back_report').addEventListener("click", function () {
    document.getElementById('section1').style = 'display:block'
    document.getElementById('section2').style = 'display:block'
    document.getElementById('past_legend').style = 'display:none'
    document.getElementById('back_report').style = 'display:none'
    document.getElementById('past_disaster').style = 'display:none'
    document.getElementById('past_number').style = 'display:none'
    pingReportMarker();
    pastMarker.clearLayers();
    map.setView([36.5, 127.5], 7)
})

document.getElementById('move_country').addEventListener("click", function () {
    map.setView([36.5, 127.5], 7)
})
document.getElementById('reload').addEventListener("click", function () {
    window.location.replace("http://" + window.location.hostname + ((location.port == "" || location.port == undefined) ? "" : ":" + location.port) + "/index.html");
})

function copyCurrentUrl() {
    var currentUrl = window.location.href;

    var tempInput = document.createElement('input');
    tempInput.setAttribute('value', currentUrl);
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');

    document.body.removeChild(tempInput);
}

document.getElementById('share').addEventListener("click", function(){
    copyCurrentUrl();
    var share_announce = document.getElementById('share_announce');
    var share_announce_talk = document.getElementById('share_announce_talk');

    // 나타나기
    share_announce.style.opacity = '1';
    share_announce_talk.style.opacity = '1';

    // 2초 후에 사라지기
    setTimeout(function() {
        share_announce.style.opacity = '0';
        share_announce_talk.style.opacity = '0';
    }, 1000);
})