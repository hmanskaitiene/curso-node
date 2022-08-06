class ProductDto {
    constructor(product) {
      this.id = product.id;
      this.nombre = product.nombre;
      this.precio = product.precio;
      this.foto = product.foto;
  }
}

export default ProductDto;