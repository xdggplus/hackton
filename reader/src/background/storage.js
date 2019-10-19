
export const setHostnameData = function(hostname, title, isClose) {
    chrome.storage.local.get('current', function(result) {
        const cur = result.current || {}
        const curHostname = cur.hostname
        if(curHostname) {
            chrome.storage.local.get(curHostname, function(result) {
                const oldValue = result[curHostname] || {}
                const titles = oldValue.titles || []
                if(!titles.includes(title)) {
                    titles.push(title)
                }
                // parse new value
                // let date = new Date()
                // let day = date.toLocaleDateString()
                // let currentTime = date.getTime()

                // let consumes = oldValue.consumes || {}

                // consumes[day] = (consumes[day] || 0) + (currentTime - (cur.time || currentTime))
                // const newValue = {
                //     consumes: consumes,
                //     titles: titles,
                //     createTime: oldValue.createTime || currentTime,
                //     updateTime: currentTime
                // }
                const newValue = parseData(titles, cur.time, oldValue)
                let item = {}
                item[curHostname] = newValue
                console.log(newValue)
                chrome.storage.local.set(item, function() {
                    setHosthomeTime(hostname, isClose)
                })
            })
        } else {
            setHosthomeTime(hostname, isClose)
        }
    })
}

const setHosthomeTime = function(hostname, isClose) {
    if(isClose) {
        // remove current 
        chrome.storage.local.remove('current', function(){})
    } else {
        // set current
        chrome.storage.local.set({current: {
            hostname: hostname, 
            time: Date.now()
        }}, function() {
        })
    }
}

const parseData = function(titles, oldTime, oldValue) {
    let date = new Date()
    let dateStr = date.toJSON()
    let yearMonthDay = dateStr.substring(0,4) + dateStr.substring(5,7) + dateStr.substring(8,10)
    let hour = date.getHours()
    let currentTime = date.getTime()

    let consumes = oldValue.consumes || {}
    consumes[yearMonthDay] = consumes[yearMonthDay] || []
    let c = (consumes[yearMonthDay][hour]||{}).c || 0
    let t = (consumes[yearMonthDay][hour]||{}).t || 0
    consumes[yearMonthDay][hour] = {
        c: c + (currentTime - (oldTime || currentTime)),
        t: t+1
    }
    return {
        consumes: consumes,
        titles: titles,
        createTime: oldValue.createTime || currentTime,
        updateTime: currentTime
    }
}

export const getTodayHostnameList = function(sendResponse) {
    let date = new Date()
    let day = date.toLocaleDateString()
    chrome.storage.local.get(null, function(result) {
        const data = []
        for(let key in result) {
            if(result[key] && result[key].consumes) {
                data.push(key + ":" + result[key].consumes[day])
            }
        }
        console.log(JSON.stringify(data))
        
    })
}


// const listTabs() {

// }

// chrome.storage.local.set({key: value}, function() {
//     console.log('Value is set to ' + value);
// });

// chrome.storage.local.get(['key'], function(result) {
//     console.log('Value currently is ' + result.key);
// });