let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

class Curso {
    constructor(nombre, profesor) {
        this.nombre = nombre;
        this.profesor = profesor;
        this.estudiantes = [];
    }

    agregarEstudiante(estudiante) {
        this.estudiantes.push(estudiante);
    }

    listarEstudiantes() {
        return this.estudiantes.map(est => `${est.nombre} (${est.edad} años) - Nota: ${est.nota}`);
    }
}

class Estudiante {
    constructor(nombre, edad, nota, curso) {
        this.nombre = nombre;
        this.edad = edad;
        this.nota = nota;
        this.curso = curso;
    }
}

function guardarEnLocalStorage() {
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function limpiarFormulario(formulario) {
    formulario.reset();
}

// Función para agregar curso
document.getElementById('agregar-curso').addEventListener('click', function() {
    const nombreCurso = document.getElementById('nombre-curso').value;
    const profesorCurso = document.getElementById('profesor-curso').value;

    if (nombreCurso && profesorCurso) {
        let nuevoCurso = new Curso(nombreCurso, profesorCurso);
        cursos.push(nuevoCurso);
        guardarEnLocalStorage();
        alert(`Curso "${nombreCurso}" agregado.`);
        limpiarFormulario(document.querySelector('.formulario-curso'));
    } else {
        alert('Por favor, complete todos los campos del curso.');
    }
});

// Función para agregar estudiante
document.getElementById('agregar-estudiante').addEventListener('click', function() {
    const nombreEstudiante = document.getElementById('nombre-estudiante').value;
    const edadEstudiante = document.getElementById('edad-estudiante').value;
    const notaEstudiante = document.getElementById('nota-estudiante').value;
    const cursoEstudiante = parseInt(document.getElementById('curso-estudiante').value, 10);

    if (nombreEstudiante && edadEstudiante && notaEstudiante && !isNaN(cursoEstudiante)) {
        let curso = cursos[cursoEstudiante - 1]; 
        if (curso) {
            let nuevoEstudiante = new Estudiante(nombreEstudiante, edadEstudiante, notaEstudiante, cursoEstudiante);
            curso.agregarEstudiante(nuevoEstudiante);
            guardarEnLocalStorage();
            alert(`Estudiante "${nombreEstudiante}" agregado al curso "${curso.nombre}".`);
            limpiarFormulario(document.querySelector('.formulario-estudiante'));

            mostrarEstudiantes(); // Mostrar estudiantes inmediatamente para verificar
        } else {
            alert('El curso seleccionado no existe.');
        }
    } else {
        alert('Por favor, complete todos los campos del estudiante.');
    }
});
// Función para resetear los datos
document.getElementById('reset-datos').addEventListener('click', function() {
    if (confirm("¿Estás seguro de que quieres resetear todos los datos? Esta acción no se puede deshacer.")) {
        localStorage.clear();  // Borra todos los datos de localStorage
        cursos = [];  // Resetea la lista de cursos en la aplicación
        document.getElementById('lista-estudiantes').innerHTML = '';  // Limpia la lista de estudiantes mostrada
        alert("Los datos han sido reseteados.");
        location.reload();  // Recarga la página para aplicar los cambios
    }
});


// Función para mostrar estudiantes en cada curso
function mostrarEstudiantes() {
    const listaEstudiantes = document.getElementById('lista-estudiantes');
    listaEstudiantes.innerHTML = ''; 

    cursos.forEach((curso, index) => {
        let listaCurso = `<h3>Curso: ${curso.nombre} (Profesor: ${curso.profesor})</h3>`;
        if (curso.estudiantes.length > 0) {
            listaCurso += '<ul>';
            curso.estudiantes.forEach(estudiante => {
                listaCurso += `<li>${estudiante.nombre} (${estudiante.edad} años) - Nota: ${estudiante.nota}</li>`;
            });
            listaCurso += '</ul>';
        } else {
            listaCurso += '<p>No hay estudiantes en este curso.</p>';
        }
        listaEstudiantes.innerHTML += listaCurso;
    });
}

document.getElementById('mostrar-estudiantes').addEventListener('click', mostrarEstudiantes);
