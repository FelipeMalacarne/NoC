import { Node } from "./Types";

class Circular {

    private size: number;
    private nodes: Node[];

    constructor(size: number) {
        this.size = size;
        this.nodes = [];
        this.initNodes();
    }

    private initNodes() {
        // Create all nodes
        for (let i = 0; i < this.size; i++) {
            this.nodes[i] = this.createNode(i);
        }

        //  Set adjacent nodes
        for (let i = 0; i < this.size; i++) {
            if (i > 0) this.nodes[i].left = this.nodes[i - 1];
            if (i < this.size - 1) this.nodes[i].right = this.nodes[i + 1];
        }
        // Step 3: Set circular connections
        this.nodes[0].left = this.nodes[this.size - 1];
        this.nodes[this.size - 1].right = this.nodes[0];
    }

    private createNode(id: number) {
        return {
            id: id,
            left: null,
            right: null,
            message: null
        };
    }

    public printNodes() {
        let line = "";
        for (let i = 0; i < this.size; i++) {
            const node = this.nodes[i];
            line += String(node.id).padEnd(2, ' ');
            if (node.right) {
                line += "-";
            } else {
                line += " ";
            }
        }
        console.log(line);
    }

    public getNodes() {
        return this.nodes;
    }

    public getNode(id: number) {
        return this.nodes[id];
    }

    public sendMessage(source: Node, target: Node, message: string) {
        source.message = message;

        if (source === target) {
            console.log(`Message already at target`);
            return;
        }

        const shortSide = this.calculateShortestSide(source, target);
        let currentNode = source;

        // Traverse the message through the nodes via the route provided by the shortest side
        while (currentNode !== target) {
            // Get the next node in the shortest side
            const nextNode = this.getNextNode(currentNode, shortSide);

            // Log the message passing
            console.log(`Node ${currentNode.id} sends message to node ${nextNode.id}`);

            // Pass the message to the next node
            nextNode.message = currentNode.message;
            currentNode.message = null;

            // Move to the next node
            currentNode = nextNode;
        }

        console.log(`Message arrived at target`);
    }

    private getNextNode(source: Node, side: 'left' | 'right') {
        if (side === 'left') {
            return source.left as Node;
        } else {
            return source.right as Node;
        }
    }

    private calculateShortestSide(source: Node, target: Node) {
        const left = this.calculateLeftSide(source, target);
        const right = this.calculateRightSide(source, target);
        if (left < right) {
            return 'left';
        } else {
            return 'right';
        }
    }

    private calculateLeftSide(source: Node, target: Node) {
        let distance = 0;
        let node = source;
        while (node !== target && node.left !== null) {
            distance++;
            node = node.left;
        }
        return distance;
    }

    private calculateRightSide(source: Node, target: Node) {
        let distance = 0;
        let node = source;
        while (node !== target && node.right !== null) {
            distance++;
            node = node.right;
        }
        return distance;
    }


}

export default Circular;