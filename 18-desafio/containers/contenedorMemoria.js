
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
    update = async (id, item) => {
        const index = this.items.findIndex(p => p.id === parseInt(id));
        if (index < 0) throw new Error('No existe el identificador')
        item.id = parseInt(id);
        this.items[index] = item;
        return item;
    }
    delete = async (id) => {
      const index = this.items.findIndex(p => p.id === parseInt(id));
      if (index < 0) throw new Error('No existe el identificador')
      const itemDeleted = this.items.splice(index, 1);
      return itemDeleted[0];
  }

}

export default ContenedorMemoria;
