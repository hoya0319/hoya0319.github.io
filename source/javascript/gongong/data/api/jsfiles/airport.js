function getDate(){
    var date = new Date()
    var hour = date.getHours()
    if(hour<6){
        var yes = new Date(date.setDate(date.getDate()-1));
        yes = yes.toString()
        yes_month = yes.slice(4,7)
        if(yes_month == 'Jan'){
            yes_month  = '01'
        }else if(yes_month == 'Feb'){
            yes_month  = '02'
        }else if(yes_month == 'Mar'){
            yes_month  = '03'
        }else if(yes_month == 'Apr'){
            yes_month  = '04'
        }else if(yes_month == 'May'){
            yes_month  = '05'
        }else if(yes_month == 'Jun'){
            yes_month  = '06'
        }else if(yes_month == 'Jul'){
            yes_month  = '07'
        }else if(yes_month == 'Aug'){
            yes_month  = '08'
        }else if(yes_month == 'Sep'){
            yes_month  = '09'
        }else if(yes_month == 'Oct'){
            yes_month  = '10'
        }else if(yes_month == 'Nov'){
            yes_month  = '11'
        }else if(yes_month == 'Dec'){
            yes_month  = '12'
        }
        yes_date = yes.slice(8,10)
        yes_year = yes.slice(11,15)
        ans = yes_year + yes_month + yes_date
    }else{
        var year = date.getFullYear()
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        var ans = year + month + day;
    }
    return ans
}
function getHour(){
    var date = new Date()
    var hour = date.getHours()
    if(hour<6){
        hour='17'
    }else if(hour>=6&&hour<17){
        hour = '06'
    }else{
        hour = '17'
    }
    return hour.toString()
}
document.getElementById('confirm').addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    var airport= document.getElementById('airport').value
    var url = 'https://apis.data.go.kr/1360000/AirPortService/getAirPort'
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(getDate()); /**/
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(getHour()+'00'); /**/
    queryParams += '&' + encodeURIComponent('airPortCd') + '=' + encodeURIComponent(airport); /**/
    console.log(url + queryParams)
    xhr.open('GET', url+queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState==4){
            try {
                var airport_info = JSON.parse(this.responseText);
            }catch(error){

            }
            if(airport_info.response.header.resultCode == '00'){
                airport_info = airport_info.response.body.items.item[0]
                console.log(airport_info)
                document.getElementById('title').textContent = airport_info.title;
                bal_date = (airport_info.tm).toString()
                document.getElementById('issuing_time').textContent = `발표시각: ${bal_date.slice(0,4)}년 ${bal_date.slice(5,7)}월 ${bal_date.slice(8,10)}일 ${bal_date.slice(11,13)}시 ${bal_date.slice(14,16)}분`
                document.getElementById('valid_time').textContent = (airport_info.expiry_date).slice(1,-1);
                document.getElementById('valid_time').style = `
                border:black solid;
                border-width: 0px 0px 1px 0px;`
                document.getElementById('summary').textContent = airport_info.summary;
                document.getElementById('outlook').textContent = airport_info.outlook;
                document.getElementById('outlook_t').textContent = '기상전망';
                document.getElementById('outlook_t').style = `
                border:black solid;
                border-width: 0px 0px 1px 0px;`
                document.getElementById('forecast').textContent = airport_info.forecast;
                document.getElementById('forecast_t').textContent = '기상전망';
                document.getElementById('forecast_t').style = `
                border:black solid;
                border-width: 0px 0px 1px 0px;
                margin-top:20px;`
                document.getElementById('warn').textContent = `발효중인 경보 : ${airport_info.warn}`
            }else if(airport_info.response.header.resultCode == '03'){
                document.getElementById('title').textContent = '조회할 데이터가 없습니다.';document.getElementById('issuing_time').textContent = ``
                document.getElementById('valid_time').textContent = '';
                document.getElementById('valid_time').style = ``
                document.getElementById('summary').textContent = '';
                document.getElementById('outlook').textContent = '';
                document.getElementById('outlook_t').textContent = '';
                document.getElementById('outlook_t').style = ``
                document.getElementById('forecast').textContent = '';
                document.getElementById('forecast_t').textContent = '';
                document.getElementById('forecast_t').style = ``
                document.getElementById('warn').textContent = ``
            }
        }
    }
    xhr.send('');
})
//https://apis.data.go.kr/1360000/AirPortService/getAirPort?serviceKey=cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D&numOfRows=10&pageNo=1&dataType=JSON&base_date=20230416&base_time=0600&airPortCd=RKPC