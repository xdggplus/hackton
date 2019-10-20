export const getTodayData = function(callback) {
    chrome.storage.local.get(null, function(result) {
        const data = {}
        let date = new Date()
        let hours = date.getHours()
        let dateStr = date.toJSON()
        let yearMonthDay = dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10)
        for(let item in result) {
            data[item] = {
                consumes: parseFixedArr((result[item].consumes || {})[yearMonthDay] || [], hours + 1),
                times: parseFixedArr((result[item].times || {})[yearMonthDay] || [], hours + 1),
                titles: result[item].titles,
                icon: result[item].icon
            }
        }
        console.log(data)
        callback(data)
    })
}

export const getDaysData = function(days, callback) {
    chrome.storage.local.get(null, function(result){
        const data = {}

        let currentTime = +new Date()
        const dates = []
        
        for(let i = days; i > 0; i--) {
            let dateStr = new Date(currentTime - 86400000 * i).toJSON()
            dates.push(dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10))
        }

        for(let item in result) {
            let c = dates.map(date => {
                let consumes = (result[item].consumes || {})[date] || []
                return consumes.reduce((a, b) => (a||0) + (b||0), 0)
            })

            let t = dates.map(date => {
                let times = (result[item].times || {})[date] || []
                return times.reduce((a, b) => (a||0) + (b||0), 0)
            })
            data[item] = {
                consumes: c,
                times: t,
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
        let hours = date.getHours()
        let dateStr = date.toJSON()
        let yearMonthDay = dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10)
        const data = {
            consumes: parseFixedArr((value.consumes || {})[yearMonthDay] || [], hours+1),
            times: parseFixedArr((value.times || {})[yearMonthDay] || [],hours+1),
            titles: value.titles,
            icon: value.icon
        }
        console.log(data)
        callback(data)
    })
}

export const getHostDaysData = function(hostname, days, callback) {
    chrome.storage.local.get(hostname, function(result){
        const value = result[hostname]

        let currentTime = +new Date()
        const dates = []
        
        for(let i = days; i > 0; i--) {
            let dateStr = new Date(currentTime - 86400000 * i).toJSON()
            dates.push(dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10))
        }

        let c = dates.map(date => {
            let consumes = (value.consumes || {})[date] || []
            return consumes.reduce((a, b) => (a||0) + (b||0), 0)
        })

        let t = dates.map(date => {
            let times = (value.times || {})[date] || []
            return times.reduce((a, b) => (a||0) + (b||0), 0)
        })

        const data = {
            consumes: c,
            times: t,
            titles: value.titles,
            icon: value.icon
        }
        console.log(data)
        callback(data)
    })
}

const parseFixedArr = function(arr, size) {
    for(var i = 0; i < size; i++) {
      arr[i] = arr[i] || 0
    }
    return arr
}