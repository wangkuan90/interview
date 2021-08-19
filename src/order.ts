interface NodeType {
    id: number;
    before?: number;
    after?: number;
    first?: boolean;
    last?: boolean;
    left?: NodeType;
    right?: NodeType;
}
// 中序遍历
function inorder(node: NodeType) {
    let arr: number[] = [];
    function order(root?: NodeType) {
        if (!root) {
            return
        }
        // 递归遍历左子树 
        order(root.left)
        arr.push(root.id);
        // 递归遍历右子树  
        order(root.right)
    }
    order(node);
    return arr;
}

export function orderList(arr: NodeType[]) {
    let map = new Map<number, NodeType>();
    let cache: NodeType[] = [];
    for (let item of arr) {
        map.set(item.id, item);
    }
    let first: NodeType | null = null;
    let last: NodeType | null = null;
    for (let item of arr) {
        if (item.first) {
            first = item;
        } else if (item.last) {
            last = item;
        } else if (item.before) {
            let node = map.get(item.before);
            if (node) {
                node.left = item;
            }
        } else if (item.after) {
            let node = map.get(item.after);
            if (node) {
                node.right = item;
            }
        } else {
            cache.push(item);
        }
    }
    if (first) {
        cache.unshift(first)
    }
    if (last) {
        cache.push(last)
    }
    let res: number[] = []
    // 对数组中的每一个数进行先序遍历
    for (let item of cache) {
        res = res.concat(inorder(item));
    }
    return res;
}