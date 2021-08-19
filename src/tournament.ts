interface ResultValueType {
    MP: number;
    W: number;
    D: number;
    L: number;
    P: number;
    space: number;
}

interface ResultType {
    [key: string]: ResultValueType;
}

// 过滤输入的数据
function getInputData(file: string) {
    let arr = file.split('\n');
    return arr.filter((item) => {
        return item && /^[a-zA-Z ]+;[a-zA-Z ]+;(win|draw|loss)$/.test(item);
    });
}

function createTeam() {
    return {
        MP: 0,
        W: 0,
        D: 0,
        L: 0,
        P: 0,
        space: 1
    };
}

function handlerResult(type: string, obj: ResultType, teamName: string) {
    obj[teamName] = obj[teamName] || createTeam();
    obj[teamName].MP++;
    if (type === 'win') {
        obj[teamName].W++;
        obj[teamName].P += 3;
    } else if (type === 'draw') {
        obj[teamName].D++;
        obj[teamName].P++;
    } else {
        obj[teamName].L++;
    }
}

function getContraryType(type: string) {
    if (type === 'win') {
        return 'loss';
    }
    if (type === 'loss') {
        return 'win';
    }
    return type;
}

function generateOutputData(obj: ResultType) {
    let arr: [string, number, number, number, number, number, number][] = [];
    let max = 1;
    for (let [team, value] of Object.entries(obj)) {
        // 制表符\t代表4个空格
        value.space = Math.ceil(team.length / 4);
        max = Math.max(max, value.space);
    }
    for (let [team, value] of Object.entries(obj)) {
        arr.push([team, value.MP, value.W, value.D, value.L, value.P, max - value.space]);
    }
    arr = arr.sort((item1, item2) => {
        if (item1[5] !== item2[5]) {
            return item2[5] - item1[5];
        }
        return item1[0].localeCompare(item2[0]);
    });
    return {
        arr,
        max
    };
}

function getSpace(num: number) {
    return new Array(num).fill('\t').join('') + '\t';
}
/**
 * @param file 文件的字符串
 * @returns arr 标准数据，用来做单测使用
 * @returns output 写入文件的值
 */
export function generateTournamentFile(file: string) {
    let res: ResultType = {};
    let inputArr = getInputData(file);
    for (let input of inputArr) {
        const [team1, team2, type] = input.split(';');
        handlerResult(type, res, team1);
        handlerResult(getContraryType(type), res, team2);
    }
    let { arr, max } = generateOutputData(res);
    let output = `Team${getSpace(max - 2)}MP\tW\tD\tL\tP\n`;
    for (let item of arr) {
        output += `${item[0]}${getSpace(item[6])}${item[1]}\t${item[2]}\t${item[3]}\t${item[4]}\t${item[5]}\n`;
    }
    return {
        arr,
        output
    };
}