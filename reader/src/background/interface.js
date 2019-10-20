export const getTodayData = function(callback) {
    chrome.storage.local.get(null, function(result) {
        const data = {}
        let date = new Date()
        let dateStr = date.toJSON()
        let yearMonthDay = dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10)
        for(let item in result) {
            data[item] = {
                consumes: (result[item].consumes || {})[yearMonthDay] || [],
                times: (result[item].times || {})[yearMonthDay] || [],
                titles: result[item].titles,
                icon: result[item].icon
            }
        }
        console.log(data)
        callback(data)
    })
}

export const getHostTodayData = function(hostname, callback) {
    chrome.storage.local.get(hostname, function(result) {
        const value = result[hostname]
        let date = new Date()
        let dateStr = date.toJSON()
        let yearMonthDay = dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10)
        const data = {
            consumes: (value.consumes || {})[yearMonthDay] || [],
            times: (value.times || {})[yearMonthDay] || [],
            titles: value.titles
        }
        console.log(data)
        callback(data)
    })
}