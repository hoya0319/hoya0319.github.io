document.getElementById('date').value = new Date().toISOString().substring(0, 10);

document.getElementById('confirm').addEventListener("click", function(){
    var date = document.getElementById('date').value
    key=document.getElementById('key').value;
    date = date.replace('-','')
    date = date.replace('-','')
    var hour = document.getElementById('hour').value
    var min = document.getElementById('min').value
    var obs = document.getElementById('obs').value
    var stn = document.getElementById('stn').value
    var map = document.getElementById('map').value
    var obj = document.getElementById('obj').value
    var level = document.getElementById('level').value
    var zoomx = document.getElementById('zoomx').value;
    var zoomy = document.getElementById('zoomy').value;

    url=`https://apihub.kma.go.kr/api/typ03/cgi/aws/nph-aws_min_img1?obs=${obs}&tm=${date}${hour}${min}&val=1&stn=${stn}&obj=${obj}&map=${map}&grid=2&legend=1&size=600&itv5&zoom_level=${level}&zoom_x=${zoomx}&zoom_y=${zoomy}&gov=&authKey=${key}`

    document.getElementById('img').src = url
})
//https://apihub.kma.go.kr/api/typ03/cgi/aws/nph-aws_min_img1?obs=rn_ex&tm=202212211635&val=1&stn=1&obj=mq&map=HR&grid=2&legend=1&size=600&itv=5&zoom_level=0&zoom_x=0000000&zoom_y=0000000&gov=&authKey=3ysqUXuHRcerKlF7h9XHOA