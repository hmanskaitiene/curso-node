
class ContenedorMongoDB {

    constructor(model){
        this.model = model;
    }

    getAll = async () => {
        const all = await this.model.find({});
        return all;
    }

    save = async (item) => {
        const id = await this.model.create(item);
        return id;
    }
    update = async (id, item) => {
        const updated = await this.model.findOneAndUpdate({ _id: id },item);
        return updated;
    }
    delete = async (id) => {
        const deleted = await this.model.findOneAndDelete({ _id: id });
        return deleted;
    }

}

export default ContenedorMongoDB;