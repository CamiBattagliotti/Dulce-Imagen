document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const renderizarProductos = () => {
    url = "https://dummyjson.com/products/category/kitchen-accessories?limit=12"

    fetch(url)
    .then((res) => res.json())
    .then((data) => {

        
        let contenedorProd = document.getElementById("contenedor-productos")
    
        for(const product of data.products) {
            let tarjetaProd = document.createElement("article");
            tarjetaProd.classList.add("tarjeta-producto")

            let imgProd = document.createElement("img");
            imgProd.src = product.images[0];
            imgProd.alt = product.description;

            let tituloProd = document.createElement("h3");
            tituloProd.classList.add("titulo-producto")
            tituloProd.textContent = product.title;

            let precioProd = document.createElement("p");
            precioProd.textContent = `$ ${product.price}`

            let btnAgregar = document.createElement("button");
            btnAgregar.textContent = "Agregar"

        // Eventos:
            btnAgregar.addEventListener("click", () => {
                alert(`${product.title} agregado al carrito`)
                agregarProducto(product)
                actualizarAgregados();
            })

        // Armo las partes que tendra el article
            tarjetaProd.appendChild(imgProd)
            tarjetaProd.appendChild(tituloProd)
            tarjetaProd.appendChild(precioProd)
            tarjetaProd.appendChild(btnAgregar)

        // Adoso a la seccion que esta esperando recibir los elementos
            contenedorProd.appendChild(tarjetaProd)
        }

    
    })
    .catch((err) => console.error("Error: ", err));


};

const agregarProducto = (product) => {
    carrito.push(product);
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const actualizarAgregados = () => {
    const contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.textContent = carrito.length;
}

renderizarProductos()
actualizarAgregados()
});