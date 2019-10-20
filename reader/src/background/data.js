export const setConsume = function(hostname) {
    chrome.storage.local.get(hostname, function(result) {
        const oldValue = result[hostname] || {}

        let date = new Date()
        let dateStr = date.toJSON()
        let yearMonthDay = dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10)
        let hour = date.getHours()
        let currentTime = date.getTime()

        let consumes = oldValue.consumes || {}
        consumes[yearMonthDay] = consumes[yearMonthDay] || []
        consumes[yearMonthDay][hour] = (consumes[yearMonthDay][hour] || 0) + 5
        
        const newValue = {
            consumes: consumes,
            times: oldValue.times,
            titles: oldValue.titles,
            icon: oldValue.icon,
            createTime: oldValue.createTime || currentTime,
            updateTime: currentTime
        }
        let item = {}
        item[hostname] = newValue
        chrome.storage.local.set(item, function() {
            console.log("set consume")
        })
    })
}

export const setLoad = function(hostname, title, icon) {
    chrome.storage.local.get(hostname, function(result) {
        const oldValue = result[hostname] || {}
        const titles = oldValue.titles || []
        if(title && !titles.includes(title)) {
            titles.push(title)
        }

        let date = new Date()
        let dateStr = date.toJSON()
        let yearMonthDay = dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10)
        let hour = date.getHours()
        let currentTime = date.getTime()

        let times = oldValue.times || {}
        times[yearMonthDay] = times[yearMonthDay] || []
        times[yearMonthDay][hour] = (times[yearMonthDay][hour] || 0) + 1
        
        const newValue = {
            consumes: oldValue.consumes,
            times: times,
            titles: titles,
            icon: oldValue.icon || icon,
            createTime: oldValue.createTime || currentTime,
            updateTime: currentTime
        }
        let item = {}
        item[hostname] = newValue
        chrome.storage.local.set(item, function() {
            console.log("set load")
        })
    })
}