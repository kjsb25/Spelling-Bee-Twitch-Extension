import { ChromeMessage, Sender } from "../types";

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
        response('Hello from content.js');
    }

}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);