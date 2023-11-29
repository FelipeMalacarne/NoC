import Processor from "./MPsoCComp/Processor";
import Router from "./MPsoCComp/Router";
import { Node2D, Task } from "./Types";

class Mesh2D {

    private sizeX: number;

    private sizeY: number;

    private nodes: Node2D[][] = [];

    private tasks: Task[] = [];

    constructor(sizeX: number, sizeY: number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.initNodes();
    }

    private initNodes() {
        for (let x = 0; x < this.sizeX; x++) {
            this.nodes[x] = [];
            for (let y = 0; y < this.sizeY; y++) {
                this.nodes[x][y] = this.createNode(x, y);

            }
        }

        // Set adjacent nodes
        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                if (x > 0) this.nodes[x][y].left = this.nodes[x - 1][y];
                if (x < this.sizeX - 1) this.nodes[x][y].right = this.nodes[x + 1][y];
                if (y > 0) this.nodes[x][y].up = this.nodes[x][y - 1];
                if (y < this.sizeY - 1) this.nodes[x][y].down = this.nodes[x][y + 1];
            }
        }
    }


    private createNode(x: number, y: number) {
        let newNode: Node2D = {
            id: x * this.sizeY + y,
            up: null,
            left: null,
            right: null,
            down: null,
            message: null,
            router: null,
            processor: null
        };
        newNode.router = new Router(newNode);
        newNode.processor = new Processor(newNode);
        return newNode;
    }

    public printNodes() {
        for (let y = 0; y < this.sizeY; y++) {
            let line = "";
            let downLine = "";
            for (let x = 0; x < this.sizeX; x++) {
                const node = this.nodes[x][y];
                const task = this.tasks.find(task => task.location.x === x && task.location.y === y);
                line += (task ? task.name : String(node.id)).padEnd(2, ' ');
                if (node.right) {
                    line += "-";
                } else {
                    line += " ";
                }
                if (node.down) {
                    downLine += "|".padEnd(3, ' ');
                } else {
                    downLine += " ".padEnd(3, ' ');
                }
            }
            console.log(line);
            if (y < this.sizeY - 1) {
                console.log(downLine);
            }
        }
    }

    public printRoute(route: Node2D[]) {
        const routeSet = new Set(route);
        for (let y = 0; y < this.sizeY; y++) {
            let line = "";
            let downLine = "";
            for (let x = 0; x < this.sizeX; x++) {
                const node = this.nodes[x][y];
                const task = this.tasks.find(task => task.location.x === x && task.location.y === y);
                if (routeSet.has(node)) {
                    line += (task ? task.name : String(node.id)).padEnd(2, ' ');
                    if (node.right && routeSet.has(node.right)) {
                        line += "-";
                    } else {
                        line += " ";
                    }
                    if (node.down && routeSet.has(node.down)) {
                        downLine += "|".padEnd(3, ' ');
                    } else {
                        downLine += " ".padEnd(3, ' ');
                    }
                } else {
                    line += " ".padEnd(3, ' ');
                    downLine += " ".padEnd(3, ' ');
                }
            }
            console.log(line);
            if (y < this.sizeY - 1) {
                console.log(downLine);
            }
        }
    }

    public sendMessage(source: Node2D, target: Node2D, message: string) {
        const route = this.calculateRoute(source, target);

        if (route.length === 1) return;

        source.processor!.startCommunication(target);

        // Traverse the message through the nodes via the route provided
        for (let i = 0; i < route.length - 1; i++) {
            const currentNode = route[i];
            currentNode.router!.arbitrate(target);
            const nextNode = route[i + 1];
            currentNode.router!.sendMessage(nextNode); // Ensure router is not null
        }

        target.processor!.endCommunication(target); // Assuming processor is not null

        this.printRoute(route);
    }


    // BFS (breadth-first search) to find the shortest route
    private calculateRoute(source: Node2D, target: Node2D): Node2D[] {
        const queue: Node2D[] = [];
        const visited: Set<Node2D> = new Set();
        const prev: Map<Node2D, Node2D> = new Map();

        queue.push(source);
        visited.add(source);

        while (queue.length > 0) {
            const node = queue.shift();
            if (node === target) {
                break;
            }
            if (!node) {
                continue;
            }

            const neighbors: (Node2D | null)[] = [node.up, node.right, node.down, node.left];
            for (const neighbor of neighbors) {
                if (neighbor && !visited.has(neighbor)) {
                    queue.push(neighbor);
                    visited.add(neighbor);
                    prev.set(neighbor, node);
                }
            }
        }

        const path: Node2D[] = [];
        let node: Node2D | undefined = target;
        while (node) {
            path.unshift(node);
            node = prev.get(node);
        }

        return path;
    }

    // Acessors
    public getNode(x: number, y: number): Node2D {
        return this.nodes[x][y];
    }

    public getNodes(): Node2D[][] {
        return this.nodes;
    }

    public getSizeX(): number {
        return this.sizeX;
    }

    public getSizeY(): number {
        return this.sizeY;
    }

    public getTasks(): Task[] {
        return this.tasks;
    }

    public getTask(x: number, y: number): Task | undefined {
        return this.tasks.find(task => task.location.x === x && task.location.y === y);
    }

    public setTasks(tasks: Task[]) {
        this.tasks = tasks;
    }

}

export default Mesh2D;