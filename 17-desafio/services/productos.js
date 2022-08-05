import { faker } from'@faker-js/faker';
import ProductoPersistenceFactory from '../daos/productos/productoPersistenceFactory.js';   
faker.locale = 'es';

class ProductService {
    constructor() {
      this.productsDao;
      this.init();
    }
    init = async () => {
      this.productsDao = await ProductoPersistenceFactory.getPersistence();
    };
    getTestProducts = () => {
        const output = [];
        for (let i = 0; i < 5; i++) {  
            
            output.push({
                'nombre':faker.commerce.product(),
                'precio': faker.commerce.price(),
                'foto': faker.image.technics(240,240,true)
            });
        }
    
        return output;
    }

    getAll = async () => {
      return await this.productsDao.getAll();
    };

    save = async (product) => {
      return await this.productsDao.save(product);
    };

}

export default ProductService;