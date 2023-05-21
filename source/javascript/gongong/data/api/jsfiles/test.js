var map = L.map('map').setView([30, 137], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Natural Earth, 대한민국 기상청',
    maxZoom: 10,
}).addTo(map);

var latlngs = [
    [7.0, 148.9],
    [8.3, 148.1],
    [9.7, 147.3],
    [10.9, 146.7],
    [12.2, 146.0],
    [14.8, 144.3],
    [16.2, 141.4],
    [17.0, 138.0],
];

var polyline = L.polyline(latlngs, { color: 'black' }).addTo(map);

//현재 강풍반경
var now = L.circle([7.0, 148.9], {
    color: 'yellow',
    fillColor: 'rgba(255, 255, 0, 0.5)',
    fillOpacity: 0.5,
    radius: 540000,
    weight: 2
}).addTo(map);
//현재 폭풍반경
L.circle([7.0, 148.9], {
    color: 'red',
    fillColor: 'rgba(255, 0, 0, 0.5)',
    fillOpacity: 0.5,
    radius: 0000,
    weight: 2
}).addTo(map);
now.on('mouseover', function (e) {
    this.bindPopup(`21일 09시 현재<br>중심기압: 990hPa<br>최대풍속: 24m/s<br>강도: - <br>진행: 북, 4km/h`, {
        offset: [0, 0]
    })
    this.openPopup()
});
now.on('mouseout', function (e) {
    this.closePopup()
});
//d7
d7 = L.circle([17.0, 138.0],{
    color:'white',
    fillColor: 'rgba(255, 0, 0, 0)',
    radius:700000,
    dashArray: '10, 10',
    dashOffset: '0',
    weight: 2
}).addTo(map)
// L.circle([17.0, 138.0], {
//     color: 'red',
//     fillColor: 'rgba(255, 0, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 300000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map);
// var d7 = L.circle([17.0, 138.0], {
//     color: 'yellow',
//     fillColor: 'rgba(255, 255, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 820000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map);
d7.on('mouseover', function (e) {
    this.bindPopup(`26일 09시 예상<br>중심기압: 935hPa<br>최대풍속: 49m/s<br>강도: 매우 강 <br>진행: 서북서, 16km/h`, {
        offset: [0, 0]
    })
    this.openPopup()
});
d7.on('mouseout', function (e) {
    this.closePopup()
});

//d6
d6 = L.circle([16.2, 141.4],{
    color:'white',
    fillColor: 'rgba(255, 0, 0, 0)',
    radius:520000,
    dashArray: '10, 10',
    dashOffset: '0',
    weight: 2
}).addTo(map)
// var d6 = L.circle([16.2, 141.4], {
//     color: 'yellow',
//     fillColor: 'rgba(255, 255, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 780000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map);
// L.circle([16.2, 141.4], {
//     color: 'red',
//     fillColor: 'rgba(255, 0, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 280000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map)
d6.on('mouseover', function (e) {
    this.bindPopup(`25일 09시 예상<br>중심기압: 940hPa<br>최대풍속: 47m/s<br>강도: 매우 강 <br>진행: 서북서, 15km/h`, {
        offset: [0, 0]
    })
    this.openPopup()
});
d6.on('mouseout', function (e) {
    this.closePopup()
});

//d5
d5 = L.circle([14.8, 144.3],{
    color:'white',
    fillColor: 'rgba(255, 0, 0, 0)',
    radius:400000,
    dashArray: '10, 10',
    dashOffset: '0',
    weight: 2
}).addTo(map)
// var d5 = L.circle([14.8, 144.3], {
//     color: 'yellow',
//     fillColor: 'rgba(255, 255, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 720000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map);
// L.circle([14.8, 144.3], {
//     color: 'red',
//     fillColor: 'rgba(255, 0, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 260000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map)
d5.on('mouseover', function (e) {
    this.bindPopup(`24일 09시 예상<br>중심기압: 955hPa<br>최대풍속: 40m/s<br>강도: 강 <br>진행: 북북서, 15km/h`, {
        offset: [0, 0]
    })
    this.openPopup()
});
d5.on('mouseout', function (e) {
    this.closePopup()
});

//d4
d4 = L.circle([12.2, 146.0],{
    color:'white',
    fillColor: 'rgba(255, 0, 0, 0)',
    radius:300000,
    dashArray: '10, 10',
    dashOffset: '0',
    weight: 2
}).addTo(map)
// var d4 = L.circle([12.2, 146.0], {
//     color: 'yellow',
//     fillColor: 'rgba(255, 255, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 660000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map);
// L.circle([12.2, 146.0], {
//     color: 'red',
//     fillColor: 'rgba(255, 0, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 220000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map)
d4.on('mouseover', function (e) {
    this.bindPopup(`23일 09시 예상<br>중심기압: 970hPa<br>최대풍속: 35m/s<br>강도: 강 <br>진행: 북북서, 14km/h`, {
        offset: [0, 0]
    })
    this.openPopup()
});
d4.on('mouseout', function (e) {
    this.closePopup()
});

//d3
d3 = L.circle([10.9, 146.7],{
    color:'white',
    fillColor: 'rgba(255, 0, 0, 0)',
    radius:260000,
    dashArray: '10, 10',
    dashOffset: '0',
    weight: 2
}).addTo(map)
// var d3 = L.circle([10.9, 146.7], {
//     color: 'yellow',
//     fillColor: 'rgba(255, 255, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 640000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map);
// L.circle([10.9, 146.7], {
//     color: 'red',
//     fillColor: 'rgba(255, 0, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 220000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map)
d3.on('mouseover', function (e) {
    this.bindPopup(`22일 21시 예상<br>중심기압: 975hPa<br>최대풍속: 32m/s<br>강도: 중 <br>진행: 북북서, 13km/h`, {
        offset: [0, 0]
    })
    this.openPopup()
});
d3.on('mouseout', function (e) {
    this.closePopup()
});

//d2
d2 = L.circle([9.7, 147.3],{
    color:'white',
    fillColor: 'rgba(255, 0, 0, 0)',
    radius:200000,
    dashArray: '10, 10',
    dashOffset: '0',
    weight: 2
}).addTo(map)
// var d2 = L.circle([9.7, 147.3], {
//     color: 'yellow',
//     fillColor: 'rgba(255, 255, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 620000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map);
// L.circle([9.7, 147.3], {
//     color: 'red',
//     fillColor: 'rgba(255, 0, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 200000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map)
d2.on('mouseover', function (e) {
    this.bindPopup(`22일 09시 예상<br>중심기압: 980hPa<br>최대풍속: 29m/s<br>강도: 중 <br>진행: 북북서, 15km/h`, {
        offset: [0, 0]
    })
    this.openPopup()
});
d2.on('mouseout', function (e) {
    this.closePopup()
});

//d1
d1 = L.circle([8.3, 148.1],{
    color:'white',
    fillColor: 'rgba(255, 0, 0, 0)',
    radius:100000,
    dashArray: '10, 10',
    dashOffset: '0',
    weight: 2
}).addTo(map)
// var d1 = L.circle([8.3, 148.1], {
//     color: 'rgba(255, 255, 0, 0)',
//     fillColor: 'rgba(255, 255, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 600000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map);
// L.circle([8.3, 148.1], {
//     color: 'red',
//     fillColor: 'rgba(255, 0, 0, 0)',
//     fillOpacity: 0.5,
//     radius: 180000,
//     dashArray: '10, 10', // 점선 스타일
//     dashOffset: '0', // 점선의 시작 위치
//     weight: 2
// }).addTo(map)
d1.on('mouseover', function (e) {
    this.bindPopup(`21일 21시 예상<br>중심기압: 985hPa<br>최대풍속: 27m/s<br>강도: 중 <br>진행: 북북서, 15km/h`, {
        offset: [0, 0]
    })
    this.openPopup()
});
d1.on('mouseout', function (e) {
    this.closePopup()
});

//핑 찍기
var ping = L.icon({
    iconUrl: 'https://s.yimg.jp/images/weather/typhoon/ico_typhoon-white.png',
    iconSize: [15, 15]
})
for (i = 0; i < latlngs.length; i++) {
    L.marker(latlngs[i], { icon: ping }).addTo(map)
}
// var marker = L.marker([51.5, -0.09]).addTo(map)
//   .bindPopup('Hello, World!')
//   .openPopup();

var customIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div class="text-label" style="width:100px">제2호 태풍 마와르</div>'
});

var marker = L.marker([2.0, 150], { icon: customIcon }).addTo(map);
