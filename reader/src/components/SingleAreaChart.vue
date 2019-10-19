<template>
    <div>
        <div v-if="title" :style="{width:width+'px'}" class="title">{{title}}</div>
        <div :id="containerId" :style="{width:width+'px',height:height+'px'}"></div>
    </div>
</template>

<script>
var echarts = require('echarts');
    export default {
        name: 'SingleAreaChart',
        props:{
            title:String,
            x_data:{
                type:Array,
                required:true
            },
            y_data:{
                type:Array,
                required:true
            },
            width:{
                type:Number,
                default:400
            },
            height:{
                type:Number,
                default:300
            },
            containerId:{
                type:String,
                default:'singleAreaChart'
            },
            update:{
                type:Number,
                default:0
            }
        },
        data() {
            return {
                myChart:null
            }
        },
        watch:{
            update(){
                if(this.myChart){
                    this.changeOption();
                }
            }
        },
        methods:{
            changeOption(){
                let option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        show:false
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top:'3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#999',
                            }
                        },
                        //网格线
                        splitLine: {
                            show:true,
                        },
                        data: this.x_data
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#999',
                            }
                        },
                        axisTick: {
                            lineStyle: {
                                color: '#999',
                            }
                        },
                    },
                    series: [
                        {
                            type:'line',
                            smooth: true,
                            showSymbol:false,
                            symbolSize: 5,
                            data:this.y_data,
                            itemStyle: { 
                                normal: { 
                                    color: "rgba(179,127,235,0.5)", 
                                    lineStyle: { 
                                        color: '#2f54eb',
                                        width: 0,
                                    } 
                                }
                            },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#2f54eb' // 0% 处的颜色
                                    }, {
                                        offset: 0.5, color: '#adc6ff' // 100% 处的颜色
                                    },{
                                        offset: 1, color: '#adc6ff' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        }
                    ]
                };
                this.myChart.setOption(option);
            }
        },
        mounted(){
            this.$nextTick(function(){
                this.myChart = echarts.init(document.getElementById(this.containerId));
                this.changeOption();
            })
        }
    }
</script>
<style lang="" scoped>
    .title{
        font-size: 16px;
        font-weight: 600;
        color: black;
        text-align: center;
    }
</style>