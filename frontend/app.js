document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "http://localhost:3000/api/eventos";
    const form = document.getElementById("formEvento");
    const eventosTable = document.getElementById("eventosTable").getElementsByTagName("tbody")[0];
  
    let editando = false; // Bandera para editar
    let eventoEditadoId = null; // ID del evento en edición
  
    const obtenerEventos = async () => {
      const response = await fetch(API_URL);
      const eventos = await response.json();
      eventosTable.innerHTML = "";
  
      eventos.forEach(evento => {
        const row = eventosTable.insertRow();
        row.innerHTML = `
          <td>${evento.nombre}</td>
          <td>${new Date(evento.fecha).toLocaleDateString()}</td>
          <td>${evento.ubicacion}</td>
          <td>${evento.organizador}</td>
          <td>
            <button class="btn-editar" data-id="${evento._id}">Editar</button>
            <button class="btn-eliminar" data-id="${evento._id}">Eliminar</button>
          </td>
        `;
      });
  
      // Asociar eventos a los botones de eliminar y editar
      document.querySelectorAll(".btn-editar").forEach(button => {
        button.addEventListener("click", () => editarEvento(button.dataset.id));
      });
  
      document.querySelectorAll(".btn-eliminar").forEach(button => {
        button.addEventListener("click", () => eliminarEvento(button.dataset.id));
      });
    };
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const nuevoEvento = {
        nombre: document.getElementById("nombre").value,
        fecha: document.getElementById("fecha").value,
        ubicacion: document.getElementById("ubicacion").value,
        organizador: document.getElementById("organizador").value,
      };
  
      if (editando) {
        const response = await fetch(`${API_URL}/${eventoEditadoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoEvento),
        });
  
        if (response.ok) {
          alert("Evento actualizado exitosamente");
          obtenerEventos();
          resetFormulario();
        } else {
          alert("Error al actualizar el evento");
        }
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoEvento),
        });
  
        if (response.ok) {
          alert("Evento creado exitosamente");
          obtenerEventos();
          resetFormulario();
        } else {
          alert("Error al crear el evento");
        }
      }
    });
  
    const eliminarEvento = async (id) => {
      const confirmar = confirm("¿Está seguro de que desea eliminar este evento?");
      if (!confirmar) return;
  
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  
      if (response.ok) {
        alert("Evento eliminado");
        obtenerEventos();
      } else {
        alert("Error al eliminar el evento");
      }
    };
  
    const editarEvento = async (id) => {
      const response = await fetch(`${API_URL}/${id}`);
      const evento = await response.json();
  
      document.getElementById("nombre").value = evento.nombre;
      document.getElementById("fecha").value = evento.fecha.split("T")[0];
      document.getElementById("ubicacion").value = evento.ubicacion;
      document.getElementById("organizador").value = evento.organizador;
  
      editando = true;
      eventoEditadoId = id;
      form.querySelector("button[type='submit']").textContent = "Actualizar Evento";
    };
  
    const resetFormulario = () => {
      form.reset();
      editando = false;
      eventoEditadoId = null;
      form.querySelector("button[type='submit']").textContent = "Crear Evento";
    };
  
    obtenerEventos();
  });
  