import axios from 'axios'
import xml2js from 'xml2js'

export const getHostInformation = function(hostname, callback) {
    var url = "http://data.alexa.com/data?cli=10&dat=snbamz&url=" + "www.baidu.com"

        axios.get(url).then(function (response) {
                if (response.status != 200) {
                    return undefined
                }
                let json = xml2js.parseStringPromise(response.data, { explicitArray: false })
                return json.then(m => {
                    let root = m.ALEXA['$']
                    if (root.URL === "404") {
                        return undefined
                    }
                    let sd = m.ALEXA['SD']
                    let res = {}
                    res.name = sd[0].TITLE.$.TEXT
                    res.popular = getstarts(sd[1].POPULARITY.$.TEXT)
                    res.popularNum = parseInt(sd[1].POPULARITY.$.TEXT)
                    res.rank = getstarts(sd[1].REACH.$.RANK)
                    res.rankNum = parseInt(sd[1].REACH.$.RANK)
                    res.country = sd[1].COUNTRY.$.NAME
                    return callback(res)
                }).catch(error => {
                    return undefined
                })
            }).catch(function (error) {
                return undefined
            })
}

const getstarts = function(nums) {
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
}
