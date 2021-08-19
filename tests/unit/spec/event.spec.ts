import { deepEqual } from 'assert';
import Bus from '../../../src/event';

describe('Tournament', () => {

    it('base use', async () => {
        const bus = new Bus();
        bus.on('test', function (params1) {
            console.log('test1', params1);
        });
        bus.emit('test', 'hahah')
    });

    it('stack use', async () => {
        const bus = new Bus();
        bus.on('testEvent', function callback1(this: Bus) {
            // do something
            this.emit('testEvent2');
        });

        bus.on('testEvent2', function callback2() {
            // do something
        });

        let emitItem1 = await bus.emit('testEvent');

        let emitItem2 = await bus.emit('testEvent');

        deepEqual(emitItem1.printStack().length, 4);

        deepEqual(emitItem2.printStack().length, 4);
    });

    it('async use', async () => {
        const bus = new Bus();
        bus.on('asynctestEvent', async function asynccallback1(this: Bus) {
            // do something
            return new Promise((res: any) => {
                setTimeout(() => {
                    this.emit('asynctestEvent2');
                    res();
                }, 10);
            });
        });

        bus.on('asynctestEvent2', function asynccallback2() {
            // do something
        });

        let emitItem1 = await bus.emit('asynctestEvent');

        let emitItem2 = await bus.emit('asynctestEvent');

        deepEqual(emitItem1.printStack().length, 4);

        deepEqual(emitItem2.printStack().length, 4);
    });

});