let vm = new Vue({
    el:'#apps',
    data:{
        list:[
            {id:1,cnt:"做饭",isFinished:false},
            {id:2,cnt:"吃饭",isFinished:false},
            {id:3,cnt:"洗碗",isFinished:false}
        ],
        todolist:[],
        doneths:'',
        allcount:0,
        todocount:0,
        donecount:0,
        todocnt:'',
        value:1
    },
    created(){
        // localStorage.setItem()
        // this.todolist = this.deepClone(this.list);
        // console.log(this.todolist)
        this.countlen();
    },
    updated(){
        this.countlen();
    },
    methods:{
        changelist(value){
            this.value=value;
        },
        addTodolist(){
            if(!this.todocnt){
                console.log("输入为空")
                return;
            };
            let temp = {id:this.allcount+1,cnt:this.todocnt,isFinished:false};
            this.list.push(temp);
            this.todolist.push(temp);
            this.todocnt='';
            this.value = 2;
        },
        deepClone(obj) {
            let clone = [];
            for (let key in obj) {
                clone[key] = obj[key];
            }
            return clone;
        },
        changed(){
            // let con=0;
            // this.todolist.forEach(element => {
            //     if(element.cnt==item){
            //         con++;
            //         this.list[index].isFinished = !this.list[index].isFinished
            //         console.log(index)
            //     }
            // });
            // this.list[id-1].isFinished = !this.list[id-1].isFinished
            this.countlen();
            
        },
        countlen(){
            this.allcount = this.list.length;
            let done = this.list.filter(item => item.isFinished);
            this.donecount = done.length;
            this.todocount = this.allcount-this.donecount;
            // console.log("zhs"+this.donecount)
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
        },
    }
})