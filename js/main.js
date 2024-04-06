const btnCargar = document.querySelector('#btn_cargar_usuarios')
const loader = document.querySelector('.loader')
const tabla = document.querySelector('#tabla')
const formulario = document.querySelector('#formulario')

//definicion de constantes de envio por POST para crear registros
let usrNombre, usrEdad, usrPais, usrCorreo


//Evento para agregar usuario
formulario.addEventListener('submit', function(e){
    agregarUsuarios(e)
})


//Funcion para crear nuevo usuario
function agregarUsuarios(e){
    e.preventDefault()
    const peticion = new XMLHttpRequest()
    peticion.open('POST', 'php/addUser.php')
    
    //Captura de informacion del formulario
    usrNombre = document.querySelector('#nombre').value.trim()
    usrEdad = parseInt(document.querySelector('#edad').value.trim())
    usrPais = document.querySelector('#pais').value.trim()
    usrCorreo = document.querySelector('#correo').value.trim()

    //verificacion de campos vacios
    if(formularioValido()){
        //Definicio de datos a enviar por POST
        const parametros = 'nombre='+ usrNombre + '&edad=' + usrEdad + '&pais=' + usrPais + '&correo=' + usrCorreo
        peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        loader.classList.add('active')

        //Funcion al cargar la peticion ajax
        peticion.onload = function(){
            cargarUsuarios()
            //Se reinician los inputs del formulario
            document.querySelector('#nombre').value = ''
            document.querySelector('#edad').value = ''
            document.querySelector('#pais').value = ''
            document.querySelector('#correo').value = ''
            const respuesta = JSON.parse(peticion.responseText)
            if(respuesta.error){
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Los datos no se guardaron",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#943126"
                  });
            }else {
                Swal.fire({
                    icon: "success",
                    title: "Agregado",
                    text: "Los datos se guardaron correctamente",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#1D8348"
                  });
            }
        }
        peticion.send(parametros)
    }else{
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Complete todos los campos",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#943126"
          });
    }
}


//Funcion que comprueba que no haya campos vacios
function formularioValido(){    
    if(usrNombre == ''){
        return false
    }else if(isNaN(usrEdad)){
        return false 
    }else if(usrPais == ''){
        return false
    }else if(usrCorreo == ''){
        return false
    }
    return true
    
}


//Evento para cargar tabla de usuarios
btnCargar.addEventListener('click', function(){
    cargarUsuarios()
})


//funcion para cargar usuarios
function cargarUsuarios(){
    const peticion = new XMLHttpRequest()
    peticion.open('GET','php/usuarios.php')
    peticion.onload = function(){
        const datos = JSON.parse(peticion.responseText)
        if(datos.error){
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Los datos no se pudieron recuperar",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#943126"
              });
        }else{
            datos.forEach(persona => {
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td>${persona.id}</td>
                    <td>${persona.nombre}</td>
                    <td>${persona.edad}</td>
                    <td>${persona.pais}</td>
                    <td>${persona.correo}</td>
                    <td><button id="${persona.id}" class="btnEdit btn"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button id="${persona.id}" class="btnDelete btn"><i class="fa-solid fa-user-minus" ></i></button></td>`
                tabla.appendChild(row)
            })
            const btnEdit = document.querySelectorAll('.btnEdit')
            const btnDelete = document.querySelectorAll('.btnDelete')

            btnEdit.forEach(boton =>{
                boton.addEventListener('click', editarUsuario)
            })

            //Evento para eliminar usuario
            btnDelete.forEach(boton => {
                boton.addEventListener('click', eliminarUsuario)
            })
        }
    }
    peticion.send()
    loader.classList.add('active')

    peticion.onreadystatechange = function(){
        if(peticion.readyState == 4 && peticion.status == 200){
            loader.classList.remove('active')
        }
    }


    tabla.innerHTML = '<tr>'+
                        '<th>ID</th>'+
                        '<th>Nombre</th>'+
                        '<th>Edad</th>'+
                        '<th>Pais</th>'+
                        '<th>Correo</th>'+
                        '<th></th>'+
                    '</tr>'
}


//Funcion para editar usuario
function editarUsuario(e){
    const fila = e.target.closest('tr')
    const id = this.id 
    const nombre = fila.cells[1].innerText
    const edad = fila.cells[2].innerText
    const pais = fila.cells[3].innerText
    const correo = fila.cells[4].innerText
    console.log(id, nombre, edad, pais, correo)

    Swal.fire({
        html: `<form class="formulario">
                    <input id="txtNombre" type="text" value="${nombre}">
                    <input id="txtEdad" type="number" value="${edad}">
                    <input id="txtPais" type="text" value="${pais}">
                    <input id="txtCorreo" type="email" value="${correo}">
            	</form>`,
        width: 1000,
        title: "Editar usuario",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar cambios",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            const txtNombre = document.querySelector("#txtNombre").value 
            const txtEdad = document.querySelector("#txtEdad").value
            const txtPais = document.querySelector("#txtPais").value
            const txtCorreo = document.querySelector("#txtCorreo").value
            if(!txtNombre || !txtEdad || !txtPais || !txtCorreo){
                    Swal.fire({
                        title: "Error!",
                        text: "Complete todos los campos",
                        icon: "error"
                    });
            
            } else{
                const peticion = new XMLHttpRequest()
                peticion.open('POST', 'php/editUser.php')
                const parametros = "id="+id+"&nombre="+txtNombre+"&edad="+txtEdad+"&pais="+txtPais+"&correo="+txtCorreo
                peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                peticion.onload = function(){
                    if(peticion.status >= 200 && peticion.status <400){
                        const respuesta = JSON.parse(peticion.responseText)
                        if(respuesta){
                            console.log(id,txtNombre, txtEdad, txtPais, txtCorreo)
                            Swal.fire({
                            title: "Actualizado",
                            text: "El registro fue actualizado",
                            icon: "success"
                        });
                        
                            cargarUsuarios()
                        
                        }else{
                            console.log(id,txtNombre, txtEdad, txtPais, txtCorreo)
                            Swal.fire({
                            title: "Error!",
                            text: "El registro no se pudo actualizar.",
                            icon: "error"
                        });
                        }
                    }else{
                        Swal.fire({
                            title: "Error!",
                            text: "Error generar, contacte a sistemas.",
                            icon: "error"
                        });
                    }

                    
                }
                peticion.send(parametros)
                }
            }
      });

}




//Funcion para eliminar registros
function eliminarUsuario(){
        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Los cambios no se podran revertir!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, eliminar!"
          }).then((result) => {
            if (result.isConfirmed) {
                const id = this.id
                const peticion = new XMLHttpRequest()
                peticion.open('POST','php/deleteUser.php')
                const parametros = "id=" +id
                peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

                peticion.onload = function(){
                    if(peticion.status >= 200 && peticion.status < 400){
                        const respuesta = JSON.parse(peticion.responseText)
                        if(respuesta.response){
                            Swal.fire({
                                title: "Eliminado!",
                                text: "El registro fue eliminado",
                                icon: "success",
                                confirmButtonColor: "#3085d6",
                                confirmButtonText: "Aceptar"
                              }).then((result) => {
                                if(result.isConfirmed){
                                    cargarUsuarios()
                                }
                              })
                        }else{
                            Swal.fire({
                                title: "Error",
                                text: "Ocurrio un error al intentar eliminar la informacion",
                                icon: "error",

                              });
                        }

                    }else{
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un error general",
                            icon: "error",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Aceptar"
                          });
                    }
                }
                peticion.send(parametros) 
            }
        });
    }