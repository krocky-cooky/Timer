var STORSGE_KEY = 'Study-Timer';


(function () {
    var currentTimeElement = document.getElementById('currentTime');
    setInterval(() => {
        var date = new Date();
        var str = date.getFullYear()
            + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
            + '/' + ('0' + date.getDate()).slice(-2)
            + '/' + ('0' + date.getHours()).slice(-2)
            + ':' + ('0' + date.getMinutes()).slice(-2)
            + ':' + ('0' + date.getSeconds()).slice(-2);
        currentTimeElement.innerHTML = str;
    }, 1000);

    

    function createInstance(minute, second) {
        var num_min = minute.value;
        var num_sec = second.value;
        var timer = new Timer(num_min,num_sec);
        console.log(timer.getTime());
    }

    function createButton() {
        var minute = document.getElementById('minute');
        var second = document.getElementById('second');
       createInstance(minute,second);

    }

    document.getElementById('confirm-button').addEventListener('click',function(){
        createButton();
        console.log('event');
    },false);
})();