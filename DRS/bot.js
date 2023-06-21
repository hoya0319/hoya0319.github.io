function hexToDecimal(hex) {
    return parseInt(hex.replace("#", ""), 16)
}
function timeFunction(dateTime) {
    var date = new Date(dateTime);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hour = ('0' + date.getHours()).slice(-2);
    var minute = ('0' + date.getMinutes()).slice(-2);
    var second = ('0' + date.getSeconds()).slice(-2);

    return year + '년 ' + month + '월 ' + day + '일 ' + hour + '시 ' + minute + '분 ' + second + '초';
}
document.getElementById('notification').addEventListener("click", function () {
    document.getElementById('notification_box').style = 'display: block'
    document.getElementById('notification_name').textContent = '이름: ' + (document.getElementById('see_report_title').textContent).slice(0, -5)
    document.getElementById('notification_time').textContent = '보고시각: ' + (document.getElementById('report_time').textContent).slice(0, -3)
    document.getElementById('notification_disaster').textContent = '보고재해: ' + (document.getElementById('disaster').textContent).slice(0, -3)
    document.getElementById('notification_situation').textContent = '보고상황: ' + (document.getElementById('situation').textContent)
    document.getElementById('notification_comment').textContent = '보고내용: ' + (document.getElementById('comment').textContent)
    document.getElementById('notification').style = 'display:none;'
});
document.getElementById('notification_cancel').addEventListener("click", function () {
    document.getElementById('notification_box').style = 'display:none;'
    document.getElementById('notification_why').value = ' ';
    document.getElementById('notification').style = 'display:block;'
})
document.getElementById('notification_confirm').addEventListener("click", function () {
    var nowDate = new Date();
    var email = localStorage.getItem('email');
    if (email == null) {
        alert('로그인이 필요합니다.')
        window.location.replace("http://" + window.location.hostname + ((location.port == "" || location.port == undefined) ? "" : ":" + location.port) + "/index.html");

    } else {
        var content = document.getElementById('notification_why').value
        console.log(content)
        if (content == '' || content == ' ') {
            alert('신고 사유를 입력해주세요');
        } else {
            try {
                var comment
                if (document.getElementById('comment').textContent == '') {
                    comment = '-'
                } else {
                    comment = document.getElementById('comment').textContent
                }
                const request = new XMLHttpRequest();
                request.open("POST", "https://discord.com/api/webhooks/1119613700689637476/ln_6EMU7RLcf14a5SI4i8CqpYO_YdLQzd7A97zuLg9Ht9kJdVnT4cd4XhtYiqEOUzpGS");
                // replace the url in the "open" method with yours
                request.setRequestHeader('Content-type', 'application/json');
                var embed = {
                    title: "새로운 신고가 접수되었습니다.",
                    "fields": [
                        {
                            "name": '신고자 ID',
                            'value': email
                        }, {
                            "name": '신고시각',
                            'value': timeFunction(nowDate)
                        }, {
                            "name": '신고사유',
                            'value': document.getElementById('notification_why').value
                        }, {
                            "name": ' ',
                            'value': '신고하신 보고의 내용'
                        }, {
                            "name": '이름',
                            'value': (document.getElementById('see_report_title').textContent).slice(0, -5),
                            "inline": true
                        }, {
                            "name": '보고 재해',
                            'value': (document.getElementById('disaster').textContent).slice(0, -3),
                            "inline": true
                        }, {
                            "name": '보고 상황',
                            'value': document.getElementById('situation').textContent,
                            "inline": true
                        }, {
                            "name": '보고 시각',
                            'value': (document.getElementById('report_time').textContent).slice(0, -3),
                            "inline": false
                        }, {
                            "name": '보고 내용',
                            'value': comment,
                            "inline": false
                        }
                    ],
                    'timestamp': nowDate,
                    color: hexToDecimal("#ff0000")
                }
                const params = {
                    username: "DRS 신고 봇",
                    avatar_url: "",
                    embeds: [embed]
                }
                request.send(JSON.stringify(params));
                alert(`신고가 정상적으로 처리되었습니다.
처리 결과는 이메일로 보내드리겠습니다.`)
            } catch (error) {
                alert('신고에 실패하였습니다. 다시한번 시도해주세요.')
                console.log(error)
            }
            document.gcetElementById('notification_box').style = 'display:none;'
            document.getElementById('notification_why').value = ' '
            document.getElementById('notification').style = 'display:block;'
        }

    }
})