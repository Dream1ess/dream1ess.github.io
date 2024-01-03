function TargetAds(projectId, debug = false, other_trackers= false, host='https://eye.targetads.io') {
    if (!projectId) throw {
        name: 'TargetAdsInitializationError',
        message: 'projectId is invalid'
    };
    this.host = host;
    this.projectId = projectId;
    this.storPrefix = `_tads${projectId}_cid`;
    this.__debug = debug;
    this.__otrack = other_trackers;
    this.getCid = () => {
        if (window.localStorage.getItem(this.storPrefix))
            return window.localStorage.getItem(this.storPrefix);
        let cid = `TA-${Date.now()}-${(Math.random() + 1).toString(36).substring(4).toUpperCase()}`;
        window.localStorage.setItem(this.storPrefix, cid);
        return cid;
    };

    window._targetADS = this.event.bind(this);
}


TargetAds.prototype.log = function (message, error=false) {
    if (this.__debug)
        console.info(message);
};


TargetAds.prototype.req = async function (query, data) {
    this.log(`Sending data: ${data}`);
    const queueItem = TargetAdsQueues.peek();
    TargetAdsQueues.dequeue(queueItem);
    fetch(`${this.host}/web/collect?${query}`, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'text/plain'
        },
        referrerPolicy: 'no-referrer-when-downgrade',
        body: data
    }).then(response => {
        if(TargetAdsQueues.length === 0) localStorage.removeItem(`_tads${this.projectId}_queue`);
        else localStorage.setItem(`_tads${this.projectId}_queue`, JSON.stringify(TargetAdsQueues));
        console.log(response);
        if (response.status === 0 || response.status === 204) {
            // const cid = await response.text();
            // if(cid && !isNaN(Number(cid))) {
            //     window.localStorage.setItem(this.storPrefix, cid);
            // }
            this.log("Data was send");
        }
        else {
            TargetAdsQueues.enqueue(queueItem);
            this.log(`Data wasn't send. Status code is ${response.status}. Response text ${response.body}`, true);
        }
        return response.text();
    }).then((cid)=> {
        if(cid && !isNaN(Number(cid))) {
            window.localStorage.setItem(this.storPrefix, cid);
        }
    }).catch(error => {
        TargetAdsQueues.enqueue(queueItem);
        this.log(error, true)
    });
};


TargetAds.prototype.getOtherCounters = function () {
    if (!this.__otrack) return {};

    const matchYa = document.cookie.match('(?:^|;)\\s*_ym_uid=([^;]*)');
    const ycid = (matchYa) ? decodeURIComponent(matchYa[1]) : '';

    const matchGa = document.cookie.match('(?:^|;)\\s*_ga=([^;]*)');
    const gcid = (matchGa) ? decodeURIComponent(matchGa[1]) : '';

    return {ycid, gcid};
};


TargetAds.prototype.defaultParams = function () {
    return {
        ref: this.convertToString(document.location.href),
        dr: this.convertToString(document.referrer),
        ul: this.convertToString(window.navigator.language.toLowerCase()),
        ww: this.convertToString(window.screen.availWidth),
        wh: this.convertToString(window.screen.availHeight),
        dt: this.convertToString(document.title),
        pid: this.convertToString(this.projectId),
        cid: this.getCid()
    };
};



TargetAds.prototype.convertToString = function (value) {
    if((value || value === 0) && typeof value !== 'object') {
        try {
            return String(value)
        } catch (e) {
            return 'undefined';
        }
    }
    return 'undefined';
}

TargetAds.prototype.convertToNumber = function (value) {
    try {
        const temp = Number(value);
        return !isNaN(temp) ? temp : 0;
    } catch (e) {
        return 0;
    }
}

TargetAds.prototype.convertToObjectString = function (object, limit=0) {
    if(object && typeof object === 'object') {
        try {
            const temp = {}
            if(limit)
                Object.keys(object).slice(0,limit).map(key => temp[key] = this.convertToString(object[key]));
            else
                Object.keys(object).map(key => temp[key] = this.convertToString(object[key]));
            return temp;
        } catch (e) {
            return {};
        }
    }
    return {};
}


TargetAds.prototype.getValueOrDefault = function (data, key, defaultValue, type) {
    if(typeof data[key] === type) {
        return data[key];
    }
    if(data[key]) {
        if(type === 'string' && typeof data[key] !== 'object') {
            return this.convertToString(data[key]);
        }
        if(type === 'number') {
            return this.convertToNumber(data[key]);
        }
    }
    return defaultValue;
};


TargetAds.prototype.prepaidEcomData = function (type, data) {

    let resData = {};
    if (type === 'purchase') {
        if (!data.hasOwnProperty('id') || (typeof data.items !== 'object' || data.items.length < 1)) {
            this.log('Purchase id and items is required', true);
            return -1;
        }

        resData.ecommerce = {
            'type': type,
            'id': this.getValueOrDefault(data, 'id', 'undefined', 'string'),
            'quantity': this.getValueOrDefault(data, 'quantity', 0, 'number'),
            'amount': this.getValueOrDefault(data, 'amount', 0,'number')
        };
        resData.ecommerce_items =  {
            'id': [],
            'title': [],
            'category1': [],
            'category2': [],
            'brand': [],
            'variant': [],
            'quantity': [],
            'price': []
        };
        for (const item of data.items){
            if (!item.hasOwnProperty('id') && !item.hasOwnProperty('title')) {
                 this.log('Product adding error. Name or id is required', true);
                 continue;
            }
            if (this.convertToString(item.id) === 'undefined' && this.convertToString(item.title) === 'undefined') {
                 this.log('Product adding error. Name or id incorrect', true);
                 continue;
            }
            resData.ecommerce_items.id.push(this.getValueOrDefault(item, 'id', 'undefined', 'string'));
            resData.ecommerce_items.title.push(this.getValueOrDefault(item, 'title', 'undefined', 'string'));
            resData.ecommerce_items.category1.push(this.getValueOrDefault(item, 'category1', 'undefined', 'string'));
            resData.ecommerce_items.category2.push(this.getValueOrDefault(item, 'category2', 'undefined', 'string'));
            resData.ecommerce_items.brand.push(this.getValueOrDefault(item, 'brand', 'undefined', 'string'));
            resData.ecommerce_items.variant.push(this.getValueOrDefault(item, 'variant', 'undefined', 'string'));
            resData.ecommerce_items.quantity.push(this.getValueOrDefault(item, 'quantity', 0, 'number'));
            resData.ecommerce_items.price.push(this.getValueOrDefault(item, 'price', 0, 'number'));
        }

        if (resData.ecommerce_items.id.length === 0 || resData.ecommerce_items.title.length === 0) {
            this.log('Items must not be empty');
            return -1;
        }
    } else {
        if (!data.hasOwnProperty('id') && !data.hasOwnProperty('title')) {
            this.log('Item name or id is required');
            return -1;
        }
        if (this.convertToString(data.id) === 'undefined' && this.convertToString(data.title) === 'undefined') {
             this.log('Item name or id incorrect', true);
             return -1;
        }

        resData.ecommerce_items =  {
            'id': [this.getValueOrDefault(data, 'id', 'undefined', 'string')],
            'title': [this.getValueOrDefault(data, 'title', 'undefined', 'string')],
            'category1': [this.getValueOrDefault(data, 'category1', 'undefined', 'string')],
            'category2': [this.getValueOrDefault(data, 'category2', 'undefined', 'string')],
            'brand': [this.getValueOrDefault(data, 'brand', 'undefined', 'string')],
            'variant': [this.getValueOrDefault(data, 'variant', 'undefined', 'string')],
            'quantity': [1],
            'price': [this.getValueOrDefault(data, 'price', 0, 'number')]
        };
    }

    return resData;
};


TargetAds.prototype.event = function (name, data = {}) {
    if(name.constructor !== String) {
        const queueItem = TargetAdsQueues.peek();
        TargetAdsQueues.dequeue(queueItem);
        return this.log(`Name of invalid type - ${typeof name}. Should be String`, true);
    }

    if(this.__debug) {
        this.log(`Data for send: ${name}; ${JSON.stringify(data)}`);
        const init = JSON.parse(localStorage.getItem('_tads_init'));
        this.log(`State: ${init}`)
    }

    let data_to_send = {};
    if (name === 'page_view') {
        if(typeof data === 'object' && Object.entries(data).length > 0 && !Array.isArray(data)) {
            let clone = {};
            for (let key in data) clone[key] = data[key];
            if(clone.user && typeof clone.user === 'object' && !Array.isArray(clone.user)) {
                if(clone.user.uid) {
                    data_to_send.uid = this.convertToString(clone.user.uid);
                    delete clone.user.uid;
                } else this.log('TargetAds: uid argument not found', true);
                data_to_send.up = this.convertToObjectString(clone.user, 4);
                delete clone.user;
            }
            if(clone.event_params && typeof clone.event_params === 'object' && !Array.isArray(clone.event_params)) {
                data_to_send.event_params = this.convertToObjectString(clone.event_params, 5)
                delete clone.event_params;
            }
        }
        data_to_send.event_name = 'page_view';
    } else if (name === 'event' && data && Object.entries(data).length > 0 && !Array.isArray(data)) {
        let cloneEvent = {};
        for (let key in data) cloneEvent[key] = data[key];
        if(cloneEvent.event_type && cloneEvent.event_category && cloneEvent.event_name &&
            this.convertToString(cloneEvent.event_type) !== 'undefined' &&
            this.convertToString(cloneEvent.event_category) !== 'undefined' &&
            this.convertToString(cloneEvent.event_name) !== 'undefined'
        ) {
            data_to_send.event_type = this.convertToString(cloneEvent.event_type)
            data_to_send.event_category = this.convertToString(cloneEvent.event_category)
            data_to_send.event_name = this.convertToString(cloneEvent.event_name)

            data_to_send.event_value = this.convertToNumber(cloneEvent.event_value)

            if(cloneEvent.event_params && typeof cloneEvent.event_params === 'object' && !Array.isArray(cloneEvent.event_params))
                data_to_send.event_params = this.convertToObjectString(cloneEvent.event_params, 5);
        } else {
            const queueItem = TargetAdsQueues.peek();
            TargetAdsQueues.dequeue(queueItem);
            return this.log('TargetAds: Check the event data', true);
        }
    } else if (name === 'add_to_cart' && Object.entries(data).length > 0 && !Array.isArray(data)) {
        data_to_send = this.prepaidEcomData(name, data);
        if(data_to_send === -1) {
            const queueItem = TargetAdsQueues.peek();
            TargetAdsQueues.dequeue(queueItem);
            return this.log('TargetAds: Check add_to_cart data', true);
        }
        data_to_send.event_name = 'add_to_cart';
    } else if (name === 'purchase' && Object.entries(data).length > 0 && !Array.isArray(data)) {
        data_to_send = this.prepaidEcomData(name, data);
        if(data_to_send === -1) {
            const queueItem = TargetAdsQueues.peek();
            TargetAdsQueues.dequeue(queueItem);
            return this.log('TargetAds: Check purchase data', true);
        }
        data_to_send.event_name = 'purchase';
    } else {
        const queueItem = TargetAdsQueues.peek();
        TargetAdsQueues.dequeue(queueItem);
        return this.log('Can not send data', true);
    }

    Object.assign(data_to_send, this.getOtherCounters());

    let queryData = Object.assign(this.defaultParams(),{'edttm': Math.floor(Date.now() / 1000)});
    let queryParams = new URLSearchParams(queryData).toString();

    try {
        let encodedStr = JSON.stringify(data_to_send);
        this.req(queryParams, encodedStr)
        .catch(error => this.log(error,true));
    } catch (e) {
        return this.log(`Can not send data: ${e}`, true);
    }
};


class TargetAdsQueue {
  constructor(elements={}, head=0, tail=0) {
    this.elements = elements;
    this.head = head;
    this.tail = tail;
  }
  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }
  peek() {
    return this.elements[this.head];
  }
  get length() {
    return this.tail - this.head;
  }
  get isEmpty() {
    return this.length === 0;
  }
}


const TargetAdsQueues = new TargetAdsQueue();
const onHandlerEvent = (value=[]) => {
    if(value.length > 0) {
        const event = value[0];
        if(event === 'init') {
            if(value.length > 2 && isNaN(value[1]) && value[2]) {
                console.log(`State: ${JSON.stringify([...value].slice(1))}`)
                console.log(`The ID of the TargetAds project is incorrect`);
                return;
            }
            localStorage.setItem(`_tads_init`, JSON.stringify([...value].slice(1).map(item=>item)));
            return;
        }
        const data = JSON.parse(localStorage.getItem('_tads_init'));
        if(data && data.length > 0) {
            const id = data[0];
            TargetAdsQueues.enqueue(value);
            localStorage.setItem(`_tads${id}_queue`, JSON.stringify(TargetAdsQueues));
        } else {
            console.log(`State: ${localStorage.getItem('_tads_init')}`)
            console.log(`Error: First perform initialization TargetAds`);
        }
    }
    if(localStorage.getItem('_tads_init')) {
        const init = JSON.parse(localStorage.getItem('_tads_init'));
        new TargetAds(init[0], init[1], init[2], init[3]);
        if(TargetAdsQueues.length > 0) {
            const data = TargetAdsQueues.peek();
            if(typeof data === 'object' && data.length > 0) {
                window._targetADS(data[0], data[1]);
            } else if(init && init.length > 1 && init[1]) {
                console.log(`Error: TargetAds Queue item is empty`);
            }
        } else if(init && init.length > 1 && init[1]) {
            console.log(`Error: TargetAds Queue is empty`);
        }
    }
};

function TargetAdsIsStorageAvailable(){
    if('localStorage' in window || typeof localStorage === 'object') {
        var TargetADSTest = 'TargetADSTest';
        try {
            localStorage.setItem(TargetADSTest, TargetADSTest);
            if(localStorage.getItem(TargetADSTest) !== 'TargetADSTest')
                return false;
            localStorage.removeItem(TargetADSTest);
            return true;
        } catch(e) {
            return false;
        }
    }
    return false;
}

if(!TargetAdsIsStorageAvailable()){
    console.log(`TargetAds: LocalStorage unavailable`);
}
if (typeof navigator.cookieEnabled !== 'boolean' || !navigator.cookieEnabled){
	console.log(`TargetAds: Cookies unavailable`);
}


if(localStorage.getItem('_tads_init'))  {
    const init = JSON.parse(localStorage.getItem('_tads_init'));
    if(localStorage.getItem(`_tads${init[0]}_queue`)) {
        const cache = JSON.parse(localStorage.getItem(`_tads${init[0]}_queue`));
        localStorage.removeItem(`_tads${init[0]}_queue`);
        const TargetAdsQueuesTemp = new TargetAdsQueue(cache.elements, cache.head, cache.tail);
        for(let item of Object.values(TargetAdsQueuesTemp.elements)) {
            new TargetAds(init[0], init[1], init[2], init[3]);
            window._targetADS(item[0], item[1]);
        }
    }
}

window.targetAdsDataLayer = new Proxy([], {
    set: function (target, prop, value) {
        onHandlerEvent(value);
        return true;
    }
});