document.getElementById('confirm').addEventListener("click", function(){
    var date = document.getElementById('date').value
    var key = document.getElementById('key').value
    date = date.replace('-','')
    date = date.replace('-','')
    var hour = document.getElementById('hour').value
    var min = document.getElementById('min').value
    var cmp = document.getElementById('cmp').value
    var qcd = document.getElementById('qcd').value
    var obs = document.getElementById('obs').value
    var aws = document.getElementById('aws').value
    var url = `https://apihub.kma.go.kr/api/typ03/cgi/rdr/nph-rdr_cmp1_img?tm=${date}${hour}${min}&cmp=${cmp}&qcd=${qcd}&obs=${obs}&color=C4&aws=${aws}&map=HR&grid=2&legend=1&size=600&itv=5&authKey=${key}`
    try{
        document.getElementById('radarimg').src= url
        document.getElementById('radarimg').alt= '레이더가 불러와졌어요'
    }catch(error){
        document.getElementById('radarimg').alt= '이미지를 불러오는데 실패했어요'
        alert('이미지를 불러오는데 실패했어요. 변수를 다시 한번 확인해주세요!')
    }
    //https://apihub.kma.go.kr/api/typ03/cgi/rdr/nph-rdr_cmp1_img?tm=202302080000&cmp=HSP&qcd=HSLP&obs=ECHD&color=C4&aws=0&map=HR&grid=2&legend=1&size=600&itv=5&authKey=5aFO0TIuTfehTtEyLq33zA
})