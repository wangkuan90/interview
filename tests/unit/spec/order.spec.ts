import { deepEqual } from 'assert';
import { orderList } from '../../../src/order';

describe('Tournament', () => {

    let dataSource = [
        { id: 1 },
        { id: 2, before: 1 },
        { id: 3, after: 1 },
        { id: 5, first: true },
        { id: 6, last: true },
        { id: 7, after: 8 },
        { id: 8 },
        { id: 9 },
    ];


    it('normal data', async () => {
        const arr = orderList(dataSource);

        deepEqual(arr.length, 8);
        deepEqual(arr, [5, 2, 1, 3, 8, 7, 9, 6]);
    });
});