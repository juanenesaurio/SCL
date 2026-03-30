// Función para ocultar todas las secciones
function ocultarTodo() {
  ["bienvenida", "menuPrincipal", "productos"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
}

// Función para ir directo al menú principal (fondo beige)
function irDirectoAMenu() {
  ocultarTodo();
  document.getElementById("menuPrincipal").classList.remove("hidden");
}

// Funciones de navegación
function irAProductos() {
  console.log('Ejecutando irAProductos');
  ocultarTodo();
  document.getElementById("productos").classList.remove("hidden");
  console.log('Sección productos mostrada');
}

function irALoVendido() {
  alert('Ir a Lo vendido (pendiente: implementación de sección).');
}

function volverAMenuPrincipal() {
  ocultarTodo();
  document.getElementById("menuPrincipal").classList.remove("hidden");
}

// Función para filtrar productos
function filtrarProductos() {
  const busqueda = document.getElementById('busquedaProductos').value.toLowerCase();
  const productos = document.querySelectorAll('.producto-item');

  productos.forEach(producto => {
    const texto = producto.textContent.toLowerCase();
    if (texto.includes(busqueda)) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}

// Event listener para la búsqueda
document.addEventListener('DOMContentLoaded', function() {
  const busquedaInput = document.getElementById('busquedaProductos');
  if (busquedaInput) {
    busquedaInput.addEventListener('input', filtrarProductos);
  }
});

// Variables globales para la lista de compras
let listaCompra = [];
let totalCompra = 0;

// Función para agregar un producto a la lista
function agregarProducto(nombre, precio) {
  // Agregar el producto a la lista
  listaCompra.push({ nombre, precio });

  // Actualizar el total
  totalCompra += precio;

  // Actualizar la interfaz
  actualizarListaCompra();
}

// Función para limpiar la lista
function limpiarLista() {
  listaCompra = [];
  totalCompra = 0;
  actualizarListaCompra();
}

// Función para actualizar la lista en la interfaz
function actualizarListaCompra() {
  const listaElement = document.getElementById('listaCompra');
  const totalElement = document.getElementById('totalCompra');

  // Limpiar la lista actual
  listaElement.innerHTML = '';

  // Agregar cada producto
  listaCompra.forEach((producto, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between';
    li.innerHTML = `
      <span>${producto.nombre}</span>
      <span>$${producto.precio.toFixed(2)}</span>
    `;
    listaElement.appendChild(li);
  });

  // Actualizar el total
  totalElement.textContent = totalCompra.toFixed(2);
}

// Función para cobrar
function cobrar() {
  if (listaCompra.length === 0) {
    alert('La lista de compra está vacía.');
    return;
  }
  // Ocultar la lista y mostrar la sección de pago
  document.getElementById('seccionPago').classList.remove('hidden');
}

// Función para procesar el pago
function procesarPago(monto) {
  const cambio = monto - totalCompra;
  const cambioTexto = document.getElementById('cambioTexto');
  if (cambio >= 0) {
    cambioTexto.textContent = `Cambio: $${cambio.toFixed(2)}`;
    cambioTexto.classList.remove('hidden');
    // Opcional: limpiar lista después de cobrar
    // setTimeout(() => {
    //   limpiarLista();
    //   document.getElementById('seccionPago').classList.add('hidden');
    //   cambioTexto.classList.add('hidden');
    // }, 3000);
  } else {
    cambioTexto.textContent = 'Pago insuficiente';
    cambioTexto.classList.remove('hidden');
  }
}
