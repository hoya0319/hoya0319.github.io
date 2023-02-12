document.getElementById('date').value = new Date().toISOString().substring(0, 10);
document.getElementById('rainarea_date').value = new Date().toISOString().substring(0, 10);
document.getElementById('wind_date').value = new Date().toISOString().substring(0, 10);

document.getElementById('confirm').addEventListener("click", function(){
    var date = document.getElementById('date').value
    key=document.getElementById('key').value;
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
})

document.getElementById('rainarea_confirm').addEventListener("click", function(){
    var date = document.getElementById('rainarea_date').value
    key=document.getElementById('key').value;
    date = date.replace('-','')
    date = date.replace('-','')
    var hour = document.getElementById('rainarea_hour').value
    var min = document.getElementById('rainarea_min').value
    var obs = document.getElementById('rainarea_obs').value
    var cmp = document.getElementById('rainarea_cmp').value
    var griddisp = document.getElementById('rainarea_griddisp').value;
    var aws = document.getElementById('rainarea_aws').value
    var url = `https://apihub.kma.go.kr/api/typ03/cgi/rdr/nph-rdr_sfc_pty_img?tm=${date}${hour}${min}&obs=${obs}&cmp=${cmp}&griddisp=${griddisp}&rnexdisp=2&map=HR&grid=2&legend=1&size=600&aws=${aws}&itv=5&authKey=${key}`
    // try{
        document.getElementById('rainarea_img').src= url
        document.getElementById('rainarea_img').alt= '레이더가 불러와졌어요'
    // }catch(error){
    //     alert('이미지를 불러오는데 실패했어요. 변수를 다시 한번 확인해주세요!')
    //     document.getElementById('rainarea_img').alt= '이미지를 불러오는데 실패했어요'
    // }
})
document.getElementById('wind_confirm').addEventListener("click", function(){
    var date = document.getElementById('wind_date').value
    key=document.getElementById('key').value;
    date = date.replace('-','')
    date = date.replace('-','')
    var hour = document.getElementById('wind_hour').value
    var min = document.getElementById('wind_min').value
    var wv = document.getElementById('wind_wv').value
    var ht = document.getElementById('wind_height').value
    var zoomx = document.getElementById('wind_zoomx').value;
    var zoomy = document.getElementById('wind_zoomy').value;
    var url = `https://apihub.kma.go.kr/api/typ03/cgi/rdr/nph-rdr_wis_ana_img?tm=${date}${hour}${min}&obs=wv&wv=${wv}&ht=${ht}&map=HR&grid=2&legend=1&size=600&itv=5&zoom_x=${zoomx}&zoom_y=${zoomy}&gov=&authKey=${key}`
    // try{
        document.getElementById('wind_img').src= url
        document.getElementById('wind_img').alt= '레이더가 불러와졌어요'
    // }catch(error){
    //     alert('이미지를 불러오는데 실패했어요. 변수를 다시 한번 확인해주세요!')
    //     document.getElementById('rainarea_img').alt= '이미지를 불러오는데 실패했어요'
    // }
})
//https://apihub.kma.go.kr/api/typ03/cgi/rdr/nph-rdr_wis_ana_img?tm=202212221025&obs=wv&wv=0&ht=800&map=HR&grid=2&legend=3&size=600&itv=5&zoom_level=0&zoom_x=0000000&zoom_y=0000000&gov=&authKey=ZyUOenzST3ylDnp80s988Q