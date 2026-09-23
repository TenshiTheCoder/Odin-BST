import { Tree, Node } from "./tree.js";
const numArr = [];

function randomNumbers(){
    let i = 0;

    while(i < 10){
      numArr.push(Math.floor(Math.random() * 100));
        i++
    };

    return numArr;
}

console.log(randomNumbers());


let newTree = new Tree(numArr);
// console.log(newTree);

//Returns true: console.log(newTree.isBalanced());

// const levelOrder = [];
// newTree.levelOrderForEach(value => levelOrder.push(value));
// console.log(levelOrder);

// const postOrder = [];
// newTree.postOrderForEach(value => postOrder.push(value));
// console.log(postOrder);

// const preOrder = [];
// newTree.preOrderForEach(value => preOrder.push(value));
// console.log(preOrder);

// const inOrder = [];
// newTree.inOrderForEach(value => inOrder.push(value));
// console.log(inOrder);

newTree.insert(52);
newTree.insert(56);
console.log(newTree.isBalanced());
newTree.rebalance();
console.log(newTree.isBalanced());

const levelOrder = [];
newTree.levelOrderForEach(value => levelOrder.push(value));
console.log(levelOrder);

const postOrder = [];
newTree.postOrderForEach(value => postOrder.push(value));
console.log(postOrder);

const preOrder = [];
newTree.preOrderForEach(value => preOrder.push(value));
console.log(preOrder);

const inOrder = [];
newTree.inOrderForEach(value => inOrder.push(value));
console.log(inOrder);