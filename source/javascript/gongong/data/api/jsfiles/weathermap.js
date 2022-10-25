
var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}
var url = 'http://apis.data.go.kr/1360000/WthrChartInfoService/getSurfaceChart'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('code') + '=' + encodeURIComponent('24'); /**/
queryParams += '&' + encodeURIComponent('time') + '=' + encodeURIComponent(getToday()); /**/
xhr.open('GET', url + queryParams);


xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        try {
            myObj = JSON.parse(this.responseText);
        } catch (error) {
            document.getElementById('quake_title').textContent = "[01] 어플리케이션 에러 발생(APPLICATION_ERROR)"
        }
        if (myObj.response.header.resultCode == '00') {
            var weathermap = myObj.response.body.items.item;
        }
        try{
        document.getElementById('weathermap_img').src = myObj.response.body.items.item[0]["man-file"].slice(1, 70)
        }catch(error){
            document.getElementById('weathermap_img').alt = '일기도를 불러오는데 실패했습니다'
        }
    }
};
console.log(url + queryParams)
xhr.send('');
