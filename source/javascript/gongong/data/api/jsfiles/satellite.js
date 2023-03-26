var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

var satellite = 'G2'


document.getElementById('confirm_btn').addEventListener("click", function (){
    var image_select, area_select
    document.getElementsByName('image_select').forEach((node) => {
        if(node.checked){
            image_select = node.value
        }
    })
    document.getElementsByName('area_select').forEach((node) => {
        if(node.checked){
            area_select = node.value
        }
    })

    var xhr = new XMLHttpRequest();
    var url = 'http://apis.data.go.kr/1360000/SatlitImgInfoService/getInsightSatlit'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('sat') + '=' + encodeURIComponent(satellite); /**/
    queryParams += '&' + encodeURIComponent('data') + '=' + encodeURIComponent(image_select); /**/
    queryParams += '&' + encodeURIComponent('area') + '=' + encodeURIComponent(area_select); /**/
    queryParams += '&' + encodeURIComponent('time') + '=' + encodeURIComponent(getToday()-1); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var myObj = JSON.parse(this.responseText);
            console.log(url+queryParams);
            console.log(myObj.response.body.items.item[0]["satImgC-file"]);
            var test = myObj.response.body.items.item[0]["satImgC-file"]
            var long = myObj.response.body.items.item[0]["satImgC-file"]
            if(image_select=='rgbt'){
                test=test.slice(1,102)
                document.getElementById('satellite_img').src = test
            }else if(image_select=='rgbdn'){
                test=test.slice(1,106)
                document.getElementById('satellite_img').src = test
            }else{
                test=test.slice(1,99)
                document.getElementById('satellite_img').src = test
                for(i=0; i<long.length; i++){
                    if(i %100 == 0) {
                        test= test.slice(i,i+99)
                    }
                }
            }
        }
    };

    xhr.send('');
})