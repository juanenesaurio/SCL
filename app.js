// Función para ocultar todas las secciones
function ocultarTodo() {
  ["bienvenida", "menuPrincipal"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
}

// Función para ir directo al menú principal (fondo beige)
function irDirectoAMenu() {
  ocultarTodo();
  document.getElementById("menuPrincipal").classList.remove("hidden");
}

// Funciones de navegación futura
function irAProductos() {
  alert('Ir a Productos (pendiente: implementación de sección).');
}

function irALoVendido() {
  alert('Ir a Lo vendido (pendiente: implementación de sección).');
}
