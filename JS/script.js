import {data} from '../data/data.js';
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const items = document.getElementById('items');
const detail = document.getElementById('detail');
const listaCompra = document.getElementById('listaCompra');
const listaTotal = document.getElementById('listaTotal');
let pelicula = { };
let carrito = [];


document.addEventListener('DOMContentLoaded', () => {
     loadImage(data);
})


const loadImage = data => {

   data.forEach(pelicula => {
       const {id,titulo,image} = pelicula;
       templateCard.querySelector('h5').textContent = titulo;
       templateCard.querySelector('img').setAttribute('src',image);
       templateCard.querySelector('img').dataset.id = id;
       const clone = templateCard.cloneNode(true);
       fragment.appendChild(clone)
   } )

   items.appendChild(fragment);
}


form.addEventListener('submit',function LocalStorage(){
    let inputName = document.querySelector('#inputName').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value
    let message = document.querySelector('#msm').value;
    if(inputName=="" || email=="" || gender=="" || message==""){
         alert('Ingresar todos los campos');
         return true;
    }
    else{
        if(isNaN(inputName)){
            localStorage.setItem("Name", inputName);
            localStorage.setItem("Email", email);
            localStorage.setItem("Gender", gender);
            localStorage.setItem("Message", message);
            getLocalStorage();
        }else{
             alert("Name most string");
        }
        return false;
    }

    
})
function getLocalStorage(){
    let nameSave = localStorage.getItem("Name");
    let emailSave = localStorage.getItem("Email");
    let genderSave = localStorage.getItem("Gender");
    let messageSave = localStorage.getItem("Message");
    alert(`The information stored is: ${nameSave} 
    ${emailSave}
    ${genderSave}
    ${messageSave}`);
}
items.addEventListener('click', e => {
   let idTarget = e.target.dataset.id;
      data.forEach(pelicula => {
       const {id,name,titulo,productora,director,calificacion,image,precio} = pelicula;
       if(id == idTarget){
           const objeto = {
               id: id,
               name: name,
               titulo: titulo,
               productora: productora,
               director: director,
               calificacion: calificacion,
               image: image,
               precio: precio,
           }
           localStorage.setItem("pelicula",JSON.stringify(objeto));
           getPelicula();
           carrito.push(objeto);
           localStorage.setItem('Carrito',JSON.stringify(carrito));
           listarCarrito();
       }   
   })
   e.stopPropagation();
   e.preventDefault();
})


function getPelicula(){
    detail.innerHTML = '';
    pelicula = JSON.parse(localStorage.getItem("pelicula")); 
    const {titulo,productora,director,calificacion,image,precio} = pelicula;
    detail.innerHTML = `
    <table border="2px" align="center">
    <tr>
        <td rowspan="3"><img src="${image}"  width="400" height="500"></td>
        <td align="center">
         <h2>${titulo}</h2>
         <h4>${productora}</h4>
         <h5>${director}</h5>
         <h5>${calificacion}</h5>
         <h5>${precio}</h5>
        </td>
    </tr>
</table>
    `
}


const listarCarrito = () => {
    listaCompra.innerHTML = '';
    let total = 0;
    let totalInt = 0;
    carrito = JSON.parse(localStorage.getItem('Carrito'));
    carrito === null ? ( carrito = []) : (
        carrito.forEach(element => {
            totalInt += element.precio;
            listaCompra.innerHTML += 
            `<br> <br>
         <div width="100" height="100" align="center">
         <span>${element.titulo}</span>
         <span>${element.precio}</span>
         <span><button id="${element.id}">x</button></span><br>
         </div>`
         total = totalInt;
        })
    )
    getTotal(total);
}

function getTotal(total){
    listaTotal.innerHTML = '';
    listaTotal.innerHTML = `<h1 align="center">Total a pagar ${total}</h1>`
    localStorage.setItem('Total',total)
}

listaCompra.addEventListener('click', (e) =>{
    e.preventDefault();

   if(e.target.innerHTML == 'x'){
        let id = e.target.id;
        deleteHeroe(id);
   }

})


function deleteHeroe(idI){
    let indexArreglo;

    carrito.forEach((elemento,index) =>{
        if(elemento.id==idI)
        indexArreglo = index;
    })
    
    carrito.splice(indexArreglo,1);
    localStorage.setItem('Carrito',JSON.stringify(carrito));
    listarCarrito();
}





