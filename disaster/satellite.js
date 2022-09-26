var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

var satellite = 'G2'



var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1360000/SatlitImgInfoService/getInsightSatlit'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('sat') + '=' + encodeURIComponent(satellite); /**/
queryParams += '&' + encodeURIComponent('data') + '=' + encodeURIComponent('ir105'); /**/
queryParams += '&' + encodeURIComponent('area') + '=' + encodeURIComponent('ko'); /**/
queryParams += '&' + encodeURIComponent('time') + '=' + encodeURIComponent(getToday()-1); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        var myObj = JSON.parse(this.responseText);
        console.log(url+queryParams);
        console.log(myObj.response.body.items.item[0]["satImgC-file"]);
        //98
        var test;
        for (i=0;i>=98;i++){
            test = String(myObj.response.body.items.item[0]["satImgC-file"][i]);
            test += String(test);
        }
        console.log(test)
    }
};

xhr.send('');