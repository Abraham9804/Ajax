const btnCargar = document.querySelector('#btn_cargar_usuarios')
const errorBox = document.querySelector('#error_box')
const loader = document.querySelector('.loader')
const tabla = document.querySelector('#tabla')

let usrNombre
let usrEdad
let usrPais
let usrCorreo

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