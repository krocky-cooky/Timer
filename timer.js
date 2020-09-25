var STORSGE_KEY = 'StudyTimer';

var timerStorage = {
    fetch: function(){
        var timers = JSON.parse(
            localStorage.getItem(STORSGE_KEY) || '[]'
        )
        this.uid = timers.length;
        console.log(this.uid);
        return timers;
    },

    save: function(timer){
        localStorage.setItem(STORSGE_KEY,JSON.stringify(timer));
        timerStorage.uid++;
    },
};

var timerList = [];


(function () {
    timerList = timerStorage.fetch();
    
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


    for(var i = 0; i < timerList.length; ++i){
        var study = timerList[i].study;
        var rest = timerList[i].rest;
        appendTable(study,rest);
    }

    function appendTable(study,rest) {
        var new_tr = document.createElement('tr');
        var study_td = document.createElement('td');
        var rest_td = document.createElement('td');
        
        study_td.appendChild(
            document.createTextNode(String(study) + '分')
        );
        rest_td.appendChild(
            document.createTextNode(String(rest) + '分')
        );
        new_tr.appendChild(study_td);
        new_tr.appendChild(rest_td);
        document.getElementById('study-rest-time').appendChild(new_tr);
    }

    function createInstance(study, rest) {
        var num_stu = study.value;
        var num_res = rest.value;
        var id = timerStorage.uid || 0;
        console.log(id);
        var timer = new Timer(num_stu,num_res,id);
        timerList.push({
            "id": id,
            "study": num_stu,
            "rest": num_res
        });
        timerStorage.save(timerList);
        console.log(timer.getTime());
        appendTable(num_stu,num_res);

    }

    function createButton() {
        var study = document.getElementById('study');
        var rest = document.getElementById('rest');
       createInstance(study,rest);

    }


    

    document.getElementById('confirm-button').addEventListener('click',function(){
        createButton();
        console.log('event');
    },false);
})();