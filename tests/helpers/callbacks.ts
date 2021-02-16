export function SimpleCallback(arg: string): string {
    return arg;
}

export function ThrowingCallback(arg: string): string {
    throw new Error("Test error");
}

export function TestPromiseFactory(arg: string): Promise<string> {
    return new Promise((resolve, reject) => {
        resolve(arg);
    })
}