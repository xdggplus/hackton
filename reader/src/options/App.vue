<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <Form :label-width="80" class="form-settings">
      <FormItem label="智能推荐">
        <i-switch v-model="recommend" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem label="自动收藏">
        <i-switch v-model="collect" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem label="使用频次分析">
        <i-switch v-model="showWordCloud" size="large">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </FormItem>
      <FormItem v-if="showWordCloud">
        <word-cloud :wordCloudData="wordCloudData"></word-cloud>
      </FormItem>
      
    </Form>
  </div>
</template>

<script>
import catory from '../common/category'
import jieba from "../common/jieba.js"
import WordCloud from "../components/WordCloud"
export default {
  name: 'app',
  data () {
    // jieba.getKeyWords(""); //这里方法有问题,执行不下去
    return {
      msg: 'This is options page !aaaaaaa',
      recommend:false,
      collect:false,
      showWordCloud:false,
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
    WordCloud
  },
  methods:{
    showReport(){

    }
  }
}
</script>

<style lang="scss">
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

.form-settings{
  width:600px;
  text-align:left;
  margin: 5px auto;
  background-color:#e8e8e8;
  border-radius: 5px;
}

#app .ivu-form-item{
  margin-bottom: 5px;
}
</style>
