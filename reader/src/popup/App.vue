<template>
  <div id="app">
    <count-by-day 
      :typeList="typeList"
      :timeList="timeList"
      :typeTimeData="typeTimeData"
      allTimeLable="今日浏览器使用情况分析"
      :width="600"
      :height="200"
      :update="update"></count-by-day>
    <div class="split-line"></div>
    <div>
      <div class="list-title">今日访问网站详情</div>
      <single-item v-for="(item,idx) in itemList" :key="'item_'+idx"
      :name="item.name"
      :imageData="item.imageData"
      :useMin="item.useMin"
      :maxMin="maxMin"
      :times="item.times"
      :width="600"
      @click.native="showUrlHistory(item)"></single-item>
    </div>

    <div v-if="showUrlHistoryTag" style="margin-top:15px;">
      <single-area-chart
        :title="showUrlName + ' 访问次数分布'"
        :x_data="timeList"
        :y_data="showUrlTimeData"
        :width="600"
        :height="300"
        :update="singleUpdate"></single-area-chart>
      
      <!-- <word-cloud
          :wordCloudData="wordCloudData"></word-cloud> -->
    </div>
  </div>
</template>

<script>
import CountByDay from "../components/CountByDay.vue";
import SingleItem from "../components/SingleItem.vue";
import WordCloud from "../components/WordCloud.vue";
import SingleAreaChart from "../components/SingleAreaChart.vue";
import catory from '../common/category';
import jieba from '../common/jieba';
export default {
  name: 'app',
  data () {
    return {
      msg: 'This is popup page !',
      // timeList:['12日','13日','14日','15日','16日','17日','18日','19日'],
      // typeList:['搜索引擎','社交网站','新闻娱乐','技术论坛','其他'],
      // typeTimeData:[
      //   [14,1,5,13,32,12,33,22],
      //   [12,43,23,43,2,33,18,20],
      //   [12,3,2,4,8,6,7,2],
      //   [21,22,19,15,23,11,16,25],
      //   [10,9,4,6,7,4,3,7]
      // ],
      timeList:[],
      typeList:[],
      typeTimeData:[],
      itemList:[
        // {
        //   imageData:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAeCAYAAAAcni9KAAAAaElEQVQ4jcXTMQ4AEBAEQH/yJ69Vq31CTSWRC26dDcVVu1NtzvkQq+VcyuUDPMUpFwJEce9yoIbHHg+usOxwocSznA87XmV2aH4rbbM3ENmVB5FdeXC3qcT3UEMS30EUjdgOTxH0Vrtri9j3uTwNEWIAAAAASUVORK5CYII=",
        //   name:"谷歌",
        //   useMin:132
        // },
        // {
        //   imageData:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAeCAYAAAAcni9KAAAAaElEQVQ4jcXTMQ4AEBAEQH/yJ69Vq31CTSWRC26dDcVVu1NtzvkQq+VcyuUDPMUpFwJEce9yoIbHHg+usOxwocSznA87XmV2aH4rbbM3ENmVB5FdeXC3qcT3UEMS30EUjdgOTxH0Vrtri9j3uTwNEWIAAAAASUVORK5CYII=",
        //   name:"百度",
        //   useMin:86
        // },
        // {
        //   imageData:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAeCAYAAAAcni9KAAAAaElEQVQ4jcXTMQ4AEBAEQH/yJ69Vq31CTSWRC26dDcVVu1NtzvkQq+VcyuUDPMUpFwJEce9yoIbHHg+usOxwocSznA87XmV2aH4rbbM3ENmVB5FdeXC3qcT3UEMS30EUjdgOTxH0Vrtri9j3uTwNEWIAAAAASUVORK5CYII=",
        //   name:"招商银行",
        //   useMin:50
        // },
        // {
        //   imageData:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAeCAYAAAAcni9KAAAAaElEQVQ4jcXTMQ4AEBAEQH/yJ69Vq31CTSWRC26dDcVVu1NtzvkQq+VcyuUDPMUpFwJEce9yoIbHHg+usOxwocSznA87XmV2aH4rbbM3ENmVB5FdeXC3qcT3UEMS30EUjdgOTxH0Vrtri9j3uTwNEWIAAAAASUVORK5CYII=",
        //   name:"陌陌",
        //   useMin:20
        // }
      ],
      maxMin:132,

      showUrlHistoryTag:false, //是否显示域名历史记录
      showUrlName:"",
      showUrlTimeData:[], //显示URL的历史记录
      singleUpdate:0,
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
      ],
      update:0
    }
  },
  components:{
    CountByDay,
    SingleItem,
    WordCloud,
    SingleAreaChart
  },
  methods:{
    showUrlHistory(item){
      this.showUrlHistoryTag = true;
      this.showUrlName = item.name;
      this.showUrlTimeData = item.hostConsume;
      this.singleUpdate++;
    },
    getTodayData(){
      console.log("getTodayData");
      const self = this
      chrome.runtime.sendMessage({
        method:"getTodayData"
      }, function(response){
        if(!response){
          return;
        }
        //处理长度不一致的辅助对象
        let nowDate = new Date();
        let house = nowDate.getHours();

        let typeList = [];
        let typeTimeData = [];
        let itemList = [];
        let maxMin = 0;
        let timeList=[];
        for(let h in response){
          let theHostObj = response[h];

          let useMin = 0;
          let hostConsume = theHostObj.consumes.map(function(v){
            let num = Math.max(parseInt((v||0)/60),0);
            useMin += num;
            return num;
          });

          for(let tempLen = hostConsume.length;tempLen<house+1;tempLen++){
            hostConsume.unshift(0);
          }
        
          if(timeList.length==0){
            for(let i=0;i<=house;i++){
              timeList.push(i+"点")
            }
          }

          let type = self.getHostType(h);
          let idx = typeList.indexOf(type);
          if(idx<0){
            typeList.push(type);
            typeTimeData.push(hostConsume);
          }else{
            for(let addIdx=0;addIdx<hostConsume.length;addIdx++){
              typeTimeData[idx][addIdx] = typeTimeData[idx][addIdx] + hostConsume[addIdx]; 
            }
          }

          itemList.push({
            name:h,
            useMin:useMin,
            imageData:theHostObj.icon,
            times:theHostObj.times.reduce((a, b) => (a||0) + (b||0), 0),
            hostConsume:hostConsume
          });

          maxMin = Math.max(useMin,maxMin);
        }

        itemList.sort(function(a,b){return b.useMin-a.useMin});

        self.maxMin = maxMin;
        self.itemList = itemList;
        self.typeList = typeList;
        self.typeTimeData = typeTimeData;
        self.timeList = timeList;
        self.update++;
      });
    },
    getHostType(host){
      return catory.getCatoryByHostName(host);
    }
  },
  mounted(){
    this.$nextTick(function(){
      this.getTodayData();
    })
  }
}
</script>

<style lang="scss">
html, body {
  width: 600px;
  min-height: 600px;
  max-height: 800px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15px;
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

.split-line{
  display: block;
  height: 2px;
  background-color: #eee;
  border-radius: 2px;
  margin: 10px 5px;
}

.list-title{
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin: 0 5px;
}
</style>
