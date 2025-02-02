declare global {
    interface Window {
        webkit: {
            messageHandlers: {
                dataHandler: {
                    postMessage(parameter: string): string;
                };
            };
        };
        Android: {
            // AOS 인터페이스
            dataHandler(parameter: string): string;
        };
    }
}

interface BridgeParameter<T = any> {
    type: string;
    data?: T;
}

export const landingYoutube = (videoId: string, index: string, page?: string) => {
    index = page ? `${page}_${index}` : index;
    const key = page ? 'AI검색_지난대화' : 'AI검색_최근대화';

    sendEvent('SEND_LOG', {
        type: 'GA4',
        key: key,
        message: index,
    });
    const url = `https://www.youtube.com/shorts/${videoId}`;
    sendEvent('LANDING_YOUTUBE', { url: url });
};

const sendEventToIOS = (key: string, param?: any) => {
    const parameter: BridgeParameter = {
        type: key,
        ...(param && { data: param }),
    };

    // if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.dataHandler) {
    //     const stringifiedObject = JSON.stringify(parameter);
    //     window.webkit.messageHandlers.dataHandler.postMessage(stringifiedObject);
    // } else {
    // }
};

const sendEventToAOS = (key: string, param?: any) => {
    const parameter: BridgeParameter = {
        type: key,
        ...(param && { data: param }),
    };
    // if (window.Android) {
    //     const stringifiedObject = JSON.stringify(parameter);
    //     window.Android.dataHandler(stringifiedObject);
    // } else {
    // }
};

function initSendEventFn() {
  return sendEventToIOS;
    // if ((window as any)?.webkit) {
        
    // } else if ((window as any)?.Android) {
    //     return sendEventToAOS;
    // } else {
    //     return () => {};
    // }
}

const sendEventFn = initSendEventFn();

export const sendEvent = async (key: string, param?: any) => sendEventFn(key, param);
