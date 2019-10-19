<template>
  <div id="app">
    <count-by-day 
      :typeList="typeList"
      :timeList="timeList"
      :typeTimeData="typeTimeData"
      :allTimeLable="allTimeLable"
      :width="600"></count-by-day>
    
    <single-item v-for="(item,idx) in itemList" :key="'item_'+idx"
      :name="item.name"
      :imageData="item.imageData"
      :useMin="item.useMin"
      :maxMin="maxMin"
      :width="600"></single-item>

      <word-cloud
        :wordCloudData="wordCloudData"></word-cloud>

      <single-area-chart
        title="baidu.com访问历史记录"
        :x_data="timeList"
        :y_data="typeTimeData[0]"
        :width="600"
        :height="400"></single-area-chart>
  </div>
</template>

<script>
import CountByDay from "../components/CountByDay.vue";
import SingleItem from "../components/SingleItem.vue";
import WordCloud from "../components/WordCloud.vue";
import SingleAreaChart from "../components/SingleAreaChart.vue";
export default {
  name: 'app',
  data () {
    return {
      msg: 'This is popup page !',
      allTimeLable:'今日浏览器使用情况分析',
      timeList:['12日','13日','14日','15日','16日','17日','18日','19日'],
      typeList:['搜索引擎','社交网站','新闻娱乐','技术论坛','其他'],
      typeTimeData:[
        [14,1,5,13,32,12,33,22],
        [12,43,23,43,2,33,18,20],
        [12,3,2,4,8,6,7,2],
        [21,22,19,15,23,11,16,25],
        [10,9,4,6,7,4,3,7]
      ],
      itemList:[
        {
          imageData:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAeCAYAAAAcni9KAAAAaElEQVQ4jcXTMQ4AEBAEQH/yJ69Vq31CTSWRC26dDcVVu1NtzvkQq+VcyuUDPMUpFwJEce9yoIbHHg+usOxwocSznA87XmV2aH4rbbM3ENmVB5FdeXC3qcT3UEMS30EUjdgOTxH0Vrtri9j3uTwNEWIAAAAASUVORK5CYII=",
          name:"谷歌",
          useMin:132
        },
        {
          imageData:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAeCAYAAAAcni9KAAAAaElEQVQ4jcXTMQ4AEBAEQH/yJ69Vq31CTSWRC26dDcVVu1NtzvkQq+VcyuUDPMUpFwJEce9yoIbHHg+usOxwocSznA87XmV2aH4rbbM3ENmVB5FdeXC3qcT3UEMS30EUjdgOTxH0Vrtri9j3uTwNEWIAAAAASUVORK5CYII=",
          name:"百度",
          useMin:86
        },
        {
          imageData:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAeCAYAAAAcni9KAAAAaElEQVQ4jcXTMQ4AEBAEQH/yJ69Vq31CTSWRC26dDcVVu1NtzvkQq+VcyuUDPMUpFwJEce9yoIbHHg+usOxwocSznA87XmV2aH4rbbM3ENmVB5FdeXC3qcT3UEMS30EUjdgOTxH0Vrtri9j3uTwNEWIAAAAASUVORK5CYII=",
          name:"招商银行",
          useMin:50
        },
        {
          imageData:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAeCAYAAAAcni9KAAAAaElEQVQ4jcXTMQ4AEBAEQH/yJ69Vq31CTSWRC26dDcVVu1NtzvkQq+VcyuUDPMUpFwJEce9yoIbHHg+usOxwocSznA87XmV2aH4rbbM3ENmVB5FdeXC3qcT3UEMS30EUjdgOTxH0Vrtri9j3uTwNEWIAAAAASUVORK5CYII=",
          name:"陌陌",
          useMin:20
        }
      ],
      maxMin:132,

      wordCloudData:[
        {
          name:"12306",
          value:12353
        },
        {
          name:"招商银行",
          value:1233
        },
        {
          name:"百度",
          value:42353
        },
        {
          name:"莆田广告",
          value:3353
        },
        {
          name:"谷歌",
          value:123
        },
        {
          name:"GitHub",
          value:4353
        }
      ]
    }
  },
  components:{
    CountByDay,
    SingleItem,
    WordCloud,
    SingleAreaChart
  }
}
</script>

<style lang="scss">
html, body {
  width: 600px;
  height: 600px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
