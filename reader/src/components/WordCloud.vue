<template>
    <div :id="containerId" :style="{width:width + 'px',height:height+'px'}">
    </div>
</template>

<script>
var echarts = require('echarts');
require('echarts-wordcloud');
    export default {
        name: 'WordCloud',
        props:{
            width:{
                type:Number,
                default:400
            },
            height:{
                type:Number,
                default:300
            },
            wordCloudData:{
                type:Array,
                require:true
            }, // [{name:'xxxx',value:123}]
            containerId:{
                type:String,
                default:"wordCloudEcharts"
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
                    this.changeOption()
                }
            }
        },
        methods:{
            createRandomColor(){
                return {color:'rgb(' +
                        Math.round(Math.random() * 255) +
                        ', ' + Math.round(Math.random() * 255) +
                        ', ' + Math.round(Math.random() * 255) + ')'};
            },
            changeOption(){
                let option = {
                    series: [{
                        name: '舆情信息',
                        type: 'wordCloud',
                        size: ['90%', '90%'],
                        textRotation : [-90, 90],
                        shape: 'circle',
                        autoSize: {
                            enable: true,
                            minSize: 14
                        },
                        textStyle: {
                            normal: {
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                // Color can be a callback function or a color string
                                color: function () {
                                    // Random color
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 255)
                                    ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 2,
                                shadowColor: '#333'
                            }
                        },
                        data:this.wordCloudData
                    }]
                }

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