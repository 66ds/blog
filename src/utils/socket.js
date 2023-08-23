import Vue from 'vue';


class wsSocket {
    constructor(opt) {
        this.vm = new Vue;
        this.ws = null;
        this.opt = opt || {};
        this.init(opt);
    }

    onOpen(key = false) {
        this.opt.open && this.opt.open();
        let that = this;
        // that.ping();
        this.socketStatus = true;
    }

    init(opt) {
        let wsUrl = ''
        // let hostUrl = Setting.wsAdminSocketUrl
        // if (sessionStorage.getItem("SERVER_TYPE") !== 'nginx') {
        //     hostUrl = hostUrl + '/ws'
        // }
        if (opt.key == 1) {
            wsUrl = `ws://47.100.136.75:12000/chatWebSocket/${opt.sendId}/${opt.receiveId}`
            //wsUrl = `ws://127.0.0.1:12000/chatWebSocket/${opt.sendId}/${opt.receiveId}`
        }
        if (opt.key == 2) {
            wsUrl = `ws://47.100.136.75:12000/loginWebSocket/${opt.sendId}`
            //wsUrl = `ws://127.0.0.1:12000/loginWebSocket/${opt.sendId}`
        }
        // if (opt.token) {
        //     wsUrl += '&token=' + opt.token
        // } else 
        // if (opt.tourist_uid) {
        //     wsUrl += '&tourist_uid=' + opt.tourist_uid
        // }util.wss(wsUrl)
        if (wsUrl) {
            this.ws = new WebSocket(wsUrl);
            this.ws.onopen = this.onOpen.bind(this);
            this.ws.onerror = this.onError.bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
            this.ws.onclose = this.onClose.bind(this);
        }

    }

    // ping() {
    //     var that = this;
    //     this.timer = setInterval(() => {
    //         that.send({ type: 'ping' });
    //     }, 10000);
    // }

    send(data) {
        return new Promise((resolve, reject) => {
            try {
                this.ws.send(data);
                // resolve({ status: true });
            } catch (e) {
                // reject({ status: false })
            }
        });
    }

    onMessage(res) {
        this.opt.message && this.opt.message(res);
    }

    onClose() {
        // this.timer && clearInterval(this.timer);
        this.opt.close && this.opt.close();
    }

    onError(e) {
        this.opt.error && this.opt.error(e);
    }

    $on(...args) {
        this.vm.$on(...args);
    }
    $off(...args) {
        this.vm.$off(...args);
    }
}

let promises = {};

function createSocket(key,flag, sendId, receiveId) {
    if(flag){
        promises[key] = null;
    }
    if (!promises[key])
        promises[key] = new Promise((resolve, reject) => {
            const ws = new wsSocket({
                key,
                sendId,
                receiveId,
                open() {
                    resolve(ws);
                },
                error(e) {
                    reject(e)
                },
                message(res) {
                    const { type, data = {} } = JSON.parse(res.data);
                    ws.vm.$emit(type, data);
                },
                close(e) {
                    // ws.vm.$emit('close', e);
                    // ws.ws.close()
                }
            })
        });
    return promises[key];
}


//聊天websocket
export const chatSocket = (flag,sendId,receiveId) => createSocket(1, flag,sendId, receiveId);
//登录websocket
export const loginSocket = (flag,userId) => createSocket(2,flag,userId);
