// import {setHostnameData, getTodayHostnameList} from './storage'
import {setConsume, setLoad} from './data'
import {getTodayData, getHostTodayData} from './interface'
import {getHostname} from './utils'

console.log('This is BACKGROUND page!')
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { 
    if(tab.url && changeInfo.status === 'complete') {
        setLoad(getHostname(tab.url), tab.title, tab.favIconUrl)
    }
})

chrome.tabs.onActivated.addListener(function (info){
    chrome.tabs.get(info.tabId, function(tab) {
        console.log(tab)
        if(tab && tab.url && tab.status === 'complete') {
            setLoad(getHostname(tab.url))
        }
    })
})

setInterval(function(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log(tabs[0])
        if(tabs[0]) {
            setConsume(getHostname(tabs[0].url))
        }
    });
 }, 5000);


     

    //  chrome.tabs.onHighlighted.addListener(function (info){
    //  })

    //  chrome.tabs.onRemoved.addListener(function (tabId, removeInfo){
    //      console.log(removeInfo)
    //      chrome.tabs.get(tabId, function(tab) {
    //          console.log(tab)
    //          //setHostnameData(getHostname(tab.url), tab.title, true)
    //      })
    //  })

chrome.runtime.onMessage.addListener(callback);
function callback(obj, sender, sendResponse) {
    console.log(obj)
    if (obj.method == 'getHostTodayData') {
            getHostTodayData(obj.params.hostname,sendResponse);
    } else if(obj.method == 'getTodayData') {
        getTodayData(sendResponse)
    }
    return true; // remove this line to make the call sync!
}

//some async method
function getContent(sendResponse) {
    let date = new Date()
    let day = date.toLocaleDateString()
    chrome.storage.local.get(null, function(result) {
        // const data = []
        // for(let key in result) {
        //     if(result[key] && result[key].consumes) {
        //         data.push(key + ":" + result[key].consumes[day])
        //     }
        // }
        console.log(result)
        sendResponse(result)
    })
}

    //  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    //     if(message == 'Hello'){
    //         let date = new Date()
    //         let day = date.toLocaleDateString()
    //         chrome.storage.local.get(null, function(result) {
    //             const data = []
    //             for(let key in result) {
    //                 if(result[key] && result[key].consumes) {
    //                     data.push(key + ":" + result[key].consumes[day])
    //                 }
    //             }
    //             console.log(JSON.stringify(data))
    //             sendResponse(JSON.stringify(data))
    //         })
    //         return true
    //         // getTodayHostnameList(sendResponse)
    //         // sendResponse('hello')
            
    //     }
    // });