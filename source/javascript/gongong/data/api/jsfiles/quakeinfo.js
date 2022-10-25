var xhr = new XMLHttpRequest();
function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + month + day;
}
var url = 'http://apis.data.go.kr/1360000/EqkInfoService/getEqkMsg';

//API URL 구하기
var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + 'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
queryParams += '&' + encodeURIComponent('fromTmFc') + '=' + encodeURIComponent(getToday() - 3); /**/
queryParams += '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(getToday()); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function(){
    if (this.readyState == 4){
        try{
            var myObj = JSON.parse(this.responseText);
        }catch(error){
            document.getElementById('quake_title').textContent= "[01] 어플리케이션 에러 발생(APPLICATION_ERROR)"
        }
        if(myObj.response.header.resultCode == "00"){
            var quakeinfo = myObj.response.body.items.item[0];
            try{
                //타이틀
                if (quakeinfo.fcTp == 2){
                    //국외지진정보
                    if(quakeinfo.mt >= 7.0){
                        document.getElementById('quake_title').textContent = '해외에서 매우 강한 지진이 발생했습니다.'
                    }else if (quakeinfo.mt >= 6.0){
                        document.getElementById('quake_title').textContent = '해외에서 강한 지진이 발생했습니다.'
                    }else{
                        document.getElementById('quake_title').textContent = '해외에서 지진이 발생했습니다.'
                    }
                    //진도 예외 처리
                    document.getElementById('intensity').textContent = "국외지진정보는 최대진도 정보가 제공되지 않습니다."
                } else if (quakeinfo.fcTp == 3 || quakeinfo.fcTp == 5){
                    //국내지진정보 || 국내지진정보 재통보
                    if (quakeinfo.mt >= 2.0){
                        document.getElementById('quake_title').textContent = '국내에서 규모 2.0 이상의 지진이 발생했습니다.'
                    }else if (quakeinfo.mt >= 3.0){
                        document.getElementById('quake_title').textContent = '국내에서 규모 3.0 이상의 약간 강한 지진이 발생했습니다.'
                    }else if (quakeinfo.mt >= 4.0){
                        document.getElementById('quake_title').textContent = '국내에서 규모 4.0 이상의 강한 지진이 발생했습니다.'
                    } else if (quakeinfo.mt >= 5.0){
                        document.getElementById('quake_title').textContent = '국내에서 규모 5.0 이상의 매우 강한 지진이 발생했습니다.'
                    } else{
                        document.getElementById('quake_title').textContent = '국내에서 지진이 발생했습니다.'
                    }
                    document.getElementById('intensity').textContent = quakeinfo.inT
                }

                //발생 시각 구하기
                var yyyymmdd = String(quakeinfo.tmEqk);
                var year = yyyymmdd.slice(0, 4);
                var month = yyyymmdd.slice(4, 6);
                var date = yyyymmdd.slice(6, 8);
                var hour = yyyymmdd.slice(8, 10);
                var minute = yyyymmdd.slice(10, 12);
                var sec = yyyymmdd.slice(12, 14);
                document.getElementById('quake_time').textContent = year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분 " + sec + "초";
                //
                document.getElementById('quake_location').textContent = quakeinfo.loc;
                try{
                    document.getElementById('lat').textContent = "("+quakeinfo.lat +",";
                    document.getElementById('lon').textContent = quakeinfo.lon + ")";
                }catch(error){
                    
                }
                
                //규모 처리
                var mag = String(quakeinfo.mt)
                if (mag.length == 1){
                    document.getElementById('magnitude').textContent = quakeinfo.mt + ".0"
                }else{
                    document.getElementById('magnitude').textContent = quakeinfo.mt
                }

                //깊이 처리
                if (quakeinfo.dep == 0){
                    document.getElementById('depth').textContent = "-km"
                }else{
                    document.getElementById('depth').textContent = quakeinfo.dep + "km"
                }

                //지도 불러오기
                document.getElementById('quake_img').src = quakeinfo.img;

                //참고사항
                document.getElementById('quake_rem').textContent = quakeinfo.rem;

                //코멘트
                try{
                    if (quakeinfo.mt >= 8.0 && quakeinfo.dep >= 10){
                        document.getElementById('comment').textContent = '일반적으로 이 정도 규모의 지진이 해역에서 발생하면 광범위한 지역에 해일 발생 위험이 있습니다.'
                    }else if (quakeinfo.mt >= 8.0 && quakeinfo.dep >= 50 && quakeinfo.dep <= 80){
                        document.getElementById('comment').textContent = '일반적으로 이 정도 규모의 지진이 해역에서 발생하면 진원 근방 지역에 해일 발생 위험이 있습니다.'
                    }else if (quakeinfo.mt >= 7.0 && quakeinfo.dep >= 10){
                        document.getElementById('comment').textContent = '일반적으로 이 정도 규모의 지진이 해역에서 발생하면 넓은 지역에 해일 발생 위험이 있습니다.'
                    }else if (quakeinfo.mt >= 7.0 && quakeinfo.dep >= 30 && quakeinfo.dep <= 50){
                        document.getElementById('comment').textContent = '일반적으로 이 정도 규모의 지진이 해역에서 발생하면 진원 근방에 해일 발생 위험이 있습니다.'
                    }else if (quakeinfo.mt >= 6.5 && quakeinfo.dep >= 10 && quakeinfo.dep <= 20){
                        document.getElementById('comment').textContent = '일반적으로 이 정도 규모의 지진이 해역에서 발생하면 진원 근방에서 작은 해일 발생 위험이 있습니다.'
                    }else{
                        document.getElementById('comment').textContent = '일반적으로 이 정도 규모는 해일을 발생시키지 않습니다.'
                    }
                    document.getElementById('comment_ex').textContent = "※이 항목은 기상청의 의견이 아닌 '호야-재난방송'의 독자적인 의견이며 실제와는 다를 수 있습니다. 이 문장은 규모와 깊이에 근거하여 정해진대로 출력되므로 사실과 맞지 않을 수 있습니다."
                }catch(error){
                    
                }
            }catch(error){
                document.getElementById('quake_title').textContent = "오류가 발생했습니다. 페이지를 새로고침 해 보세요."
            }
        }else if(myObj.response.header.resultCode == "01"){
            document.getElementById('quake_title').textContent = "[01]  어플리케이션 에러 발생(APPLICATION_ERROR)"
        }else if(myObj.response.header.resultCode == "02"){
            document.getElementById('quake_title').textContent = "[02]  데이터베이스 에러 발생(DATABASE_ERROR)"
        }else if (myObj.response.header.resultCode == "03"){
            try{
                document.getElementById('quake_info').style.display = 'none';
                document.getElementById('quake_info_br').style.display = 'none';
            }catch(error){
                document.getElementById('quake_title').textContent = "최근 3일간 발표된 지진정보는 없습니다."
            }
        }else if (myObj.response.header.resultCode == "04"){
            document.getElementById('quake_title').textContent = "[04] HTTP 에러 발생(HTTP_ERROR)"
        }else if(myObj.response.header.resultCode == "05"){
            document.getElementById('quake_title').textContent = "[05] 서비스 연결 실패(SERVICETIME_OUT)"
        }else if(myObj.response.header.resultCode == "10"){
            document.getElementById('quake_title').textContent = "[10] 요청 파라메터가 잘못됨(INVALID_REQUEST_PARAMETER_ERROR)"
        }else if(myObj.response.header.resultCode == "11"){
            document.getElementById('quake_title').textContent = '[11] 필수 요청 파라메터가 없음(NO_MANDATORY_REQUEST_PARAMETER_ERROR)'
        }else if(myObj.response.header.resultCode == "12"){
            document.getElementById('quake_title').textContent = '[12] 해당 오픈API 서비스가 없거나 폐기됨(NO_OPENAPI_SERVICE_ERROR)'
        }else if(myObj.response.header.resultCode == "20"){
            document.getElementById('quake_title').textContent = '[20] 서비스 접근이 거부됨(SERVICE_ACCESS_DENIED_ERROR)'
        }else if(myObj.response.header.resultCode == "21"){
            document.getElementById('quake_title').textContent = '[21] 서비스 키를 일시적으로 사용할 수 없음(TEMPORARILY_DISABLE_THE_SERVICEKEY_ERROR)'
        }else if(myObj.response.header.resultCode == "22"){
            document.getElementById('quake_title').textContent = '[22] 서비스 요청 제한 횟수가 초과됨(LIMITED_NUMBER_OF_SERVICE_REQUESTS_EXCEEDS_ERROR)'
        }else if(myObj.response.header.resultCode == "30"){
            document.getElementById('quake_title').textContent = '[30] 서비스 키가 등록되지 않음(SERVICE_KEY_IS_NOT_REGISTERED_ERROR)'
        }else if(myObj.response.header.resultCode == "31"){
            document.getElementById('quake_title').textContent = '[31] 서비스 키의 기한이 만료됨(DEADLINE_HAS_EXPIRED_ERROR)'
        }else if(myObj.response.header.resultCode == "32"){
            document.getElementById('quake_title').textContent = '[32] IP가 등록되지 않음(UNREGISTERED_IP_ERROR)'
        }else if(myObj.response.header.resultCode == "33"){
            document.getElementById('quake_title').textContent = '[33] 서명되지 않은 호출(UNSIGNED_CALL_ERROR)'
        }else if(myObj.response.header.resultCode == "99"){
            document.getElementById('quake_title').textContent = '[99] 기타 에러 발생(UNKNOWN_ERROR)'
        }else{
            document.getElementById('quake_title').textContent = '예외처리되지 않은 에러가 발생하였습니다'
        }
    }
};
xhr.send('');
console.log(url + queryParams)