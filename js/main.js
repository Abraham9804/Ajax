const btnCargar = document.querySelector('#btn_cargar_usuarios')
const loader = document.querySelector('.loader')
const tabla = document.querySelector('#tabla')
const formulario = document.querySelector('#formulario')

//definicion de constantes para envio por POST
let usrNombre, usrEdad, usrPais, usrCorreo



formulario.addEventListener('submit', function(e){
    agregarUsuarios(e)
})


function agregarUsuarios(e){
    e.preventDefault()
    const peticion = new XMLHttpRequest()
    peticion.open('POST', 'php/addUser.php')
    
    //Captura de informacion del formulario
    usrNombre = document.querySelector('#nombre').value.trim()
    usrEdad = parseInt(document.querySelector('#edad').value.trim())
    usrPais = document.querySelector('#pais').value.trim()
    usrCorreo = document.querySelector('#correo').value.trim()

    if(formularioValido()){
        //Definicio de datos a enviar por POST
        const parametros = 'nombre='+ usrNombre + '&edad=' + usrEdad + '&pais=' + usrPais + '&correo=' + usrCorreo
        peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        loader.classList.add('active')
        //Funcion al cargar la peticion ajax
        peticion.onload = function(){
            cargarUsuarios()
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




function cargarUsuarios(){
    const peticion = new XMLHttpRequest()
    peticion.open('GET','php/usuarios.php')
    peticion.send()
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
                    <td>${persona.pais}</td>
                    <td>${persona.edad}</td>
                    <td>${persona.correo}</td>
                    <td><button id="${persona.id}" class="btnEdit"><i class="fa-solid fa-pen-to-square" style="font-size:25px; color: black; background: #F4D03F"></i></button>
                    <button id="${persona.id}" class="btnDelete"><i class="fa-solid fa-user-minus" style="font-size:20px; color: white; background: #943126"></i></button></td>`
                tabla.appendChild(row)
            })
            const btnEdit = document.querySelectorAll('.btnEdit')
            const btnDelete = document.querySelectorAll('.btnDelete')

            btnEdit.forEach(boton =>{
                boton.addEventListener('click', function(){
                    const id = this.id 
                    console.log(id)
                })
            })

            btnDelete.forEach(boton => {
                boton.addEventListener('click', function(){
                    const id = this.id
                    const peticion = new XMLHttpRequest()
                    peticion.open('POST','php/deleteUser.php')
                    const parametros = "id=" +id
                    peticion.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    peticion.onload = function(){
                        cargarUsuarios()
                    }
                    peticion.send(parametros)
                })
            })
        }
    }

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

