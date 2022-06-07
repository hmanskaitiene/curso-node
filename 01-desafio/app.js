class Usuario {
    constructor(nombre,apellido,libros,mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }
    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre,autor){
        this.libros.push({nombre:nombre,autor:autor});
    }
    getBookNames(){
        return this.libros.map(l => l.nombre);
    }
}

const usuario = new Usuario('Carlitos','Balá',[],[]);
usuario.addMascota('Violeta');
usuario.addMascota('Pluto');
usuario.addBook('Platero y yo','Juan Ramón Jiménez');
usuario.addBook('El túnel','Ernesto Sabato');

console.log(usuario.getFullName());
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());