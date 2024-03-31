const btnCargar = document.querySelector('#btn_cargar_usuarios')
const errorBox = document.querySelector('#error_box')
const loader = document.querySelector('.loader')
const tabla = document.querySelector('#tabla')

let usrNombre
let usrEdad
let usrPais
let usrCorreo

btnCargar.addEventListener('click', function(){
    const peticion = new XMLHttpRequest()   //creamos una peticion
    peticion.open('GET', 'php/usuarios.php')   //la peticion recibira datos desde json
    peticion.send()
    peticion.onload = function(){
       
        const datos = JSON.parse(peticion.responseText) //se reciben los datos como una cadena y se convierten a un objeto de JS con JSON.parse (array de obj)
        console.log(datos)
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

    loader.classList.add('active')

    peticion.onreadystatechange = function(){
        if(peticion.readyState == 4 && peticion.status == 200){ //4 significa que devolvio datos y status http 200 significa ok
            loader.classList.remove('active')
            console.log(peticion.readyState, peticion.status)
        }
    }
   
})