const arrayUnsorted = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arraySorted = mergeSort(arrayUnsorted);
const array = [...new Set(arraySorted)];
const root = buildTree(array, 0, array.length - 1);
function node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

function tree(arr) {
  return {
    root: buildTree(arr, start, end),
  };
}

function buildTree(arr, start, end) {
  if (start > end) return null;

  let mid = start + Math.floor((end - start) / 2);
  let root = node(arr[mid]);

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.ceil(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid)); // store slice
  const right = mergeSort(arr.slice(mid)); // store slice

  // merge left and right (example)
  const merged = [];
  while (left.length && right.length) {
    merged.push(left[0] <= right[0] ? left.shift() : right.shift());
  }
  return merged.concat(left, right);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

prettyPrint(root);
