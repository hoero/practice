export function Autobind(_: any, _n: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        },
    };
    return adjDescriptor;
}
