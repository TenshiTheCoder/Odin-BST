export class Node{
    constructor(data, left = null, right = null){
        this.data = data
        this.left = left;
        this.right = right;
    }
}

export class Tree{
    constructor(array){
        this.root = this.#buildTree(array);
    }

    #buildTree(array){
        let cleanArr = new Set(array);
        let sortedArr = [...cleanArr];
        sortedArr.sort((x, y) => x - y);

        function buildSubTree(sortedArr){
            if(sortedArr.length === 0){
                return null;
            }

            let middleIndex = Math.floor(sortedArr.length / 2);
            let rootNode = new Node(sortedArr[middleIndex]);

            rootNode.left = buildSubTree(sortedArr.slice(0, middleIndex));
            rootNode.right = buildSubTree(sortedArr.slice(middleIndex + 1))
            return rootNode
        }
            return buildSubTree(sortedArr);
        }

        includes(value){
            let currentNode = this.root;
            if(currentNode === null) return false;

            while(currentNode !== null){
                if(value === currentNode.data) {
                    return true
                } 

                if(value < currentNode.data){
                    currentNode = currentNode.left
                }

                if(value > currentNode.data){
                    currentNode = currentNode.right;
                }
            }
            return false;
        }

        insert(value){
            let currentNode = this.root;
            
            if(currentNode === null){
                this.root = new Node(value);
                return this.root;
            }

            while(currentNode !== null){
                if(currentNode.data === value) return this.root;

                if(value < currentNode.data){
                    if(currentNode.left === null){
                        currentNode.left = new Node(value);
                        return this.root;
                    } else {
                        currentNode = currentNode.left 
                    }
                }

                if(value > currentNode.data){
                    if(currentNode.right === null){
                        currentNode.right = new Node(value);
                        return this.root;
                    } else {
                        currentNode = currentNode.right;
                    }
                }
            }
    
        }

        deleteItem(value){
            let currentNode = this.root;
            let prevNode = null;

            if(currentNode === null) return;
            while(currentNode !== null){

                if(value === currentNode.data){
                    if(prevNode === null){
                        if(currentNode.left !== null && currentNode.right === null){
                                this.root = currentNode.left;
                                return
                            } else if(currentNode.left === null && currentNode.right !== null){
                                this.root = currentNode.right;
                                return
                            } else if (currentNode.left === null && currentNode.right === null){
                                this.root = null;
                                return;
                            }    

                    if(
                        prevNode !== null && 
                        currentNode.left === null && 
                        currentNode.right === null
                    ){
                        if(currentNode.data < prevNode.data){
                            prevNode.left = null;
                            return
                        } else {
                            prevNode.right = null;
                            return;
                        }
                    }

                    if(prevNode !== null){
                        if(currentNode.data < prevNode.data){
                            if(currentNode.left !== null && currentNode.right === null){
                                prevNode.left = currentNode.left;
                                return;
                            } else if(currentNode.left === null && currentNode.right !== null){
                                prevNode.left = currentNode.right;
                                return;
                            }
                        } else {
                            if(currentNode.data > prevNode.data){
                                if(currentNode.left !== null && currentNode.right === null){
                                    prevNode.right = currentNode.left;
                                    return;
                                } else if(currentNode.left === null && currentNode.right !== null){
                                    prevNode.right = currentNode.right;
                                    return;
                                }
                            }
                        }
                    }

                    return;
                } 

                if(value < currentNode.data){
                    prevNode = currentNode;
                    currentNode = currentNode.left;
                } else {
                    prevNode = currentNode;
                    currentNode = currentNode.right;
                    
                }


                if(currentNode.left !== null && currentNode.right !== null){
                    let pred = currentNode;
                    prevNode = currentNode;
                    currentNode = currentNode.right;

                    while(currentNode.left !== null){
                        prevNode = currentNode;
                        currentNode = currentNode.left;
                    }

                    pred.data = currentNode.data;

                    if(prevNode.left === currentNode){
                        if(currentNode.right === null){
                            prevNode.left = null;
                            return;
                        } else {
                            prevNode.left = currentNode.right
                        };
                    } else {
                        if(currentNode.right === null){
                            prevNode.right = null;
                            return;
                        } else {
                            prevNode.right = currentNode.right;
                        }
                    }
                }

            }

        };
    }

    levelOrderForEach(callback){
        if(typeof callback !== `function`) throw new Error("Callback is not a function");

        let queue = [];
        if(this.root !== null) {
            queue.push(this.root);
        } else return;
        

        while(queue.length > 0){
            let currentNode = queue.shift();
            callback(currentNode.data);

            if(currentNode.left !== null){
                queue.push(currentNode.left);
            };

            if(currentNode.right !== null){
                queue.push(currentNode.right);
            };
        };

// Come back to this later for recursive implementation

    };

    inOrderForEach(callback){
        if(typeof callback !== `function`) throw new Error("Callback is not a function");

        let stack = [];
        let currentNode = this.root;
        
        while(currentNode !== null || stack.length > 0){
            while(currentNode !== null){
                stack.push(currentNode);
                currentNode = currentNode.left;
            }
            currentNode = stack.pop();
            callback(currentNode.data);
            currentNode = currentNode.right;
        }
    }

    preOrderForEach(callback){
        if(typeof callback !== `function`) throw new Error("Callback is not a function");

        let stack = [];

        if(this.root){
            stack.push(this.root);
        }
    
        while(stack.length > 0){
            let currentNode = stack.pop();
            callback(currentNode.data);

            if(currentNode.right !== null){
                stack.push(currentNode.right);
            }

            if(currentNode.left !== null){
                stack.push(currentNode.left);
            }
        }
    }


    postOrderForEach(callback){
        if(typeof callback !== `function`) throw new Error("Callback is not a function");

        let stack = [];
        let secondStack = [];

        if(this.root){
            stack.push(this.root);
        }

        while(stack.length > 0){
            let currentNode = stack.pop();

            if(currentNode.left !== null){
                stack.push(currentNode.left);
            }

            if(currentNode.right !== null){ 
                stack.push(currentNode.right);
            }

            secondStack.push(currentNode);
        }

        while(secondStack.length > 0){
                let secondNode = secondStack.pop();
                callback(secondNode.data);
            }
    }


        calcHeight(node){
            let leftHeight = 0;
            let rightHeight = 0;

            if(node === null){
                return -1;
            }

            leftHeight = this.calcHeight(node.left);
            rightHeight = this.calcHeight(node.right);

            return Math.max(leftHeight, rightHeight) + 1;
        }

    height(value){
        let heightCount = 0;
        let currentNode = this.root;

        while(currentNode !== null){
                if(value === currentNode.data) {
                    break;
                } 

                if(value < currentNode.data){
                    currentNode = currentNode.left
                }

                if(value > currentNode.data){
                    currentNode = currentNode.right;
                }
            }

        if(currentNode !== null){
            heightCount = this.calcHeight(currentNode);
            return heightCount;
        }

        return undefined;
    }

    depth(value){
        let depthCount = 0;
        let currentNode = this.root;
        
        while(currentNode !== null){
                if(value === currentNode.data) {
                    break;
                } 

                if(value < currentNode.data){
                    currentNode = currentNode.left
                    depthCount++;
                }

                if(value > currentNode.data){
                    currentNode = currentNode.right;
                    depthCount++;
                }
            }

            if(currentNode !== null) return depthCount;
            else return undefined;
    }

    isBalanced(){
        let currentNode = this.root;

        const calcBalance = (node) => {
            if(node === null){
                return true;
            }

            let leftHeight = this.calcHeight(node.left);
            let rightHeight = this.calcHeight(node.right);

            if(Math.abs(leftHeight - rightHeight) > 1) return false;

            let leftBal = calcBalance(node.left);
            let rightBal = calcBalance(node.right);

            if(leftBal && rightBal) return true;
            return false;
        }

        return calcBalance(currentNode);
    }

    rebalance(){
        let newArray = [];
        this.inOrderForEach(value => newArray.push(value));

        this.root = this.#buildTree(newArray);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


// console.log(buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));
// prettyPrint(Tree.#buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));