interface NodeType {
    id: number;
    name: string;
    parentId?: number;
    children?: NodeType[];
}

export function createTree(arr: NodeType[]) {
    let map = new Map<number, NodeType>()
    for (let item of arr) {
        map.set(item.id, item);
    }
    let res: NodeType[] = [];
    for (let item of arr) {
        if (item.parentId) {
            let node = map.get(item.parentId);
            if (!node) {
                throw new Error(`parentId为${item.parentId}的数据异常`)
            }
            node.children = node.children || [];
            node.children.push(item);
        } else {
            res.push(item);
        }
    }
    return res;
}