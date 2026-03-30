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
