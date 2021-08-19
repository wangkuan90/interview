interface CBType {
    (params: any): any;
}

function getTarget(target: Bus | ChildBus) {
    if (target instanceof ChildBus) {
        return target;
    } else {
        return new ChildBus();
    }
}
/**
 * @class Bus
 * @desc 为了实现记录各个工作事件记录，总的task是公共的，每个的任务是单独的
 */
class Bus {
    static map = new Map<string, CBType[]>();
    private child = new WeakMap<Bus, any>();
    public on(eventName: string, cb: CBType) {
        if (!eventName || !cb) return;
        // 判断回调的 cb 是否为函数
        if (typeof cb !== 'function') {
            throw new TypeError('cb must be a function');
        }
        let arr = Bus.map.get(eventName) || [];
        // 不重复添加事件，判断是否有一样的
        if (!arr.includes(cb)) {
            arr.push(cb);
            Bus.map.set(eventName, arr);
        }
        return this;
    }
    // 实现不友好，偷个懒吧。最好的方式是能分别做处理
    public async emit(eventName: string, ...args: any) {
        let target = getTarget(this);
        target.pushStack('event', eventName);
        let arr = Bus.map.get(eventName) || [];
        // 需要考虑多个 cb 的情况
        for (let cb of arr) {
            await cb.apply(target, args);
            target.pushStack('callback', cb.name);
        }
        return target;
    }
    public off(eventName?: string, cb?: CBType) {
        // 如果第一个参数是非字符串，则报错
        if (eventName && typeof eventName !== 'string') {
            console.error('off函数 第一个name必须是string');
        }
        // 如果都没传
        if (!eventName) {
            Bus.map = new Map<string, CBType[]>();
        }
        // 如果没有传cb，则表示该eventName都全部卸载
        if (cb && typeof cb !== 'function') {
            console.error('off函数 第二个name必须是function');
        }
        Bus.map.delete(<string>eventName);
    }
}

interface StackType {
    type: string;
    name: string;
}

class ChildBus extends Bus {
    private stack: StackType[] = [];
    constructor() {
        super();
    }
    private getLine(i: number) {
        return new Array(i).fill('--').join('');
    }
    public pushStack(type: string, name: string) {
        this.stack.push({
            type,
            name
        });
    }
    public printStack() {
        let printStr = '';
        for (let i = 0; i < this.stack.length; i++) {
            let stack = this.stack[i];
            printStr += `${this.getLine(i)}${stack.type}: ${stack.name}\n`;
        }
        console.log(printStr);
        return this.stack;
    }
}

export default Bus;