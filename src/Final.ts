import { app1, app2, app3 } from "./MPsoCComp/Applications";
import Mesh2D from "./Mesh2D";
import { Task } from "./Types";

try {
    while(true){
        const mesh = new Mesh2D(4, 4);
        // clear terminal
        console.log("Choose one application:");
        console.log("1. App 1");
        console.log("2. App 2");
        console.log("3. App 3");
        const app = prompt("Choose one application:");
        console.clear();
        if (app === null) {
            console.log("Input cancelled!");
            continue;
        }
        switch (app) {
            case "1":
                mesh.setTasks(app1);
                break;
            case "2":
                mesh.setTasks(app2);
                break;
            case "3":
                mesh.setTasks(app3);
                break;
            default:
                console.log("Invalid application!");
                continue;
        }

        mesh.printNodes();
        mesh.getTasks().forEach(task => {
            const source = mesh.getNode(task.location.x, task.location.y);
            const target = mesh.getNode(task.target.x, task.target.y);
            mesh.sendMessage(source, target, `Message from ${task.name}`);
        });
    }

} catch (e) {
    console.log(e);
}
