import Processor from "./MPsoCComp/Processor";
import Router from "./MPsoCComp/Router";

export interface Node {
    id: number
    left: Node | null
    right: Node | null
    message: string | null
}


export interface Node2D {
    id: number;
    up: Node2D | null;
    left: Node2D | null;
    right: Node2D | null;
    down: Node2D | null;
    message: string | null;
    router: Router | null;
    processor: Processor | null;
}

export type Coordinate = {
    x: number,
    y: number
}

export type Task = {
    name: string,
    location: Coordinate
    target: Coordinate
}