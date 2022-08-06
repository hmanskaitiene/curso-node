import { faker } from'@faker-js/faker';
import ProductoPersistenceFactory from '../daos/productos/productoPersistenceFactory.js';   
import ProductDto from '../dtos/productDto.js'
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
      let result = await this.productsDao.getAll();
      let data = result.map((product) => new ProductDto(product));
      return { status:200, data } 
    };

    save = async (product) => {
      const data = await this.productsDao.save(new ProductDto(product));
      return { status:200, data:new ProductDto(data) } 
    };

}

export default ProductService;