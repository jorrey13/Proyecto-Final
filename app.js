const listaTodas = document.getElementById("lista-All");
const listaActivas = document.getElementById("lista-Active");
const listaTerminadas = document.getElementById("lista-Completed");
const options = document.querySelectorAll(".list-option");
const divListas = document.querySelectorAll(".contenedor-lista");

options.forEach((op, index) => {
    op.addEventListener('click', ()=> {
        options.forEach((option) => option.classList.remove("active"));

        divListas.forEach((divListas) => divListas.classList.remove("active"));
        //Agrego la clase active a la opcion que le hice click
        op.classList.toggle("active");
        //agrego la clase active al div que corresponde la opcion
        divListas[index].classList.toggle("active");
        // console.log(divListas);
        console.log(index);
        // console.log(op);
        if(index===2){
          const menu = document.querySelector('.contenedor-boton');
          menu.classList.toggle("ver_ocultar");
        }else{
          const menu = document.querySelector('.contenedor-boton');
          menu.classList.remove("ver_ocultar");
        }
    });
})

document.getElementById('formTask').addEventListener('submit', saveTask);
getTasks();
function saveTask(e) {
  let work = document.getElementById('work').value;
  let estado = "Activo"
  console.log(estado)

  let tarea = {
    work,
    estado
  };

  if(localStorage.getItem('TareasLS') === null) {
    let TAREAS = [];
    TAREAS.push(tarea);
    localStorage.setItem('TareasLS', JSON.stringify(TAREAS));
  } else {
    console.log("Aqui estoy")
    let TAREAS = JSON.parse(localStorage.getItem('TareasLS'));
    TAREAS.push(tarea);
    localStorage.setItem('TareasLS', JSON.stringify(TAREAS));
  }

  document.getElementById('lista-All').reset();
  e.preventDefault();
}

function getTasks() {
  let tareas = JSON.parse(localStorage.getItem('TareasLS'));
  if (tareas === null){
    console.log("No hay tareas");
  }
  let tareasView = document.getElementById('lista-All');
  let tareasViewActive = document.getElementById('lista-Active'); 
  let tareasViewInactiva = document.getElementById('lista-Completed');
  let tareasViewBoton = document.getElementById('boton-eliminar');
  tareasView.innerHTML = '';
  tareasViewActive.innerHTML = '';
  tareasViewInactiva.innerHTML = '';
  tareas.forEach(function(element, index){
    if(tareas[index].estado === "Activo"){
      console.log("IMHERE")
      let tareaMostrar = tareas[index].work
      tareasView.innerHTML += `<div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="RadioTarea" onclick="completeTask('${index}')">
      <li id="nombre_tarea" class="li-mostrar-sin-cheek">${tareaMostrar}</li>
      </div>`
      tareasViewActive.innerHTML += `<div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="RadioTarea" onclick="completeTask('${index}')">
      <li id="nombre_tarea" class="li-mostrar-sin-cheek">${tareaMostrar}</li>
      </div>` 
    }if(tareas[index].estado === "Inactivo"){
      let tareaMostrar = tareas[index].work;
      let indice = tareas[index].index;
      tareasView.innerHTML += `<div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="RadioTarea" checked onclick="completeTask('${index}')">
      <li id="nombre_tarea" class="li-mostrar-con-cheek">${tareaMostrar}</li>
      </div>`
      tareasViewInactiva.innerHTML += `<div class="form-check" id="div-delete">
      <input class="form-check-input" type="checkbox" value="" id="RadioTarea" checked>
      <li id="nombre_tarea" class="li-mostrar-con-cheek">${tareaMostrar}</li>
      <i class="fa-regular fa-trash-can" style="padding-left:320px;position:fixed" onclick="deleteTask('${tareaMostrar}')"></i>
      </div>`
      tareasViewBoton.innerHTML = `<button type="button" style="width: 150px;" class="btn btn-danger" onclick="DeleteAll('${index}')"><i class="fa-thin fa-trash-can" style="padding-right:10px;"></i>Delete All</button>`
    }  
  })

}

function completeTask(index) {
  // console.log(tareaMostrar);
  // console.log(index);
  var checkbox = document.getElementById('RadioTarea');
  checkbox.addEventListener( 'change', function() {
    if(this.checked) {
       alert('checkbox esta seleccionado');
    }
  });
  // console.log("ESTOY MODIFICANDO," + tareaMostrar)
  // let Tareas = JSON.parse(localStorage.getItem('TareasLS'));
  // for(let i = 0; i < Tareas.length; i++) {
  //   console.log("ENTRE AL FOR")
  //   if(Tareas[i].work == tareaMostrar) {
  //     console.log("ENTRE AL IF")
  //     // Tareas.splice(i, 0, tareaMostrar, 'Inactivo');
  //     tareaMostrar.preventDefault();
  //   }
  // }
  // console.log("Aqui estoy saliendo")
  // localStorage.setItem('TareasLS', JSON.stringify(Tareas));
  // getTasks();
  // let estado = "Activo"
  // console.log(estado)

  // let tarea = {
  //   work,
  //   estado
  // };
  let TAREAS;

  if(localStorage.getItem('TareasLS') === null) {
    TAREAS = [];
  } else {
    console.log("Aqui estoy")
    TAREAS = JSON.parse(localStorage.getItem('TareasLS'));
  }
  TAREAS[index].estado = "Inactivo";
  localStorage.setItem('TareasLS', JSON.stringify(TAREAS));
  console.log(TAREAS);
  getTasks();
  
  // location.reload();
  

}

function deleteTask(tareaMostrar) {
  console.log(tareaMostrar);
  console.log("ESTOY ELIMINANDO," + tareaMostrar)
  let Tareas = JSON.parse(localStorage.getItem('TareasLS'));
  for(let i = 0; i < Tareas.length; i++) {
    if(Tareas[i].work == tareaMostrar) {
      Tareas.splice(i, 1);
    }
  }
  localStorage.setItem('TareasLS', JSON.stringify(Tareas));
  getTasks();
}

function DeleteAll(){
  // alert("Vas a eliminar");
  console.log("ESTOY ELIMINANDO,")
  let Tareas = JSON.parse(localStorage.getItem('TareasLS'));
  let filtrado = Tareas.filter(elemento => elemento.estado === 'Inactivo');
  Tareas.forEach(function(element, index){
    if(Tareas[index].estado === "Inactivo"){
      Tareas.splice(index, filtrado.length);
      localStorage.setItem('TareasLS', JSON.stringify(Tareas));
    }
  })
  getTasks();
  location.reload();

}

getTasks();

// function completeTask(tarea) {
//   let tareaModificada = {
//       work: tarea,
//       estado: "Inactivo"
//     }
//   Tareas.splice(tarea, 1, tareaModificada);
//   // console.log(tarea);
//   // let newEstado = "Inactivo";
//   // Tareas[tarea]  = newEstado;
//   console.log(tarea);
//   addTask();
// }