var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}
function getMonth(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return  month 

}
var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getPwnStatus'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        // console.log(url+queryParams)
        try {
            var issued = JSON.parse(this.responseText);
        }catch(error){

        }
        if(issued.response.header.resultCode == '00'){
            issued = issued.response.body.items.item[0]
            issued_date = issued.tmEf
            document.getElementById('issuing_date').textContent = `발효시각: ${issued_date.slice(4,6)}월 ${issued_date.slice(6,8)}일 ${issued_date.slice(8,10)}시 ${issued_date.slice(10,12)}분 이후`
            issued_content_bf = issued.t6
            var issued_content = ''
            for(i=1; i < issued_content_bf.length; i++){
                if(issued_content_bf[i] == 'o'){
                    issued_content += "\r" + issued_content_bf[i]
                }else{
                    issued_content += issued_content_bf[i]
                }
            }
            document.getElementById('issuing_area').textContent = 'o'+ issued_content;
            document.getElementById('now_issuing').src= `https://www.weather.go.kr/w/repositary/image/wrn/img/KTKO50_${issued.tmFc}_108_${issued.tmSeq}.png`
        }
    }
};

var bal_xhr = new XMLHttpRequest();
var bal_url = 'https://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnMsg'; /*URL*/
var bal_queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
bal_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
bal_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
bal_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
bal_queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent('108'); /**/
var now=new Date();
var twoago = new Date(now.setDate(now.getDate()-6));
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
bal_queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(twoago_year + twoago_month + twoago_date); /**/
bal_queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
bal_xhr.open('GET', bal_url + bal_queryParams);
bal_xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.log(bal_url+bal_queryParams)
        try {
            var bal = JSON.parse(this.responseText);
        }catch(error){

        }
        if(bal.response.header.resultCode == '00'){
            bal = bal.response.body.items.item[0]
            document.getElementById('bal_title').textContent = `[특보] 제${getMonth()}-${bal.tmSeq}호 : ${bal.t1}`
            bal_date = (bal.tmFc).toString()
            document.getElementById('bal_date').textContent = `발표시각: ${bal_date.slice(4,6)}월 ${bal_date.slice(6,8)}일 ${bal_date.slice(8,10)}시 ${bal_date.slice(10,12)}분`
            document.getElementById('bal_area').textContent = `발표지역\n${bal.t2}`
            document.getElementById('bal_time').textContent = `발효시각\n${bal.t3}`
            document.getElementById('bal_img').src = `https://www.weather.go.kr/w/repositary/image/wrn/img/KTKO50_${bal.tmFc}_108_${bal.tmSeq}a.png`
            can = bal.t4
            if(can==""){
                can = 'o 예정 시각 없음'
            }else{
                can = can
            }
            document.getElementById('bal_can').textContent = `해제예고\n${can}`
            document.getElementById('bal_other').textContent = `참고사항\n${bal.other}`
        }
    }
};

var yebi_xhr = new XMLHttpRequest();
var yebi_url = 'https://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrPwn'; /*URL*/
var yebi_queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
yebi_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
yebi_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
yebi_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
yebi_queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent('108'); /**/
var now=new Date();
var twoago = new Date(now.setDate(now.getDate()-6));
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
yebi_queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(twoago_year + twoago_month + twoago_date); /**/
yebi_queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
yebi_xhr.open('GET', yebi_url + yebi_queryParams);
yebi_xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        // console.log(yebi_url+yebi_queryParams)
        try {
            var yebi = JSON.parse(this.responseText);
        }catch(error){

        }
        if(yebi.response.header.resultCode == '00'){
            yebi = yebi.response.body.items.item[0]
            yebi_date = (yebi.tmFc).toString()
            document.getElementById('yebi_date').textContent = `발표시각: ${yebi_date.slice(4,6)}월 ${yebi_date.slice(6,8)}일 ${yebi_date.slice(8,10)}시 ${yebi_date.slice(10,12)}분`
            document.getElementById('yebi_area').textContent = `발표현황\n${yebi.pwn}`
            document.getElementById('yebi_rem').textContent = `참고사항\n${yebi.rem}`
            document.getElementById('yebi_img').src = `https://www.weather.go.kr/w/repositary/image/wrn/img/KTKO52_${yebi.tmFc}_108_${yebi.tmSeq}.png`
        }
    }
};

var jong_xhr = new XMLHttpRequest();
var jong_url = 'https://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrInfo'; /*URL*/
var jong_queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
jong_queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
jong_queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
jong_queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
jong_queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent('108'); /**/
var now=new Date();
var twoago = new Date(now.setDate(now.getDate()-6));
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
jong_queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(twoago_year + twoago_month + twoago_date); /**/
jong_queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
jong_xhr.open('GET', jong_url + jong_queryParams);
jong_xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.log(jong_url+jong_queryParams)
        try {
            var jong = JSON.parse(this.responseText);
        }catch(error){

        }
        if(jong.response.header.resultCode == '00'){
            jong = jong.response.body.items.item[0]
            jong_time = (jong.tmFc).toString()
            document.getElementById('jong_title').textContent = `기상정보 | [정보] 제${getMonth()}-${jong.tmSeq}호 : ${jong_time.slice(0,4)}.${jong_time.slice(4,6)}.${jong_time.slice(6,8)}.${jong_time.slice(8,10)}:${jong_time.slice(10,12)}`
            document.getElementById('jong_date').textContent = `발표시각: ${jong_time.slice(4,6)}월 ${jong_time.slice(6,8)}일 ${jong_time.slice(8,10)}시 ${jong_time.slice(10,12)}분`
            document.getElementById('jong').textContent = (jong.t1).slice(0,-4)
        }
    }
};

xhr.send('');
bal_xhr.send('');
yebi_xhr.send('');
jong_xhr.send('');
