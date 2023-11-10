import Circular from "./Circular";
import Mesh2D from "./Mesh2D";

try {
    while (true) {
        console.log("Choose one emulator:");
        console.log("1. Mesh 2D");
        console.log("2. Circular");

        const emulator = prompt("Choose one emulator:");
        if (emulator === null) {
            console.log("Input cancelled!");
            continue;
        }

        if (emulator === "1") {
            const sizeXInput = prompt("Enter size X:");
            const sizeYInput = prompt("Enter size Y:");
            if (sizeXInput === null || sizeYInput === null) {
                console.log("Input cancelled!");
                continue;
            }

            const sizeX = parseInt(sizeXInput);
            const sizeY = parseInt(sizeYInput);

            if (isNaN(sizeX) || isNaN(sizeY)) {
                console.log("Invalid size input!");
                continue;
            }

            const mesh = new Mesh2D(sizeX, sizeY);

            mesh.printNodes();

            const sourceXInput = prompt("Enter source X:");
            const sourceYInput = prompt("Enter source Y:");
            const targetXInput = prompt("Enter target X:");
            const targetYInput = prompt("Enter target Y:");
            if (sourceXInput === null || sourceYInput === null || targetXInput === null || targetYInput === null) {
                console.log("Input cancelled!");
                continue;
            }

            const sourceX = parseInt(sourceXInput);
            const sourceY = parseInt(sourceYInput);
            const targetX = parseInt(targetXInput);
            const targetY = parseInt(targetYInput);

            if (isNaN(sourceX) || isNaN(sourceY) || isNaN(targetX) || isNaN(targetY)) {
                console.log("Invalid node input!");
                continue;
            }

            if (sourceX < 0 || sourceX >= sizeX || sourceY < 0 || sourceY >= sizeY ||
                targetX < 0 || targetX >= sizeX || targetY < 0 || targetY >= sizeY) {
                console.log("Node out of boundaries!");
                continue;
            }

            const source = mesh.getNode(sourceX, sourceY);
            const target = mesh.getNode(targetX, targetY);

            mesh.sendMessage(source, target, "Hello World!");
        } else if (emulator === "2") {
            const sizeInput = prompt("Enter size:");
            if (sizeInput === null) {
                console.log("Input cancelled!");
                continue;
            }

            const size = parseInt(sizeInput);

            if (isNaN(size)) {
                console.log("Invalid size input!");
                continue;
            }

            const circular = new Circular(size);

            circular.printNodes();

            const sourceInput = prompt("Enter source:");
            const targetInput = prompt("Enter target:");
            if (sourceInput === null || targetInput === null) {
                console.log("Input cancelled!");
                continue;
            }

            const source = parseInt(sourceInput);
            const target = parseInt(targetInput);

            if (isNaN(source) || isNaN(target)) {
                console.log("Invalid node input!");
                continue;
            }

            if (source < 0 || source >= size || target < 0 || target >= size) {
                console.log("Node out of boundaries!");
                continue;
            }

            circular.sendMessage(circular.getNode(source), circular.getNode(target), "Hello World!");
        } else {
            console.log("Invalid emulator!");
            continue;
        }
    }
}
catch (e) {
    console.log(e);
}

