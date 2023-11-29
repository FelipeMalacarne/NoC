import { Task } from "../Types";

export const app1: Task[] = [
    {
        name: "A",
        location: { x: 0, y: 1 },
        target: { x: 1, y: 2 }
    },
    {
        name: "C",
        location: { x: 1, y: 2 },
        target: { x: 3, y: 3 }
    },
    {
        name: "B",
        location: { x: 2, y: 2 },
        target: { x: 3, y: 3 }
    },
    {
        name: "D",
        location: { x: 3, y: 3 },
        target: { x: 3, y: 3 }
    }
];

export const app2: Task[] = [
    {
        name: "T",
        location: { x: 0, y: 0 },
        target: { x: 1, y: 2 }
    },
    {
        name: "X",
        location: { x: 1, y: 2 },
        target: { x: 0, y: 0 }
    },
    {
        name: "X",
        location: { x: 1, y: 2 },
        target: { x: 3, y: 1 }
    },
    {
        name: "W",
        location: { x: 3, y: 1 },
        target: { x: 3, y: 1 }
    }
];

export const app3: Task[] = [
    {
        name: "G",
        location: { x: 0, y: 0 },
        target: { x: 1, y: 1 }
    },
    {
        name: "N",
        location: { x: 0, y: 1 },
        target: {  x: 1, y: 1 }
    },
    {
        name: "O",
        location: { x: 1, y: 1 },
        target: { x: 1, y: 2 }
    },
    {
        name: "P",
        location: { x: 2, y: 1 },
        target: { x: 1, y: 2 }
    },
    {
        name: "U",
        location: { x: 1, y: 2 },
        target: { x: 2, y: 2 }
    },
    {
        name: "H",
        location: { x: 2, y: 2 },
        target: {x: 3, y: 2 }
    },
    {
        name: "Z",
        location: { x: 3, y: 2 },
        target: { x: 3, y: 2 }
    },
    {
        name: "V",
        location: { x: 3, y: 3 },
        target: { x: 3, y: 3 }
    }
]
