import _ from 'lodash'
import sites from './top'
export default {
    /**
     * 根据名称获取分类
     * @param {host名称} host 
     */
    getCatoryByHostName: function (host) {
        let key = _.findKey(sites, value => {
            let hosts = value.sites
            let rules = value.rules
            let index = -2
            if (hosts.length > 0) {
                index = _.findIndex(hosts, endhost => {
                    return _.endsWith(host, endhost)
                })
            }
            if (index > -1) {
                return true
            }
            if (rules.length > 0) {
                index = _.findIndex(rules, rule => {
                    return new RegExp(rule).test(host)
                })
            }
            if (index > -1) {
                return true
            }
            return false
        })
        if(key===undefined){
            return "未知"
        }else{
            return key 
        }
    }
}