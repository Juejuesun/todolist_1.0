let vm = new Vue({
    el:'#apps',
    data:{
        list:[
            {id:1,cnt:"做饭",isFinished:false,editable:false},
            {id:2,cnt:"吃饭",isFinished:false,editable:false},
            {id:3,cnt:"洗碗",isFinished:false,editable:false}
        ],
        allcount:0,
        todocount:0,
        donecount:0,
        todocnt:'',
        value:1,
        timeShow:'',
        weatherNowFl:'',
        weatherNowCont:''
    },
    created(){
        // localStorage.setItem()
        // this.todolist = this.deepClone(this.list);
        // console.log(this.todolist)
        this.getWeatherInfo() //获取天气
        this.updateDate();
        this.countlen();
        // this.renderTime();
        setInterval(this.renderTime,1000);
    },
    updated(){
        this.countlen();
    },
    methods:{
        changelist(value){
            this.value=value;
        },
        addTodolist(){
            if(!this.todocnt.trim()){
                console.log("输入为空");
                return;
            };
            let temp = {id:this.allcount+1,cnt:this.todocnt,isFinished:false,editable:false};
            this.updateDate();
            this.list.push(temp);
            this.saveData();
            this.todocnt="";
            this.value = 2;
        },
        clearTodolist(){
            localStorage.clear();
            this.updateDate();
        },
        saveData(){    //保存数据 将现在的list存入本地
            localStorage.setItem('todonow',JSON.stringify(this.list));
        },
        updateDate(){   //更新数据 获取本地数据
            this.list = JSON.parse(localStorage.getItem('todonow')||'[]');
        },
        todoEdit(todo){
            todo.editable = true;
        },
        todoEdited(todo){
            todo.editable = false;
            this.saveData();
        },
        deepClone(obj) {
            let clone = [];
            for (let key in obj) {
                clone[key] = obj[key];
            }
            return clone;
        },
        changed(){
            this.countlen();
        },
        countlen(){
            this.allcount = this.list.length;
            let done = this.list.filter(item => item.isFinished);
            this.donecount = done.length;
            this.todocount = this.allcount-this.donecount;
            // console.log("zhs"+this.donecount)
        },
        del(todo){
            let index = this.list.indexOf(todo);
            this.list.splice(index,1);
            this.saveData();

        },
        renderTime() {
            let now = new Date();
            let year = now.getFullYear();
            let mon = now.getMonth()+1;
            let date = now.getDate();
            let time = now.getTime();
            let hours = now.getHours();
            let mins = now.getMinutes();
            let sed = now.getSeconds();
            // console.log(year,mon,date,hours,mins,sed);//打印
            hours = hours.toString().padStart(2,'0');
            mins = mins.toString().padStart(2,'0');
            sed = sed.toString().padStart(2,'0');
            this.timeShow = year+"年 "+mon+"月 "+date+"日 "+""+hours+":"+mins+":"+sed;
        },
        getWeatherInfo(){
            this.$http.get('https://free-api.heweather.net/s6/weather/now?location=CN101230101&key=41e18f448550468fb039140c6c030c9a').then(function(weatherData){
                console.log(weatherData.body.HeWeather6[0].now);
                this.weatherNowFl = weatherData.body.HeWeather6[0].now.fl;
                this.weatherNowCont = weatherData.body.HeWeather6[0].now.cond_txt;

            })
        }
    },
    computed:{
        filterList () {
            if (this.value === 2) {
                // this.listname = '待完成任务'
                return this.list.filter(item => !item.isFinished)
            } else if (this.value === 3) {
                // this.listname = '已完成任务'
                return this.list.filter(item => item.isFinished)
            } else {
                // this.listname = '所有任务'
                return this.list
            }
        }
    }
})