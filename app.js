// Función para ocultar todas las secciones
function ocultarTodo() {
  ["bienvenida"].forEach(id =>
    document.getElementById(id).classList.add("hidden")
  );
}

// Función para ir directo al menú (lienzo en blanco)
function irDirectoAMenu() {
  ocultarTodo();
}
