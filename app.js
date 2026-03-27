// Función para ocultar todas las secciones
function ocultarTodo() {
  ["bienvenida", "productos"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
}

// Función para ir directo al menú de productos
function irDirectoAMenu() {
  ocultarTodo();
  document.getElementById("productos").classList.remove("hidden");
}
