import { Segment, modules, dicts, synonyms, stopwords } from 'segmentit';
import _ from 'lodash'
const segmentit = new Segment();
segmentit.use(modules);
segmentit.loadDict(dicts);
segmentit.loadSynonymDict(synonyms);
segmentit.loadStopwordDict(stopwords);
export default {
    /**
     * 提取分词 返回逆序结果
     * @param {host所有词 输入时array} list 
     * return [
     *   {
     *   "key":count 
     * }
     * ]
     */
    getKeyWords: function (list) {
        let sentence = list.join(',');
        let res = segmentit.doSegment(sentence);
        let x = _.map(res, res => res.w)
        x = _.countBy(x, value => value)
        x = _.toPairs(x)
        x = _.sortBy(x, x => x[1])
        x = _.reverse(x)
        x  = _.map(x,x=>{
            let m = {}
            m[x[0]]=x[1]
            return m
        })
        return x
    }
}