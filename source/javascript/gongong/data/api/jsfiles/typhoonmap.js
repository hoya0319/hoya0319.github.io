var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

var map = L.map('map').setView([30, 137], 4);
var ping = L.icon({
    iconUrl: 'https://s.yimg.jp/images/weather/typhoon/ico_typhoon-white.png',
    iconSize: [15, 15]
})
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, <a href="https://www.weather.go.kr/" target="_blank">대한민국 기상청</a>',
    maxZoom: 10,
}).addTo(map);

var url = 'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfoList'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
var latlon = []
var plz = []
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

        
        var info_xhr = new XMLHttpRequest();
        var info_url = 'https://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonFcst'; /*URL*/
        var info_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
        info_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*데이터 타입 - JSON*/
        info_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*데이터 타입 - JSON*/
        info_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
        info_queryParams += '&' + encodeURIComponent('tmFc') + '=' + encodeURIComponent(time[0]); /*조회 끝 날짜 - 오늘*/
        info_queryParams += '&' + encodeURIComponent('typSeq') + '=' + encodeURIComponent(num[0]); /*조회 끝 날짜 - 오늘*/
        info_xhr.open('GET', info_url + info_queryParams);
        // console.log(info_url + info_queryParams)
        info_xhr.open('GET', info_url + info_queryParams);
        info_xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                try {
                    var jsonData = JSON.parse(this.responseText);
                } catch (error) {

                }
                // console.log(jsonData.response.body.items.item)
                var asdf = jsonData.response.body.items.item;
                lat=[]
                lat.push(asdf[0].lat)
                lat.push(asdf[0].lon)
                plz.push(lat)
                for (j = 0; j < asdf.length; j++) {
                    var latlondata = []
                    latlondata.push(asdf[j].lat)
                    latlondata.push(asdf[j].lon)
                    latlon.push(latlondata)
                }
                // console.log(latlon)
                for (j = 0; j < latlon.length; j++) {
                    L.marker(latlon[j], { icon: ping }).addTo(map)
                }
                //현재
                if (asdf[0].ws >= 54) {
                    strength = "초강력"
                } else if (asdf[0].ws >= 45) {
                    strength = "매우강"
                } else if (asdf[0].ws >= 33) {
                    strength = "강"
                } else if (asdf[0].ws >= 25) {
                    strength = "중"
                } else {
                    strength = "--"
                }
                for (k = latlon.length - 1; k >= 0; k--) {
                    L.circle(latlon[k], {
                        color: 'white',
                        fillColor: 'rgba(255, 0, 0, 0)',
                        radius: (asdf[k].radPr) * 1000,
                        dashArray: '10, 10',
                        dashOffset: '0',
                        weight: 2
                    }).addTo(map)
                }
                function getStrength(wind){
                    if (wind >= 54) {
                        strength = "초강력"
                    } else if (wind >= 45) {
                        strength = "매우강"
                    } else if (wind >= 33) {
                        strength = "강"
                    } else if (wind >= 25) {
                        strength = "중"
                    } else {
                        strength = "--"
                    }
                    return strength
                }
                rad=[]
                for(j=0;j<asdf.length;j++){
                    rad.push(Number(asdf[j].radPr) + Number(asdf[j].rad25))
                }
                // console.log(rad)
                try{
                    if(asdf[6].rad25== 0){
                        var d7 = L.circle(latlon[6],{
                            color: 'white',
                            fillColor: 'rgba(255, 0, 0, 0)',
                            radius: rad[6]*1000,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            weight:2
                        }).addTo(map)
                    }else{
                        var d7 = L.circle(latlon[6],{
                            color: 'red',
                            fillOpacity:0,
                            radius: rad[6]*1000,
                            weight:2
                        }).addTo(map)
                    }
                    d7.on('mouseover', function(e){
                        this.bindPopup(`${(asdf[6].tm).slice(6,8)}일 ${(asdf[6].tm).slice(8,10)}시 ${(asdf[6].tm).slice(10,12)}분 예상<br>중심기압: ${asdf[6].ps}hPa<br>최대풍속: ${asdf[6].ws}m/s<br>강도: ${getStrength(asdf[6].ws)}<br>진행: ${asdf[6].dir}, ${asdf[6].sp}km/h`)
                        this.openPopup()
                    })
                    d7.on('mouseout', function (e) {
                        this.closePopup()
                    });
                }catch(error){
                }
                try{
                    if(asdf[5].rad25== 0){
                        var d6 = L.circle(latlon[5],{
                            color: 'white',
                            fillColor: 'rgba(255, 0, 0, 0)',
                            radius: rad[5]*1000,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            weight:2
                        }).addTo(map)
                    }else{
                        var d6 = L.circle(latlon[5],{
                            color: 'red',
                            fillOpacity:0,
                            radius: rad[5]*1000,
                            weight:2
                        }).addTo(map)
                    }
                    d6.on('mouseover', function(e){
                        this.bindPopup(`${(asdf[5].tm).slice(6,8)}일 ${(asdf[5].tm).slice(8,10)}시 ${(asdf[5].tm).slice(10,12)}분 예상<br>중심기압: ${asdf[5].ps}hPa<br>최대풍속: ${asdf[5].ws}m/s<br>강도: ${getStrength(asdf[5].ws)}<br>진행: ${asdf[5].dir}, ${asdf[5].sp}km/h`)
                        this.openPopup()
                    })
                    d6.on('mouseout', function (e) {
                        this.closePopup()
                    });
                }catch(error){
                }
                try{
                    if(asdf[4].rad25== 0){
                        var d5 = L.circle(latlon[4],{
                            color: 'white',
                            fillColor: 'rgba(255, 0, 0, 0)',
                            radius: rad[4]*1000,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            weight:2
                        }).addTo(map)
                    }else{
                        var d5 = L.circle(latlon[4],{
                            color: 'red',
                            fillOpacity:0,
                            radius: rad[4]*1000,
                            weight:2
                        }).addTo(map)
                    }
                    d5.on('mouseover', function(e){
                        this.bindPopup(`${(asdf[4].tm).slice(6,8)}일 ${(asdf[4].tm).slice(8,10)}시 ${(asdf[4].tm).slice(10,12)}분 예상<br>중심기압: ${asdf[4].ps}hPa<br>최대풍속: ${asdf[4].ws}m/s<br>강도: ${getStrength(asdf[4].ws)}<br>진행: ${asdf[4].dir}, ${asdf[4].sp}km/h`)
                        this.openPopup()
                    })
                    d5.on('mouseout', function (e) {
                        this.closePopup()
                    });
                }catch(error){
                }
                try{
                    if(asdf[3].rad25== 0){
                        var d4 = L.circle(latlon[3],{
                            color: 'white',
                            fillColor: 'rgba(255, 0, 0, 0)',
                            radius: rad[3]*1000,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            weight:2
                        }).addTo(map)
                    }else{
                        var d4 = L.circle(latlon[3],{
                            color: 'red',
                            fillOpacity:0,
                            radius: rad[3]*1000,
                            weight:2
                        }).addTo(map)
                    }
                    d4.on('mouseover', function(e){
                        this.bindPopup(`${(asdf[3].tm).slice(6,8)}일 ${(asdf[3].tm).slice(8,10)}시 ${(asdf[3].tm).slice(10,12)}분 예상<br>중심기압: ${asdf[3].ps}hPa<br>최대풍속: ${asdf[3].ws}m/s<br>강도: ${getStrength(asdf[3].ws)}<br>진행: ${asdf[3].dir}, ${asdf[3].sp}km/h`)
                        this.openPopup()
                    })
                    d4.on('mouseout', function (e) {
                        this.closePopup()
                    });
                }catch(error){
                }
                try{
                    if(asdf[2].rad25== 0){
                        var d3 = L.circle(latlon[2],{
                            color: 'white',
                            fillColor: 'rgba(255, 0, 0, 0)',
                            radius: rad[2]*1000,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            weight:2
                        }).addTo(map)
                    }else{
                        var d3 = L.circle(latlon[2],{
                            color: 'red',
                            fillOpacity:0,
                            radius: rad[2]*1000,
                            weight:2
                        }).addTo(map)
                    }
                    d3.on('mouseover', function(e){
                        this.bindPopup(`${(asdf[2].tm).slice(6,8)}일 ${(asdf[2].tm).slice(8,10)}시 ${(asdf[2].tm).slice(10,12)}분 예상<br>중심기압: ${asdf[2].ps}hPa<br>최대풍속: ${asdf[2].ws}m/s<br>강도: ${getStrength(asdf[2].ws)}<br>진행: ${asdf[2].dir}, ${asdf[2].sp}km/h`)
                        this.openPopup()
                    })
                    d3.on('mouseout', function (e) {
                        this.closePopup()
                    });
                }catch(error){
                }
                try{
                    if(asdf[1].rad25== 0){
                        var d2 = L.circle(latlon[1],{
                            color: 'white',
                            fillColor: 'rgba(255, 0, 0, 0)',
                            radius: rad[1]*1000,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            weight:2
                        }).addTo(map)
                    }else{
                        var d2 = L.circle(latlon[1],{
                            color: 'red',
                            fillOpacity:0,
                            radius: rad[1]*1000,
                            weight:2
                        }).addTo(map)
                    }
                    d2.on('mouseover', function(e){
                        this.bindPopup(`${(asdf[1].tm).slice(6,8)}일 ${(asdf[1].tm).slice(8,10)}시 ${(asdf[1].tm).slice(10,12)}분 예상<br>중심기압: ${asdf[1].ps}hPa<br>최대풍속: ${asdf[1].ws}m/s<br>강도: ${getStrength(asdf[1].ws)}<br>진행: ${asdf[1].dir}, ${asdf[1].sp}km/h`)
                        this.openPopup()
                    })
                    d2.on('mouseout', function (e) {
                        this.closePopup()
                    });
                }catch(error){
                }
                try{
                    if(asdf[0].rad25== 0){
                        var d1 = L.circle(latlon[0],{
                            color: 'white',
                            fillColor: 'rgba(255, 0, 0, 0)',
                            radius: rad[0]*1000,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            weight:2
                        }).addTo(map)
                    }else{
                        var d1 = L.circle(latlon[0],{
                            color: 'red',
                            fillOpacity:0,
                            radius: rad[0]*1000,
                            weight:2
                        }).addTo(map)
                    }
                    d1.on('mouseover', function(e){
                        this.bindPopup(`${(asdf[0].tm).slice(6,8)}일 ${(asdf[0].tm).slice(8,10)}시 ${(asdf[0].tm).slice(10,12)}분 예상<br>중심기압: ${asdf[0].ps}hPa<br>최대풍속: ${asdf[0].ws}m/s<br>강도: ${getStrength(asdf[0].ws)}<br>진행: ${asdf[0].dir}, ${asdf[0].sp}km/h`)
                        this.openPopup()
                    })
                    d1.on('mouseout', function (e) {
                        this.closePopup()
                    });
                }catch(error){
                }
            }
        }
        info_xhr.send('');


        var now_url = 'http://apis.data.go.kr/1360000/TyphoonInfoService/getTyphoonInfo'; /*URL*/
        var now_queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
        now_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지 번호 조회*/
        now_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /*행 수*/
        now_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /*데이터 타입 - JSON*/
        var now = new Date();
        var twoago = new Date(now.setDate(now.getDate() - 3));
        // console.log(twoago)
        twoago = twoago.toString()
        twoago_month = twoago.slice(4, 7)
        if (twoago_month == 'Jan') {
            twoago_month = '01'
        } else if (twoago_month == 'Feb') {
            twoago_month = '02'
        } else if (twoago_month == 'Mar') {
            twoago_month = '03'
        } else if (twoago_month == 'Apr') {
            twoago_month = '04'
        } else if (twoago_month == 'May') {
            twoago_month = '05'
        } else if (twoago_month == 'Jun') {
            twoago_month = '06'
        } else if (twoago_month == 'Jul') {
            twoago_month = '07'
        } else if (twoago_month == 'Aug') {
            twoago_month = '08'
        } else if (twoago_month == 'Sep') {
            twoago_month = '09'
        } else if (twoago_month == 'Oct') {
            twoago_month = '10'
        } else if (twoago_month == 'Nov') {
            twoago_month = '11'
        } else if (twoago_month == 'Dec') {
            twoago_month = '12'
        }
        twoago_date = twoago.slice(8, 10)
        twoago_year = twoago.slice(11, 15)
        // console.log(twoago_month)
        // console.log(twoago_date)
        // console.log(twoago_year)
        now_queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(twoago_year + twoago_month + twoago_date); /*조회 시작 날짜 - 오늘*/
        now_queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /*조회 끝 날짜 - 오늘*/
        xhr.open('GET', now_url + now_queryParams);
        var api_url = now_url + now_queryParams;
        // console.log(api_url)
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    myObj = JSON.parse(this.responseText);
                } catch (error) {
                    
                }
                myObj = myObj.response.body.items.item[0]
                // console.log(myObj)
                // 현재 폭풍반경
                if (myObj.typWs >= 54) {
                    strength = "초강력"
                } else if (myObj.typWs >= 45) {
                    strength = "매우강"
                } else if (myObj.typWs >= 33) {
                    strength = "강"
                } else if (myObj.typWs >= 25) {
                    strength = "중"
                } else {
                    strength = "--"
                }
                myObj.typTm = (myObj.typTm).toString()
                L.circle([myObj.typLat, myObj.typLon], {
                    color: 'red',
                    fillColor: 'rgba(255, 0, 0, 0.5)',
                    fillOpacity: 0.5,
                    radius: (myObj.typ25)*1000,
                    weight: 2
                }).addTo(map);
                //현재 강풍반경
                var now = L.circle([myObj.typLat, myObj.typLon], {
                    color: 'yellow',
                    fillColor: 'rgba(255, 255, 0, 0.5)',
                    fillOpacity: 0.5,
                    radius: (myObj.typ15)*1000,
                    weight: 2
                }).addTo(map);
                now.on('mouseover', function (e) {
                    this.bindPopup(`${(myObj.typTm).slice(6,8)}일 ${(myObj.typTm).slice(8,10)}시 ${(myObj.typTm).slice(10,12)}분 실황<br>중심기압: ${myObj.typPs}hPa<br>최대풍속: ${myObj.typWs}m/s<br>강도: ${strength}<br>진행: ${myObj.typDir}, ${myObj.typSp}km/h`, {
                        offset: [0, 0]
                    })
                    this.openPopup()
                });
                now.on('mouseout', function (e) {
                    this.closePopup()
                });
                L.marker([myObj.typLat, myObj.typLon], { icon: ping }).addTo(map)
                now = [(myObj.typLat).toString(), (myObj.typLon).toString()]
                plz.push(now)
                var customIcon = L.divIcon({
                    className: 'custom-icon',
                    html: `<div class="text-label" style="width:200px">제 ${myObj.typSeq}호 태풍 '${myObj.typName}'</div>`
                });
                L.marker([myObj.typLat -1 , myObj.typLon +1], { icon: customIcon }).addTo(map);

                var now_latlon = []
                now_latlon.push((myObj.typLat).toString())
                now_latlon.push((myObj.typLon).toString())
                latlon.unshift(now_latlon)
                // console.log(latlon)
                L.polyline(latlon, { color: 'black' }).addTo(map);
            }
        };
        
        xmlhttp.open("GET", api_url, true);
        xmlhttp.send();
        // console.log(api_url)
    }
}
xhr.send('');
