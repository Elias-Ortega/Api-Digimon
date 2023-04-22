$.ajax({
    type: "get",
    url: "https://digimon-api.vercel.app/api/digimon",
    dataType: "json",
    success: function (response) {
        card(response);
        crearSelect(response);
        mostrarDigimon(response);
    }
});

// LISTAR EN HTML TODOS LOS DIGIMON EN CARDS. 
function card(datos) {
    const filaContainer = document.querySelector('#fila-tarjetas');
    filaContainer.innerHTML = '';
    for (var i = 0; i < datos.length; i = i + 1) {
        const columna = document.createElement('div');
        columna.classList.add('col-md-3', 'col-sm-6'); // para agregar las clases boostrap 
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card', 'text-center', 'digimon-card'); // clase 'digimon-card' a la tarjeta
        tarjeta.setAttribute('data-name', datos[i].name); // Agrega el atributo 'data-name' con el nombre del digimon a la tarjeta

        const imagen = document.createElement("img");
        imagen.src = datos[i].img; // asignación de la imagen desde los datos
        imagen.classList.add('card-img-top');

        const cuerpoTarjeta = document.createElement('div');
        cuerpoTarjeta.classList.add('card-body');

        const nombre = document.createElement('h5');
        nombre.classList.add('card-title');

        nombre.textContent = datos[i].name; // asignación del título desde los datos

        const nivel = document.createElement('p');
        nivel.classList.add('card-text');

        nivel.textContent = datos[i].level; // asignación del párrafo desde los datos

        // Agregar los elementos creados a la tarjeta
        cuerpoTarjeta.appendChild(nombre);
        cuerpoTarjeta.appendChild(nivel);

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(cuerpoTarjeta);

        columna.appendChild(tarjeta);
        filaContainer.appendChild(columna);
    }
}

//Creacion de select
function crearSelect(response) {
    var contenedorSelect = document.querySelector('#contenedor');
    contenedorSelect.innerHTML = '';  // Limpiar el contenido del contenedor antes de agregar el nuevo select
    var selectNombreDigimon = document.createElement('select');
    selectNombreDigimon.classList.add('form-select', 'me-2');
    selectNombreDigimon.setAttribute('aria-label', 'Default select example');
    selectNombreDigimon.setAttribute('id', 'desplegable');

    const defaultOption = document.createElement('option');
    defaultOption.setAttribute('option', 'selected');
    defaultOption.textContent = 'Elige el Digimon para seleccionarlo';

    selectNombreDigimon.appendChild(defaultOption);

    for (var i = 0; i < response.length; i = i + 1) {

        const option = document.createElement('option');
        option.setAttribute('value', response[i].name);
        option.textContent = response[i].name;
        selectNombreDigimon.appendChild(option);

    }
    contenedorSelect.appendChild(selectNombreDigimon);

    selectNombreDigimon.addEventListener('change', mostrarDigimon);

}

//Para mostrar la tarjeta elegida y que se oculten las demas
function mostrarDigimon(event) {
    const digimonSeleccionado = event.target.value; // Obtiene el valor seleccionado del select
    const digimonCards = document.getElementsByClassName('digimon-card'); //   capturo clase de las tarjetas

    // Itera sobre  las tarjetas  y las muestra/oculta según corresponda
    for (var i = 0; i < digimonCards.length; i++) {
        if (digimonCards[i].getAttribute('data-name') === digimonSeleccionado) {
            digimonCards[i].style.display = 'block'; // Muestra la tarjeta si coincide con el digimon 
        } else {
            digimonCards[i].style.display = 'none'; // Oculta cualquier tarjeta que no coincida 
        }
    }
}

