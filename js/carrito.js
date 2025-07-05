document.addEventListener("DOMContentLoaded", () => {

    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        productosEnCarrito(carrito);

        let seccionProductos = document.getElementById("contenedor-carrito");
        seccionProductos.innerHTML = ""

        if (!carrito.length){
            let mensajeCarrito = document.createElement("p")
            mensajeCarrito.classList.add("mensaje-carrito")
            mensajeCarrito.textContent = "No hay productos en el carrito"

            seccionProductos.appendChild(mensajeCarrito)
        }
        else{
            carrito.forEach((element, index) => {
                let tarjetaProd = document.createElement("article")
                tarjetaProd.classList.add("producto-carrito");

                let imgProducto = document.createElement("img")
                imgProducto.src = element.images[0]

                let tituloProd = document.createElement("h3")
                tituloProd.textContent = element.title

                let precioProd = document.createElement("p")
                precioProd.textContent = `$ ${element.price}`

                let btnEliminar = document.createElement("button")
                btnEliminar.classList.add("btn-eliminar-carrito")
                btnEliminar.textContent = "Eliminar"

                btnEliminar.addEventListener("click", ()=> {
                    eliminarProducto(index)
                });

                tarjetaProd.appendChild(imgProducto)
                tarjetaProd.appendChild(tituloProd)
                tarjetaProd.appendChild(precioProd)
                tarjetaProd.appendChild(btnEliminar)

                seccionProductos.appendChild(tarjetaProd)
            });
        };
            renderizarBotones()

    };
    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let divAcciones = document.getElementById("acciones-carrito")

        divAcciones.innerHTML = ""

        if(carrito.length){
            let btnVaciar = document.createElement("button")
            btnVaciar.textContent = "Vaciar carrito"

            btnVaciar.addEventListener("click", () => {
                vaciarCarrito()
            })

            let btnFinalizar = document.createElement("button")
            btnFinalizar.textContent = "Finalizar compra"

            btnFinalizar.addEventListener("click", () => {
                let confirmado = confirm("Estas seguro que quieres finalizar la compra?")
                if (confirmado){
                    alert("Gracias por su compra")
                    localStorage.removeItem("carrito")
                    window.location.href = "../index.html"
                }
            });

            divAcciones.appendChild(btnVaciar)
            divAcciones.appendChild(btnFinalizar)
        }
    }

    const productosEnCarrito = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
        contadorCarrito.textContent = carrito.length;
    }
};

    const eliminarProducto = (index) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1)

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Eliminado");
        renderizarProductos()
    }

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito")
        alert("Vaciando carrito")
        renderizarProductos()
    }

    renderizarProductos()
});
