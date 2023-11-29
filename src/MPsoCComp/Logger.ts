class Logger {

    level: string;

    constructor(level: string) {
        this.level = level;
    }

    log(message: string, actualNode: string, targetNode: string) {
        console.log(`[${this.level}] ${message}  [${actualNode}] [${targetNode}]`);
    }
}

export default Logger;