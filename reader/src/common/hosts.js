import axios from 'axios'
import xml2js from 'xml2js'
/**
 * 异常数据：<ALEXA VER="0.9" URL="404" HOME="0" AID="=" IDN=""> </ALEXA> 
 * 正常数据 
 <ALEXA VER="0.9" URL="qq.com/" HOME="0" AID="=" IDN="qq.com/">
<RLS PREFIX="http://" more="0">
<RL HREF="zwgl.com.cn/" TITLE="中外管理"/>
<RL HREF="zhuxian.com/" TITLE="Chinese ZHUXIAN union"/>
<RL HREF="zeytech.net/" TITLE="Webmaster Araçları"/>
<RL HREF="youxia.com/" TITLE="Youxia.com"/>
<RL HREF="youka-nitta.com/" TITLE="Youka-nitta.com"/>
<RL HREF="yiyao.cc/" TITLE="Yiyao.cc"/>
<RL HREF="yinsha.com/" TITLE="±Ìº£ÒøÉ³"/>
<RL HREF="yddg.com/" TITLE="蜴溽せ謨ｰ遐??"/>
<RL HREF="yateshi.com/" TITLE="ʿ Yateshi.com йȵķƽ̨"/>
<RL HREF="xjpet.com/" TITLE="xjpet"/>
</RLS>
<SD TITLE="A" FLAGS="" HOST="qq.com">
<TITLE TEXT="QQ.COM"/>
<OWNER NAME="TENCENT Inc."/>
</SD>
<SD>
<POPULARITY URL="qq.com/" TEXT="5" SOURCE="panel"/>
<REACH RANK="6"/>
<RANK DELTA="-1"/>
<COUNTRY CODE="CN" NAME="China" RANK="3"/>
</SD>
</ALEXA>
 */
export default {

    getstarts: function (nums) {
        let num = parseInt(nums)
        if (num < 100) {
            return 5
        }
        if (num < 1000) {
            return 4
        }
        if (num < 10000) {
            return 3
        }
        if (num > 10000) {
            return 2
        }
    },
    /**
     * 根据域名查询备案信息
     * @param {hostname} hostname 
     * @return 不存在备案 返回 undefined
     * 存在备案 {
     *      name:'百度',
     *      popular:2
     *      popular:2000,
     *      rank:3,
     *      rankNum:2000,
     *      country:''
     *      
     * 
     * }
     */
    getHostInformation: async function (hostname) {
        var url = "http://data.alexa.com/data?cli=10&dat=snbamz&url=" + "www.baidu.com"
        return await axios.get(url).then(async function (response) {
                if (response.status != 200) {
                    return undefined
                }
                let json = xml2js.parseStringPromise(response.data, { explicitArray: false })
                return await json.then(m => {
                    let root = m.ALEXA['$']
                    if (root.URL === "404") {
                        return undefined
                    }
                    /**
                     { '$': { TITLE: 'A', FLAGS: '', HOST: 'qq.com' },
                        TITLE: { '$': { TEXT: 'QQ.COM' } },
                        OWNER: { '$': { NAME: 'TENCENT Inc.' } } }
    
                     */
                    /**
                     { POPULARITY: { '$': { URL: 'qq.com/', TEXT: '5', SOURCE: 'panel' } },
                        REACH: { '$': { RANK: '6' } },
                        RANK: { '$': { DELTA: '-1' } },
                        COUNTRY: { '$': { CODE: 'CN', NAME: 'China', RANK: '3' } } }
                     */
                    let sd = m.ALEXA['SD']
                    let res = {}
                    res.name = sd[0].TITLE.$.TEXT
                    res.popular = this.getstarts(sd[1].POPULARITY.$.RANK)
                    res.popularNum = parseInt(sd[1].POPULARITY.$.RANK)
                    res.rank = this.getstarts(sd[1].REACH.$.RANK)
                    res.rankNum = parseInt(sd[1].REACH.$.RANK)
                    res.country = sd[1].COUNTRY.$.NAME
                    return res
                }).catch(error => {
                    return undefined
                })
            }).catch(function (error) {
                return undefined
            })
    }
}