import assert from 'node:assert'
import chai from 'chai';
import chaiHttp from 'chai-http';
let should = chai.should();
chai.use(chaiHttp);

const url= 'http://localhost:8080';

const data = {
    "nombre": "Producto de ejemplo",
    "precio": "100",
    "foto": "https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png"
}

const dataUpdated = {
    "nombre": "Producto de ejemplo modificado",
    "precio": "200",
    "foto": "https://cdn.icon-icons.com/icons2/3556/PNG/128/image_photo_photography_camera_icon_225026.png"
}

let cantidadProductos = 0;
let productId = 0;

describe('Estado del request al solicitar productos',() => {
    it('Debería devolver un estado 200 al pedir productos', (done) => {
        chai.request(url)
        .get('/api/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            cantidadProductos = res.body.length
            done();
        });
    });
});

describe('Obtener productos',() => {
    it('Debería obtener el listado de productos y esperar un array', (done) => {
        chai.request(url)
        .get('/api/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });
});

describe('Insertar producto',() => {
    it('Debería poder insertar un producto obtener un objeto', (done) => {
        chai.request(url)
        .post('/api/productos')
        .send(data)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            productId = res.body.id
            cantidadProductos++;
            done();
        });
    });
    it('Debería tener la cantidad de productos correcta despues de haber insertado el producto', (done) => {
        chai.request(url)
        .get('/api/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });

});

describe('Modificación de producto',() => {
    it('Debería poder modificar un producto y ver el dato modificado', (done) => {
        chai.request(url)
        .put(`/api/productos/${productId}`)
        .send(dataUpdated)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('precio').eql('200');
            res.body.should.have.property('nombre').eql('Producto de ejemplo modificado');
            done();
        });
    });
});

describe('Eliminación de producto',() => {
    it('Debería poder eliminar un producto', (done) => {
        chai.request(url)
        .delete(`/api/productos/${productId}`)
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            cantidadProductos--;
            done();
        });
    });
    it('Debería tener la cantidad de productos correcta despues de haber eliminado el producto', (done) => {
        chai.request(url)
        .get('/api/productos')
        .end( (err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            assert.strictEqual(res.body.length, cantidadProductos)
            done();
        });
    });
});

