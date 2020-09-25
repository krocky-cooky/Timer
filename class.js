class Timer {
    constructor(minute, second,id) {
        this.minute = minute;
        this.second = second;
        this.id = id;
        this.cycle = 0;
    }

    getTime(){
        var str = '勉強時間: ' + String(this.minute) + '分 ' + '休憩時間: ' +  String(this.second) + '秒';
        return str;
    }
}