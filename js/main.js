const btnCargar = document.querySelector('#btn_cargar_usuarios')
const errorBox = document.querySelector('#error_box')
const loader = document.querySelector('.loader')
const tabla = document.querySelector('#tabla')
const formulario = document.querySelector('#formulario')



formulario.addEventListener('submit', function(e){
    agregarUsuarios(e)
})

function agregarUsuarios(e){
    e.preventDefault()
    
    const usrNombre = document.querySelector('#nombre').value.trim()
    const usrEdad = parseInt(document.querySelector('#edad').value.trim())
    const usrPais = document.querySelector('#pais').value.trim()
    const usrCorreo = document.querySelector('#correo').value.trim()
    console.log(usrNombre, usrEdad, usrPais, usrCorreo)

    formularioValido()
}

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
    console.log(true)
    return true
    
}











btnCargar.addEventListener('click', function(){
    cargarUsuarios()
})




function cargarUsuarios(){
    const peticion = new XMLHttpRequest()
    peticion.open('GET','php/usuarios.php')
    peticion.send()
    peticion.onload = function(){
        const datos = JSON.parse(peticion.responseText)
        console.log(datos)
        if(datos.error){
            errorBox.classList.add('active')
        }else{
            datos.forEach(persona => {
                const row = document.createElement('tr')
                row.innerHTML = `
                    <td>${persona.nombre}</td>
                    <td>${persona.pais}</td>
                    <td>${persona.edad}</td>
                    <td>${persona.correo}</td>
                    `
                console.log(row)
                tabla.appendChild(row)
            });
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
                    '</tr>'
}