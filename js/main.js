// elementos html
const listaDeuda = document.getElementById("lista-deuda");
const htmlArrayDeuda = document.getElementById("html-array-deuda");
const botonAgregarDeuda = document.getElementById("boton-agregar-deuda");
const botonVerDeudas = document.getElementById("boton-ver-deudas");
const botonGuardarDeudas = document.getElementById("boton-guardar-deudas");
const botonImportarDeudas = document.getElementById("boton-importar-deudas");
const botonGuardarDeudasTxt = document.getElementById(
  "boton-guardar-deudas-txt"
);
const botonImportarDeudasTxt = document.getElementById(
  "boton-importar-deudas-txt"
);
const botonBorrarDeudas = document.getElementById("boton-borrar-deudas");
const botonEsconderDeudas = document.getElementById("boton-esconder-deudas");
const botonPasarDolar = document.getElementById("boton-pasar-dolar");
const botonPasarEuro = document.getElementById("boton-pasar-euro");
let compraDolar
let ventaDolar
let compraEuro
let ventaEuro

// FETCH
fetch('monedas.json')
  .then((response) => response.json())
  .then((data) => {
    compraDolar = data[0].compra;
    ventaDolar = data[0].venta;
    compraEuro = data[1].compra;
    ventaEuro = data[1].venta;
    botonPasarDolar.addEventListener("click", pasarDolar);
    botonPasarEuro.addEventListener("click", pasarEuro);
  })
    // Puedes utilizar las variables compraDolar, ventaDolar, compraEuro y ventaEuro aquí según tus necesidades.
  

let contadorDeudas = 0;
let arrayDeudas = [];

//Eventos
botonAgregarDeuda.addEventListener("click", agregarDeuda);
botonVerDeudas.addEventListener("click", verDeudas);
botonGuardarDeudas.addEventListener("click", guardarDeudas);
botonImportarDeudas.addEventListener("click", importarDeudas);
botonImportarDeudasTxt.addEventListener("click", importarDeudasTxt);

botonBorrarDeudas.addEventListener("click", function () {
  arrayDeudas = [];
  htmlArrayDeuda.innerHTML = "";
});
botonGuardarDeudasTxt.addEventListener("click", function () {
  guardarDeudasTxt(arrayDeudas, "Deudas");
});
botonEsconderDeudas.addEventListener("click", function () {
  htmlArrayDeuda.innerHTML = "";
});

//FUNCIONES

function verDeudas() {
  htmlArrayDeuda.innerHTML = "";
  console.log(arrayDeudas);
  const cantidadElementosDeuda = arrayDeudas.length;
  console.log(cantidadElementosDeuda);
  const elementoDeuda = document.createElement("div");

  for (let i = 0; i < cantidadElementosDeuda; i++) {
    const elementoDeuda = document.createElement("div");
    elementoDeuda.innerHTML = `
<div id='div-deuda'>
<h3>Deuda número:${i + 1}</h3>
<p> Nombre: ${arrayDeudas[i].nombre} </p>
<p> Monto: $${arrayDeudas[i].cantidad.toFixed(2)} </p>
<p> Interes: ${arrayDeudas[i].interes}% </p>
<p> Plazo: ${arrayDeudas[i].plazo} meses </p>
<p> Precio por cuota: $${((arrayDeudas[i].cantidad*(1+(arrayDeudas[i].interes/100)))/arrayDeudas[i].plazo).toFixed(2)}
<p> Monto final con interes: $${(arrayDeudas[i].cantidad*(1+(arrayDeudas[i].interes/100))).toFixed(2)}
</div>
`;
    console.log(elementoDeuda);
    htmlArrayDeuda.appendChild(elementoDeuda);
  }
}

function agregarDeuda() {
  listaDeuda.innerHTML = "";
  // tomo datos
  const nombreDeuda = document.getElementById("nombre-deuda").value;
  const montoDeuda = parseFloat(document.getElementById("monto-deuda").value);
  const tasaInteres = parseFloat(document.getElementById("tasa-interes").value);
  const plazoMeses = parseInt(document.getElementById("plazo-meses").value);
  // creo un objeto con los datos
  const deuda = {
    nombre: nombreDeuda,
    cantidad: montoDeuda,
    interes: tasaInteres,
    plazo: plazoMeses,
  };
  //agrego la deuda a un array de deudas
  arrayDeudas[contadorDeudas] = deuda;
  contadorDeudas++;
  // creo un div en html con los datos
  const elementoDeuda = document.createElement("div");
  elementoDeuda.innerHTML = `
      <h1> Elemento agregado! </h1>
          <h2>${deuda.nombre}</h2>
          <p>Monto: $${deuda.cantidad.toFixed(2)}</p>
          <p>Tasa de interés: ${deuda.interes}%</p>
          <p>Plazo: ${deuda.plazo} meses</p>
      `;
  //agrego un hijo al div listadeuda
  listaDeuda.appendChild(elementoDeuda);

  // limpio los campos del formulario
  document.getElementById("nombre-deuda").value = "";
  document.getElementById("monto-deuda").value = "";
  document.getElementById("tasa-interes").value = "";
  document.getElementById("plazo-meses").value = "";

  // limpio el html a los 5 segundos
  setTimeout(function () {
    listaDeuda.innerHTML = "";
  }, 2000);
}

function guardarDeudas() {
  // guardo el json en localstorage
  jsonDeudas = JSON.stringify(arrayDeudas);
  localStorage.setItem("deudas", jsonDeudas);

  // cartel de que absorbi el array
  const elementoDeuda = document.createElement("div");
  elementoDeuda.innerHTML = `<h1> Lista de deudas guardada! </h1>`;
  listaDeuda.appendChild(elementoDeuda);
  // borro
  setTimeout(function () {
    listaDeuda.innerHTML = "";
  }, 2000);
}

function importarDeudas() {
  arrayDeudas = JSON.parse(localStorage.getItem("deudas"));

  // cartel de que cargué el array
  const elementoDeuda = document.createElement("div");
  elementoDeuda.innerHTML = `<h1> Lista de deudas importada! </h1>`;
  listaDeuda.appendChild(elementoDeuda);
  // borro
  setTimeout(function () {
    listaDeuda.innerHTML = "";
  }, 2000);
}

function guardarDeudasTxt(datos, nombreArchivo) {
  const enlaceDescarga = document.createElement("a");
  const contenidoArchivo = JSON.stringify(datos);
  const blob = new Blob([contenidoArchivo], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  enlaceDescarga.href = url;
  enlaceDescarga.download = nombreArchivo;
  enlaceDescarga.click();
  window.URL.revokeObjectURL(url);
}

function importarDeudasTxt() {
  const archivoInput = document.getElementById("input-txt");
    const archivo = archivoInput.files[0];
    const lector = new FileReader();
    lector.onload = function (evento) {
      const contenido = evento.target.result;
      const arrayDeObjetos = JSON.parse(contenido);
      arrayDeudas = arrayDeObjetos;
      console.log("Valor de miVariable:", arrayDeObjetos);
    };
        lector.readAsText(archivo);
 
}

function pasarDolar(){
  
   htmlArrayDeuda.innerHTML = "";
  console.log(arrayDeudas);
  const cantidadElementosDeuda = arrayDeudas.length;
  console.log(cantidadElementosDeuda);
  const elementoDeuda = document.createElement("div");

  for (let i = 0; i < cantidadElementosDeuda; i++) {
    const elementoDeuda = document.createElement("div");
    elementoDeuda.innerHTML = `
<div id='div-deuda'>
<h3>Deuda número:${i + 1}</h3>
<p> Nombre: ${arrayDeudas[i].nombre} </p>
<p> Monto (DOLARES): $${(arrayDeudas[i].cantidad/compraDolar).toFixed(2)} </p>
<p> Interes: ${arrayDeudas[i].interes}% </p>
<p> Plazo: ${arrayDeudas[i].plazo} meses </p>
<p> Precio por cuota (DOLARES): $${(((arrayDeudas[i].cantidad*(1+(arrayDeudas[i].interes/100)))/arrayDeudas[i].plazo)/compraDolar).toFixed(2)}
<p> Monto final con interes (DOLARES): $${((arrayDeudas[i].cantidad*(1+(arrayDeudas[i].interes/100)))/compraDolar).toFixed(2)}
</div>
`;
    console.log(elementoDeuda);
    htmlArrayDeuda.appendChild(elementoDeuda);
  }


}
function pasarEuro(){
  
  htmlArrayDeuda.innerHTML = "";
  console.log(arrayDeudas);
  const cantidadElementosDeuda = arrayDeudas.length;
  console.log(cantidadElementosDeuda);
  const elementoDeuda = document.createElement("div");

  for (let i = 0; i < cantidadElementosDeuda; i++) {
    const elementoDeuda = document.createElement("div");
    elementoDeuda.innerHTML = `
<div id='div-deuda'>
<h3>Deuda número:${i + 1}</h3>
<p> Nombre: ${arrayDeudas[i].nombre} </p>
<p> Monto (EUROS): $${(arrayDeudas[i].cantidad/compraEuro).toFixed(2)} </p>
<p> Interes: ${arrayDeudas[i].interes}% </p>
<p> Plazo: ${arrayDeudas[i].plazo} meses </p>
<p> Precio por cuota (EUROS): $${(((arrayDeudas[i].cantidad*(1+(arrayDeudas[i].interes/100)))/arrayDeudas[i].plazo)/compraEuro).toFixed(2)}
<p> Monto final con interes (EUROS): $${((arrayDeudas[i].cantidad*(1+(arrayDeudas[i].interes/100)))/compraEuro).toFixed(2)}
</div>
`;
    console.log(elementoDeuda);
    htmlArrayDeuda.appendChild(elementoDeuda);
  }


}
