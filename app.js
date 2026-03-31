// Función para ocultar todas las secciones
function ocultarTodo() {
  ["bienvenida", "menuPrincipal", "productos", "loVendido"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
}

// Backend URL
const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbxS0Sx9EVGfrIrbC1xZEn2O7OzgkrNH9CnWPaqNTwabK4u2UNsMRSOjJwkT26haZ5KZXg/exec';

// Función para enviar datos al backend
async function fetchToGAS(data) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('Respuesta del backend:', result);
    if (result.ok) {
      alert(result.mensaje || 'Guardado exitosamente');
    } else {
      alert('Error: ' + result.error);
    }
    return result;
  } catch (error) {
    console.error('Error al enviar datos:', error);
    alert('Error al guardar en el backend. Revisa la consola.');
  }
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

// Variables para lo vendido
let productosVendidos = [];
let contadorVendidos = 0;
let totalVendido = 0;
let totalGanancias = 0;

// Función para agregar un producto a la lista
function agregarProducto(nombre, precio) {
  if (nombre === 'Leche 2L ($15)') {
    // Agregar dos Leche 1L
    for (let i = 0; i < 2; i++) {
      listaCompra.push({ nombre: 'Leche 1L ($7.50)', precio: 7.50 });
      totalCompra += 7.50;
    }
  } else {
    // Para otros productos
    listaCompra.push({ nombre, precio });
    totalCompra += precio;
  }

  // Actualizar la interfaz
  actualizarListaCompra();
}

// Función para limpiar la lista
function limpiarLista() {
  listaCompra = [];
  totalCompra = 0;
  actualizarListaCompra();
}

// Función para eliminar un producto individual
function eliminarProducto(index) {
  if (index >= 0 && index < listaCompra.length) {
    const precioEliminado = listaCompra[index].precio;
    listaCompra.splice(index, 1);
    totalCompra -= precioEliminado;
    actualizarListaCompra();
  }
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
    li.className = 'flex justify-between items-center';
    li.innerHTML = `
      <span>${producto.nombre}</span>
      <div class="flex items-center">
        <span>$${producto.precio.toFixed(2)}</span>
        <button onclick="eliminarProducto(${index})" class="ml-2 text-red-500 hover:text-red-700">✖</button>
      </div>
    `;
    listaElement.appendChild(li);
  });

  // Actualizar el total
  totalElement.textContent = totalCompra.toFixed(2);
}

// Función para guardar (antes cobrar)
function guardar() {
  if (listaCompra.length === 0) {
    alert('La lista de compra está vacía.');
    return;
  }

  // Procesar productos
  listaCompra.forEach(producto => {
    if (producto.nombre === 'Leche 1L ($7.50)') {
      productosVendidos.push(producto);
      totalVendido += producto.precio;
      totalGanancias += 0.225;
    } else {
      // Para otros productos, por ahora solo agregar sin enviar
      productosVendidos.push(producto);
      totalVendido += producto.precio;
      // Sin ganancia por ahora
    }
  });

  // Enviar al backend solo productos de leche
  const productosLeche = listaCompra
    .filter(p => p.nombre === 'Leche 1L ($7.50)')
    .map(p => ({
      id: 100,
      producto: "Leche",
      unidad: "Litro",
      cantidad: 1,
      precioPublico: 7.50,
      costo: 7.2750
    }));

  if (productosLeche.length > 0) {
    fetchToGAS({ action: "guardarVenta", productos: productosLeche });
  }

  contadorVendidos += listaCompra.length;

  // Limpiar lista de compra
  limpiarLista();
  // Actualizar interfaz de vendidos
  actualizarListaVendidos();
  // Ocultar el texto de cambio
  document.getElementById('cambioTexto').classList.add('hidden');
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

// Función para actualizar la lista de vendidos
function actualizarListaVendidos() {
  const listaElement = document.getElementById('listaVendidos');
  const totalElement = document.getElementById('totalVendido');

  // Limpiar la lista actual
  listaElement.innerHTML = '';

  // Agregar cada producto vendido
  productosVendidos.forEach((producto, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between';
    li.innerHTML = `
      <span>${producto.nombre}</span>
      <span>$${producto.precio.toFixed(2)}</span>
    `;
    listaElement.appendChild(li);
  });

  // Actualizar total
  totalElement.textContent = totalVendido.toFixed(2);
}

// Función para mostrar ganancias netas
function mostrarGanancias() {
  alert(`Ganancias netas: $${totalGanancias.toFixed(2)}`);
}
