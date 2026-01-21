const arrayUnsorted = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arraySorted = mergeSort(arrayUnsorted);
const array = [...new Set(arraySorted)];
let root = tree(array);

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

function node(data) {
  return {
    data,
    left: null,
    right: null,
  };
}

function tree(arr) {
  return buildTree(arr, 0, arr.length - 1);
}

function buildTree(arr, start, end) {
  if (start > end) return null;

  let mid = start + Math.floor((end - start) / 2);
  let root = node(arr[mid]);

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}

function insert(root, key) {
  if (root === null) return node(key);

  if (key < root.data) root.left = insert(root.left, key);
  else root.right = insert(root.right, key);

  return root;
}

root = insert(root, 6);
root = insert(root, 2);

function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) curr = curr.left;
  return curr;
}

function delNode(root, x) {
  if (root === null) return root;

  if (root.data > x) root.left = delNode(root.left, x);
  else if (root.data < x) root.right = delNode(root.right, x);
  else {
    // Node with 0 or 1 child
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    // Node with 2 children
    const succ = getSuccessor(root);
    root.data = succ.data;
    root.right = delNode(root.right, succ.data);
  }
  return root;
}

function find(root, value) {
  if (root == null) return null;
  if (root.data === value) return root;
  return find(root.left, value) || find(root.right, value);
}

function levelOrderForEach(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("A callback function is required");
  }
  if (!root) return;
  const q = [root];
  let i = 0;
  while (i < q.length) {
    const n = q[i++];
    callback(n);
    if (n.left) q.push(n.left);
    if (n.right) q.push(n.right);
  }
}
const out = [];
levelOrderForEach(root, (n) => out.push(n.data));
// console.log(out);
function preOrderForEach(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("A callback function is required");
  }
  if (root === null) return;
  callback(root);
  preOrderForEach(root.left, callback);
  preOrderForEach(root.right, callback);
}

function inOrderForEach(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("A callback function is required");
  }
  if (root === null) return;
  inOrderForEach(root.left, callback);
  callback(root);
  inOrderForEach(root.right, callback);
}

function postOrderForEach(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("A callback function is required");
  }
  if (root === null) return;
  postOrderForEach(root.left, callback);

  postOrderForEach(root.right, callback);
  callback(root);
}

postOrderForEach(root, (n) => console.log(n.data));

prettyPrint(root);
