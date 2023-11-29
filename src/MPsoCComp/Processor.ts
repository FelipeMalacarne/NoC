import { Node2D } from "../Types";
import Logger from "./Logger";

class Processor {
    logger: Logger;
    node: Node2D;

    constructor(node: Node2D) {
        this.logger = new Logger("P");
        this.node = node;
    }

    startCommunication(targetNode: Node2D) {
        this.logger.log("INICIANDO COMUNICAÇÃO", this.node.id.toString(), targetNode.id.toString());
    }

    endCommunication(targetNode: Node2D) {
        this.logger.log("ENCERRANDO COMUNICAÇÃO", this.node.id.toString(), targetNode.id.toString());
    }
}

export default Processor;
