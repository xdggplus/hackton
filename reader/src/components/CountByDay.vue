<template>
    <div>
        <div class="all-time-label">
            {{allTimeLable}}
        </div>
        <div :id="containerId" :style="{height:height + 'px',width:width+'px'}">
        </div>
        <div class="type-all">
            <div v-for="item in allTypeCountList" class="type-all-item" :key="item.name">
                <div class="type-all-item-name" :style="{color:item.color}">{{item.name}}</div>
                <div class="type-all-item-value">{{item.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>
var echarts = require('echarts');
export default {
    name: 'CountByDay',
    props:{
        allTimeLable:{
            type:String,
            required:true
        },
        typeList:{
            type:Array,
            required:true
        },
        timeList:{
            type:Array,
            required:true
        },
        typeTimeData:{
            type:Array,
            required:true
        },
        containerId:{
            type:String,
            default:"count_by_day_echarts"
        },
        timeUnit:{
            type:String,
            default:"分钟"
        },
        width:{
            type:Number,
            default:400
        },
        height:{
            type:Number,
            default:280
        },
        update:0,
    },
    data() {
        return {
            optiong:{},
            myChart :null,
            colors:[
                '#2f54eb',
                '#722ed1',
                '#eb2f96',
                '#52c41a',
                '#13c2c2',
                '#1890ff',
                '#faad14',
                '#fadb14',
                '#a0d911',
                '#fa541c'
            ],
            allTypeCountList:[]
        }
    },
    watch:{
        update(){
            if(this.myChart){
                this.myChart.setOption(this.dataChange());
            }
        }
    },
    methods:{
        minTransToHumanRead(num){
            num = parseInt(num);
            if(num<1){
                return "1分钟";
            }
            if(num<60){
                return num + "分钟";
            }
            
            let h = parseInt(num/60);
            let m = num % 60;

            if(m<1){
                return h+"个小时";
            }else{
                return h+"小时"+m+"分钟";
            }
        },
        dataChange(){
            if(!this.typeTimeData || this.typeTimeData.length<1){
                console.error("typeTimeData 数据为空");
                return;
            }

            let that = this;
            
            let allTypeCountList = [];

            let series = [];
            for(let i in this.typeTimeData){
                let theColor = this.colors[i%10];
                let theData = this.typeTimeData[i];
                let theName = this.typeList[i];
                let ser = {
                    name:theName,
                    type:'line',
                    stack:'总量',
                    data:theData,
                    areaStyle:{
                        color:theColor
                    },
                    lineStyle:{
                        width:0
                    },
                    smooth:true,
                    showSymbol:false,
                }
                series.push(ser);

                let allCount = 0;
                for(let dataIdx in theData){
                    allCount += theData[dataIdx];
                }

                allCount = this.minTransToHumanRead(allCount);
                allTypeCountList.push({
                    name:theName,
                    color:theColor,
                    count:allCount
                });

            }
            this.allTypeCountList = allTypeCountList;

            let newOption = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#1890ff'
                        }
                    },
                    formatter: function (params, ticket, callback) {
                        let content = "<div style='text-align: left;font-size:16px'>"+params[0].name + "<br/>";
                        for(let i in params){
                            let param = params[i];
                            content +=  "<span style='display:inline-block;width:10px;height:10px;border-radius:5px;background-color:"+that.colors[i%10]+"'></span><span style='margin-left:5px'>"+param.seriesName+"："+param.value+that.timeUnit+"</span><br/>";
                        }
                        return content;
                    }
                },
                legend: {
                    data:this.typeList,
                    show:false,
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top:'5%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.timeList
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series:series
            }
            return newOption;
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.myChart = echarts.init(document.getElementById(this.containerId));
            this.myChart.setOption(this.dataChange());
        })
    }
}
</script>

<style lang="" scoped>
    .all-time-label{
        color: '#262626';
        font-size: 18px;
        font-weight: 600;
        line-height: 30px;
        text-align: left;
        margin: 5px 10px;
    }

    .type-all{
        margin: 5px 10px;  
        display: flex;

    }

    .type-all-item{
        flex: 1;
        text-align: center;
        font-size: 14px;
        line-height: 1.2;
    }

    .type-all-item-name{
        font-weight: 600;
    }

    .type-all-item-value{
        color: #8c8c8c;
        margin-top: 5px;
    }
</style>