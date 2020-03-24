const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err)
            throw new Error('No se pudo grabar', err);
    });


}

const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];

    }



}


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => { //posicion de la tarea de la coincidencia, caso contrario es -1
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }


}

const borrar = (descripcion) => {
    cargarDB();

    let result = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (result.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = result;
        guardarDB();
        return true;
    }


}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}