import { deepEqual } from 'assert';
import { getDominoes } from '../../../src/deminoes';

describe('Dominoes', () => {

    it('normal data', async () => {

        let dataSource: [number, number][] = [
            [2, 1],
            [2, 3],
            [1, 3]
        ];
        const arr = getDominoes(dataSource);
        deepEqual(arr.length, 1);
        deepEqual(arr[0], [[2, 1], [1, 3], [3, 2]]);
    });

    it('null data', async () => {

        let dataSource: [number, number][] = [];
        const arr = getDominoes(dataSource);
        deepEqual(arr.length, 0);
    });

    it('one valid data', async () => {

        let dataSource: [number, number][] = [
            [2, 2]
        ];
        const arr = getDominoes(dataSource);
        deepEqual(arr.length, 1);
        deepEqual(arr[0], [[2, 2]]);
    });

    it('one not valid data', async () => {

        let dataSource: [number, number][] = [
            [2, 3]
        ];
        const arr = getDominoes(dataSource);
        deepEqual(arr.length, 0);
    });

    it('many not valid data', async () => {

        let dataSource: [number, number][] = [
            [2, 1],
            [2, 3],
            [1, 3],
            [3, 5]
        ];
        const arr = getDominoes(dataSource);
        deepEqual(arr.length, 0);
    });
});