var STORSGE_KEY = 'Study-Timer';
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )
        todos.forEach(function (todo, index) {
            todo.id = index
        })
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}


    (function () {
        var currentTimeElement = document.getElementById('currentTime');
        setInterval(() => {
            var date = new Date();
            var str = date.getFullYear()
                + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
                + '/' + ('0' + date.getDate()).slice(-2)
                + '/' + ('0' + date.getHours()).slice(-2)
                + '/' + ('0' + date.getMinutes()).slice(-2)
                + '/' + ('0' + date.getSeconds()).slice(-2);
            currentTimeElement.innerHTML = str;
        }, 1000);

        function createInstance(minute, second) {
            var num_min = minute.value;
            var num_sec = second.value;
            var timer = new timer(minute.second);
        }

        function createInstance() {
            var minute = document.getElementById('minute');
            var second = document.getElementById('second');

        }
    })();