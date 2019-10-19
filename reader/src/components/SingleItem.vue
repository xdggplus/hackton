<template>
    <div class="item-box">
        <div :style="{'background-image':'url('+imageData+')'}" class="item-img"></div>
        <div style="border-bottom: 0.5px solid #8c8c8c; display: inline-block;">
            <div class="item-jindu" :style="{width:(width-80)+'px'}">
                <div class="item-jindu-name">{{name}}</div>
                <div class="item-jindu-perent">
                    <div class="item-jindu-percent-line"  :style="{'width':jindu_width+'px'}" style="width:50px;"></div>
                    <div class="item-jindu-perent-time">{{minTransToHumanRead(useMin)}}</div>
                </div>
            </div>
            <div class="item-icon-right" style="width:20px;">
                <span class="item-icon-right-icon"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SingleItem',
        props:{
            imageData:{
                type:String,
                required:true
            },
            name:String,
            useMin:{
                type:Number,
                required:true
            }, //使用了几分钟
            maxMin:{
                type:Number,
                required:true
            }, //用时最多的一种,用了多长时间(用来画时间进度条)
            width:{
                type:Number,
                default:300
            } //列表长度
        },
        data() {
            return {
            }
        },
        computed:{
            jindu_width:function(){
                if(this.useMin<=0 || this.maxMin<=0){
                    return 5;
                }else{
                    return parseInt(5 + (this.width-80-100)*(this.useMin/this.maxMin));
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
            }
        }
    }
</script>

<style lang="" scoped>
    .item-box{
        height: 40px;
        text-align: left;
        font-size: 16px;
        margin-top: 10px;
    }
    .item-img{
        background-repeat: no-repeat;
        background-position:center center;
        width: 20px;
        height: 20px;
        display: inline-block;
        margin: 10px 10px 0;
    }
    .item-jindu{
        height: 40px;
        display: inline-block;
    }

    .item-jindu .item-jindu-name{
        display: block;
        font-size: 16px;
        height: 20px;
    }

    .item-jindu .item-jindu-percent{
        display: block;
        height: 20px;
    }

    .item-jindu-percent-line{
        display: inline-block;
        height: 6px;
        background-color: #8c8c8c;
        border-radius: 3px;
    }

    .item-jindu-perent-time{
        font-size: 12px;
        display: inline-block;
        margin-left: 5px;
        color: #8c8c8c;
    }

    .item-icon-right{
        display: inline-block;
        font-size: 16px;
    }

    .item-icon-right-icon{
        height: 40px;
        font-family: Ionicons;
        font-weight: 400; 
    }

    .item-icon-right-icon::before{
        content: "\F11F";
        box-sizing: border-box;
    }
</style>