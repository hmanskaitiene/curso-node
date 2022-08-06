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
      try {
        let result = await this.productsDao.getAll();
        console.log('Dentro del getall')
        console.log(result)
        let data = result.map((product) => new ProductDto(product));
        return { status:200, data }         
      } catch (error) {
        console.log('Dentro del error')
        return { status:400, error } 
      }

    };

    productCreate = async (product) => {
      try {
        const data = await this.productsDao.save(new ProductDto(product));
        return { status:200, data:new ProductDto(data) }         
      } catch (error) {
        return { status:400, data: { error:error.message } } 
      }
    };

    productUpdate = async (id, product) => {
      try {
        const data = await this.productsDao.update(id, new ProductDto(product));
        return { status:200, data:new ProductDto(data) }         
      } catch (error) {
        return { status:400, data: { error:error.message } } 
      }

    };
    productDelete = async (id) => {
      try {
        const data = await this.productsDao.delete(id);
        return { status:200, data:new ProductDto(data) }         
      } catch (error) {
        return { status:400, data: { error:error.message } } 
      }

    };

}

export default ProductService;