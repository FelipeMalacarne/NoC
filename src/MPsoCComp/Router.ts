import { Node2D } from "../Types";
import Logger from "./Logger";

class Router {
    logger: Logger;
    node: Node2D;

    constructor(node: Node2D) {
        this.logger = new Logger("R");
        this.node = node;
    }

    sendMessage(nextNode: Node2D) {
        if (this.node.id !== nextNode.id) {
            this.logger.log("ENVIANDO", this.node.id.toString(), nextNode.id.toString());
        }
    }

    arbitrate(nextNode: Node2D) {
        this.logger.log("ARBITRAGEM", this.node.id.toString(), nextNode.id.toString());
    }
}

export default Router;