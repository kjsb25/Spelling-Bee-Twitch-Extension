import { ChromeMessage, SBWindow, Sender } from "../types";

type MessageResponse = (response?: any) => void

const messagesFromReactAppListener = (message: ChromeMessage, sender: chrome.runtime.MessageSender, response: MessageResponse) => {
    console.log('[content.js]. Message received', {
        message,
        sender,
    })

    if (
        sender.id === chrome.runtime.id &&
        message.from === Sender.React &&
        message.message === 'Hello from React') {
            let scriptTags= Array.from(document.querySelectorAll('script'))
            console.log(`Unfiltered: ${scriptTags.length}`)
            const regex = new RegExp('.*window.gameData.*', 'g');
            scriptTags.filter((item) => {
                regex.test(item.outerHTML)
            })
            console.log(`Filtered: ${scriptTags.length}`)
            if(scriptTags.length === 1){
                response(scriptTags[0].innerHTML)
            }else{
                response("Failed")
            }

    }

}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);