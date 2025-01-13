export default class GlobalRegistry {

    static registry: any = [];

    static clear() {
        this.registry = [];
    }
}


