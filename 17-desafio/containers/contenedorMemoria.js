
class ContenedorMemoria {
    constructor(items){
        this.items = items;
    }

    getAll = async () => {
        return this.items;
      };
    save = async (item) => {
        if (this.items.length === 0) item.id = 1;
        else item.id = this.items[this.items.length - 1].id + 1;
        this.items.push(item);
        return item;
    };
}

export default ContenedorMemoria;
