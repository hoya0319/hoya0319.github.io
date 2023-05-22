var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

var map = L.map('map').setView([30, 137], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, <a href="https://www.weather.go.kr/" target="_blank">대한민국 기상청</a>',
    maxZoom: 10,
}).addTo(map);

var url = 'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfoList'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*데이터 타입 - JSON*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*데이터 타입 - JSON*/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(getToday()); /*조회 끝 날짜 - 오늘*/
xhr.open('GET', url + queryParams);
console.log(url + queryParams)
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    var time = []
    var num = []
    if (this.readyState == 4) {
        try {
            var data = JSON.parse(this.responseText);
        } catch (error) {

        }
        data = data.response.body.items.item
        console.log(data)
        for (i = 0; i < data.length; i++) {
            if (data[i].typhoonSeq in num) {
                console.log('걸러짐')
            } else {
                num.push(data[i].typhoonSeq)
                time.push(data[i].announceTime)
            }
        }
        console.log(time)
        console.log(num)
        console.log(time[0])


        var info_xhr = new XMLHttpRequest();
        var info_url = 'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonFcst'; /*URL*/
        var info_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
        info_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*데이터 타입 - JSON*/
        info_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*데이터 타입 - JSON*/
        info_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
        info_queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(time[0]); /*조회 끝 날짜 - 오늘*/
        info_queryParams += '&' + encodeURIComponent('typSeq') + '=' + encodeURIComponent(num[0]); /*조회 끝 날짜 - 오늘*/
        info_xhr.open('GET', info_url + info_queryParams);
        console.log(info_url + info_queryParams)
        info_xhr.open('GET', info_url + info_queryParams);
        info_xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                try {
                    var jsonData = JSON.parse(this.responseText);
                } catch (error) {

                }
                console.log(jsonData.response.body.items.item)
                var asdf = jsonData.response.body.items.item;
                var ping = L.icon({
                    iconUrl: 'https://s.yimg.jp/images/weather/typhoon/ico_typhoon-white.png',
                    iconSize: [15, 15]
                })
                var latlon = []
                for (j = 0; j < asdf.length; j++) {
                    var latlondata = []
                    latlondata.push(asdf[j].lat)
                    latlondata.push(asdf[j].lon)
                    latlon.push(latlondata)
                }
                console.log(latlon)
                for (j = 0; j < latlon.length; j++) {
                    L.marker(latlon[j], { icon: ping }).addTo(map)
                }
                L.polyline(latlon, { color: 'black' }).addTo(map);

                //현재
                if (asdf[0].ws >= 54){
                    strength ="초강력"
                }else if(asdf[0].ws >= 45){
                    strength ="매우강"
                }else if(asdf[0].ws >= 33){
                    strength ="강"
                }else if(asdf[0].ws >= 25){
                    strength ="중"
                }else{
                    strength="--"
                }
                console.log('이거' + (asdf[0].rad15)*1000)
                //현재 폭풍반경
                L.circle(latlon[0], {
                    color: 'red',
                    fillColor: 'rgba(255, 0, 0, 0.5)',
                    fillOpacity: 0.5,
                    radius: (asdf[0].rad25)*1000,
                    weight: 2
                }).addTo(map);
                //현재 강풍반경
                var now = L.circle(latlon[0], {
                    color: 'yellow',
                    fillColor: 'rgba(255, 255, 0, 0.5)',
                    fillOpacity: 0.5,
                    radius: (asdf[0].rad15)*1000,
                    weight: 2
                }).addTo(map);
                now.on('mouseover', function (e) {
                    this.bindPopup(`${(asdf[0].tm).slice(6,8)}일 ${(asdf[0].tm).slice(8,10)}시 ${(asdf[0].tm).slice(10,12)}분 예상<br>중심기압: ${asdf[0].ps}hPa<br>최대풍속: ${asdf[0].ws}m/s<br>강도: ${strength}<br>진행: ${asdf[0].dir}, ${asdf[0].sp}km/h`, {
                        offset: [0, 0]
                    })
                    this.openPopup()
                });
                now.on('mouseout', function (e) {
                    this.closePopup()
                });
                for(j=latlon.length-1 ; j > 0 ; j--){
                    console.log(j)
                    L.circle(latlon[j],{
                        color:'white',
                        fillColor: 'rgba(255, 0, 0, 0)',
                        radius:(asdf[j].radPr)*1000,
                        dashArray: '10, 10',
                        dashOffset: '0',
                        weight: 2
                    }).addTo(map)
                }
                
                var customIcon = L.divIcon({
                    className: 'custom-icon',
                    html: `<div class="text-label" style="width:100px">제 ${num[0]}호 태풍</div>`
                });
                L.marker([latlon[0][0]-2,latlon[0][1]+2], { icon: customIcon }).addTo(map);
            }
        }
        info_xhr.send('');
    }
}
xhr.send('');
