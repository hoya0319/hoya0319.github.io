var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/1741000/DisasterMsg3/getDisasterMsg1List'; /*URL*/
var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'cl5s8i4yp76CKdNIDbn0RZDOYdzjAgzPaTtbVMDqnKWHomjjBtq%2BmajQpYggkXVlfj4FY2x304%2FuTVIm1DilIw%3D%3D'; /*Service Key*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('40'); /**/
queryParams += '&' + encodeURIComponent('type') + '=' + encodeURIComponent('json'); /**/
xhr.open('GET', url + queryParams);
xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        console.log(url+queryParams)
        try {
            var myObj = JSON.parse(this.responseText);
        }catch(error){
            
        }
        var date = []
        var name = []
        var message = []
        var msg = myObj.DisasterMsg[1].row;
        for(i=0; i<40; i++){
            date.push(msg[i].create_date)
            name.push(msg[i].location_name)
            message.push(msg[i].msg)
        }
        for(i=0; i<20; i++){
            name[i] = name[i].toString()
        }

        document.getElementById('msg1').textContent = message[0]
        document.getElementById('name1').textContent = `송출지역 : ${name[0]}`
        document.getElementById('time1').textContent = `송출시각 : ${date[0]}`
        
        document.getElementById('msg2').textContent = message[1]
        document.getElementById('name2').textContent = `송출지역 : ${name[1]}`
        document.getElementById('time2').textContent = `송출시각 : ${date[1]}`
        
        document.getElementById('msg3').textContent = message[2]
        document.getElementById('name3').textContent = `송출지역 : ${name[2]}`
        document.getElementById('time3').textContent = `송출시각 : ${date[2]}`
        
        document.getElementById('msg4').textContent = message[3]
        document.getElementById('name4').textContent = `송출지역 : ${name[3]}`
        document.getElementById('time4').textContent = `송출시각 : ${date[3]}`
        
        document.getElementById('msg5').textContent = message[4]
        document.getElementById('name5').textContent = `송출지역 : ${name[4]}`
        document.getElementById('time5').textContent = `송출시각 : ${date[4]}`
        
        document.getElementById('msg6').textContent = message[5]
        document.getElementById('name6').textContent = `송출지역 : ${name[5]}`
        document.getElementById('time6').textContent = `송출시각 : ${date[5]}`
        
        document.getElementById('msg7').textContent = message[6]
        document.getElementById('name7').textContent = `송출지역 : ${name[6]}`
        document.getElementById('time7').textContent = `송출시각 : ${date[6]}`
        
        document.getElementById('msg8').textContent = message[7]
        document.getElementById('name8').textContent = `송출지역 : ${name[7]}`
        document.getElementById('time8').textContent = `송출시각 : ${date[7]}`
        
        document.getElementById('msg9').textContent = message[8]
        document.getElementById('name9').textContent = `송출지역 : ${name[8]}`
        document.getElementById('time9').textContent = `송출시각 : ${date[8]}`
        
        document.getElementById('msg10').textContent = message[9]
        document.getElementById('name10').textContent = `송출지역 : ${name[9]}`
        document.getElementById('time10').textContent = `송출시각 : ${date[9]}`
        
        document.getElementById('msg11').textContent = message[10]
        document.getElementById('name11').textContent = `송출지역 : ${name[10]}`
        document.getElementById('time11').textContent = `송출시각 : ${date[10]}`
        
        document.getElementById('msg12').textContent = message[11]
        document.getElementById('name12').textContent = `송출지역 : ${name[11]}`
        document.getElementById('time12').textContent = `송출시각 : ${date[11]}`
        
        document.getElementById('msg13').textContent = message[12]
        document.getElementById('name13').textContent = `송출지역 : ${name[12]}`
        document.getElementById('time13').textContent = `송출시각 : ${date[12]}`
        
        document.getElementById('msg14').textContent = message[13]
        document.getElementById('name14').textContent = `송출지역 : ${name[13]}`
        document.getElementById('time14').textContent = `송출시각 : ${date[13]}`
        
        document.getElementById('msg15').textContent = message[14]
        document.getElementById('name15').textContent = `송출지역 : ${name[14]}`
        document.getElementById('time15').textContent = `송출시각 : ${date[14]}`
        
        document.getElementById('msg16').textContent = message[15]
        document.getElementById('name16').textContent = `송출지역 : ${name[15]}`
        document.getElementById('time16').textContent = `송출시각 : ${date[15]}`
        
        document.getElementById('msg17').textContent = message[16]
        document.getElementById('name17').textContent = `송출지역 : ${name[16]}`
        document.getElementById('time17').textContent = `송출시각 : ${date[16]}`
        
        document.getElementById('msg18').textContent = message[17]
        document.getElementById('name18').textContent = `송출지역 : ${name[17]}`
        document.getElementById('time18').textContent = `송출시각 : ${date[17]}`
        
        document.getElementById('msg19').textContent = message[18]
        document.getElementById('name19').textContent = `송출지역 : ${name[18]}`
        document.getElementById('time19').textContent = `송출시각 : ${date[18]}`
        
        document.getElementById('msg20').textContent = message[19]
        document.getElementById('name20').textContent = `송출지역 : ${name[19]}`
        document.getElementById('time20').textContent = `송출시각 : ${date[19]}`

    }
};

xhr.send('');