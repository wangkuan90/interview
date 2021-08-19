import { deepEqual } from 'assert';
import { createTree } from '../../../src/tree';

describe('Tournament', () => {

    it('normal data', async () => {

        let dataSource = [
            { id: 1, name: 'i1' },
            { id: 2, name: 'i2', parentId: 1 },
            { id: 4, name: 'i4', parentId: 3 },
            { id: 3, name: 'i3', parentId: 2 },
        ];
        const arr = createTree(dataSource);

        deepEqual(arr.length, 1);
        deepEqual(arr, [{
            id: 1,
            name: 'i1',
            children: [
                {
                    id: 2,
                    name: 'i2',
                    parentId: 1,
                    children: [
                        {
                            id: 3,
                            name: 'i3',
                            parentId: 2,
                            children: [
                                {
                                    id: 4,
                                    name: 'i4',
                                    parentId: 3
                                }
                            ]
                        }
                    ]
                }
            ]
        }]);
    });

    it('error data', async () => {

        let dataSource = [
            { id: 1, name: 'i1' },
            { id: 2, name: 'i2', parentId: 1 },
            { id: 4, name: 'i4', parentId: 3 },
            { id: 3, name: 'i3', parentId: 2 },
            { id: 8, name: 'i8', parentId: 7 }
        ];
        try {
            createTree(dataSource);
        } catch (error) {
            deepEqual(error.message, 'parentId为7的数据异常');
        }
    });
});