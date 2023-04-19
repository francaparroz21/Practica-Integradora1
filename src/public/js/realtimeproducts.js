const socket = io()

const productsContainer = document.getElementById("products-list")
const titleProduct = document.getElementById("title-product")
const descProduct = document.getElementById("description-product")
const priceProduct = document.getElementById("price-product")
const stockProduct = document.getElementById("stock-product")
const codeProduct = document.getElementById("code-product")
const categoryProduct = document.getElementById("category-product")

const postProduct = document.getElementById("post-product")

postProduct.onsubmit = (e) => {
    e.preventDefault();
    const title = titleProduct.value;
    const description = descProduct.value;
    const category = categoryProduct.value;
    const price = priceProduct.value;
    const code = codeProduct.value;
    const stock = stockProduct.value
    socket.emit('newProd', { title, description, category, price, code, stock })
}

socket.on('addedProducts', (products) => {
    let productsPrint = "";
    products.forEach((p) => {
        products += `
        <h2>${p.title}</h2>
        <h3>${p.description}</h3>
        <h4>$${p.price}</h4>`
    })
    productsContainer.innerHTML = productsPrint;
})