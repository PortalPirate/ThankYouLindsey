export default async function context(context, func) {
    const value = context.__enter__();
    try {
        await func(value);
        context.exit();
    } catch (error) {
        context.exit(error);
    }
}

export class contextManager {
    constructor(func) {
        return func();
    }

    __enter__() {
        const {value} = this.next();
        return value;
    }

    __exit__(error) {
        if (error) {
            this.throw(error);
        } else {
            this.next();
        }
    }
}
