interface UsedType {
    used: [number, number];
    sourceArr: [number, number][];
}

// 从剩余牌中获取会匹配到的牌
function getNextDominoes(target: number, sourceArr: [number, number][]) {
    let res: UsedType[] = [];
    for (let i = 0; i < sourceArr.length; i++) {
        let item = sourceArr[i];
        if (item[0] === target || item[1] === target) {
            let fork = sourceArr.slice();
            fork.splice(i, 1);
            let used: [number, number] = item[0] === target ? item : [item[1], item[0]]
            res.push({
                used,
                sourceArr: fork
            });
        }
    }
    return res;
}


/**
 * @desc 做一个深度优先遍历，当有一个匹配到以后，就认为是有效的
 * 题目分析： 多米诺，任选一块石头开始，都可以实现循环
 * 时间复杂度O(n2)
 * @param data
 */
export function getDominoes(data: [number, number][]) {
    // 存储部分结果，但只要能组成，必定会有一个或多个
    let res: [number, number][][] = [];
    const len = data.length;
    // 空的认为不是有效的
    if (len === 0) {
        console.log('resulting chain is not valid')
        return res;
    }
    let start = data[0];
    data.shift();

    function dfs(target: number, sourceArr: [number, number][], uesdArr: [number, number][]) {
        if (uesdArr.length === len && target === uesdArr[0][0]) {
            res.push(uesdArr);
        }
        let nextArr = getNextDominoes(target, sourceArr);
        if (nextArr.length === 0 && sourceArr.length > 0) {
            return;
        }
        for (let next of nextArr) {
            let forkUsed = uesdArr.slice();
            forkUsed.push(next.used);
            dfs(next.used[1], next.sourceArr, forkUsed);
        }
    }
    dfs(start[1], data, [start]);
    console.log(`resulting chain is ${res.length > 0 ? '' : 'not'} valid`);
    return res;
}