var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}
var url = 'http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrBrkNews'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('stnId') + '=' + encodeURIComponent('108');
queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday()); /**/
queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
xhr.open('GET', url + queryParams);
console.log(url + queryParams)
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        var myObj = JSON.parse(this.responseText);
        var breaking = myObj.response.body.items.item[0];
        alert(breaking.ann)
        document.getElementById('kma_breaking_content').textContent = breaking.ann;
    }
}