const { faker } = require('@faker-js/faker');
faker.locale = 'es';

const getTestProducts = () => {
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


module.exports = {
    getTestProducts
}