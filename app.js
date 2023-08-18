let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    puesto: '',
    departamento: '',
    horaLlegada: '',
    horaAlmuerzo: '',
    horaSalida: '',


}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const puestoInput = document.querySelector('#puesto');
const departamentoInput = document.querySelector('#departamento');
const horaLlegadaInput = document.querySelector('#horaLlegada');
const horaAlmuerzoInput = document.querySelector('#horaAlmuerzo');
const horaSalidaInput = document.querySelector('#horaSalida');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreInput.value === '' || puestoInput.value === '' ||
       departamentoInput.value === '' || horaLlegadaInput.value === '' ||
       horaAlmuerzoInput.value === '' || horaSalidaInput.value === '') {
    
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.puesto = puestoInput.value;
        objEmpleado.departamento = departamentoInput.value;
        objEmpleado.horaLlegada = horaLlegadaInput.value;
        objEmpleado.horaAlmuerzo = horaAlmuerzoInput.value;
        objEmpleado.horaSalida = horaSalidaInput.value;


        agregarEmpleado();
    }
}

function agregarEmpleado() {

    listaEmpleados.push({...objEmpleado});

    mostrarEmpleados();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.puesto = '';
}

function mostrarEmpleados() {
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');
    
    listaEmpleados.forEach(empleado => {
        const {id, nombre, puesto, departamento, horaLlegada, horaAlmuerzo, horaSalida} = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${puesto} - ${departamento} - ${horaLlegada} - ${horaAlmuerzo} - ${horaSalida}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) {
    const {id, nombre, puesto, departamento, horaLlegada, horaAlmuerzo, horaSalida} = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;
    departamentoInput.value = departamento;
    horaLlegadaInput.value = horaLlegada;
    horaAlmuerzoInput.value = horaAlmuerzo;
    horaSalidaInput.value = horaSalida;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEmpleado() {

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.puesto = puestoInput.value;
    objEmpleado.departamento = departamentoInput.value;
    objEmpleado.horaLlegada = horaLlegadaInput.value;
    objEmpleado.horaAlmuerzo = horaAlmuerzoInput.value;
    objEmpleado.horaSalida = horaSalidaInput.value;

    listaEmpleados.map(empleado => {

        if(empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.puesto = objEmpleado.puesto;
            empleado.departamento = objEmpleado.departamento;
            empleado.horaLlegada = objEmpleado.horaLlegada;
            empleado.horaAlmuerzo = objEmpleado.horaAlmuerzo;
            empleado.horaSalida = objEmpleado.horaSalida;

        }

    });

    limpiarHTML();
    mostrarEmpleados();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEmpleado(id) {

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);

    limpiarHTML();
    mostrarEmpleados();
}

function limpiarHTML() {
    const divEmpleados = document.querySelector('.div-empleados');
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}