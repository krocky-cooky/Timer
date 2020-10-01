class Timer {
    constructor(study, rest,id) {
        this.study = study;
        this.rest = rest;
        this.id = id;
        this.state = 0;
        this.minute = 60;
    }

    getTime(){
        var str = '勉強時間: ' + String(this.study) + '分 ' + '休憩時間: ' +  String(this.rest) + '分';
        return str;
    }
    startCount(){
        this.state = 1;

        var self = this;

        function asyncCountdown(study,flag){
            return new Promise((resolve,reject) => {
                var studyTr = document.getElementById('study-tr');
                var restTr = document.getElementById('rest-tr');
                var trColor = 'bg-primary';
                if(flag){
                    studyTr.classList.add(trColor);
                    restTr.classList.remove(trColor);
                }else{
                    restTr.classList.add(trColor);
                    studyTr.classList.remove(trColor);
                }
                
                var timer = setInterval(() => {
                    if(self.state === 0){
                        clearInterval(timer);
                        reject();
                    }else{
                        study--;
                        self.printCount(study,flag);
                        console.log('残り' + String(study));
                        if(study === 0){
                            clearInterval(timer);
                            resolve();
                        }
                    }
                },1000);
            })
        }

        function asyncStudyRestCountdown(study,rest,cycle){
            asyncCountdown(study,true).then(response => {
                return asyncCountdown(rest,false);
            }).then(response => {
                console.log(cycle + 'サイクル終了');
                cycle++;
                var cycleElement = document.getElementById('cycle-count');
                cycleElement.innerHTML = '<h1>' + String(cycle) + '</h1>';
                
                asyncStudyRestCountdown(study,rest,cycle);
            },
            error => {
                console.log('カウントダウン終了');
            })
        }

        var cycle = 1;
        var study = this.study;
        var rest = this.rest;
        study *=  this.minute;
        rest *= this.minute;
        asyncStudyRestCountdown(study,rest,cycle);
        
        console.log('終了');
    }
    stopCount(){
        this.state = 0;
        document.getElementById('close-button').addEventListener('click',function(){
            document.getElementById('modal-base').style.display = "none";
    
        });
    }
    printCount(second,flag){
        var self = this;
        function culcTime(second){
            if(second === 0){
                if(flag){
                    second = self.study*self.minute;
                }else{
                    second = self.rest*self.minute;
                }
            }
            var sec = String(second%60);
            var min = String((second-sec)/60);
            sec = ('00' + sec).slice(-2);
            var str = min + ' : ' + sec;
            return str;
        }
        var studyElement = document.getElementById('study-time');
        var restElement = document.getElementById('rest-time');

        
        if(flag){
            studyElement.innerHTML = '<h1>' + culcTime(second) + '</h1>';
        }else{
            restElement.innerHTML = '<h1>' + culcTime(second) + '</h1>';
        }
        
    }
    setTimer(){
        this.printCount(this.study*this.minute,true);
        this.printCount(this.rest*this.minute,false);
        document.getElementById('cycle-count').innerHTML = '<h1>' + 1 + '</h1>';

    }


    
}