//const argv = require('yargs').argv;
//const argv = require('./config/yargs').argv;
const { argv } = require('./config/yargs');
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors')


//console.log(argv);

let comando = argv._[0];


switch (comando) {


    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        break;
    case 'listar':
        let listado = porHacer.getListado();
        for (let tarea of listado) { //iterar sobre lista
            console.log('====Por Hacer ===='.red);
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado);
            console.log('=================='.red);
        }

        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        break;
    default:
        console.log('comando no reconocido');
}