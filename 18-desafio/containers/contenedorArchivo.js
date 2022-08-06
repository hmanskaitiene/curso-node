import fs from 'fs';

class ContenedorArchivo {
  constructor(filename) {
    this.path = `./${process.env.DATABASE_DIRECTORY}/${filename}`;
    this.init();
  }
  init = async () => {
    if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]));
  };
  readFile = async () => {
    let data = await fs.promises.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  };
  saveFile = async (items) => {
    await fs.promises.writeFile(this.path, JSON.stringify(items, null, '\t'));
  };
  getAll = async () => {
    return await this.readFile();
  };
  save = async (item) => {
    let items = await this.readFile();
    if (items.length === 0) item.id = 1;
    else item.id = items[items.length - 1].id + 1;
    items.push(item);
    await this.saveFile(items);
    return item;
  };
  update = async (id, item) => {
      const items = await this.getAll();
      const index = items.findIndex(p => p.id === parseInt(id));
      if (index < 0) throw new Error('No existe el identificador')
      item.id = parseInt(id);
      items[index] = item;
      await this.saveFile(items);
      return item;
  }
  delete = async (id) => {
    const items = await this.getAll();
    const index = items.findIndex(p => p.id === parseInt(id));
    if (index < 0) throw new Error('No existe el identificador')
    const itemDeleted = items.splice(index, 1);
    await this.saveFile(items);
    return itemDeleted[0];
}
}


export default ContenedorArchivo;
