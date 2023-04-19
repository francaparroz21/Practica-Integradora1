const socket = io()

const productList = document.getElementById("products-list")
const titleProduct = document.getElementById("title-product")
const descProduct = document.getElementById("description-product")
const priceProduct = document.getElementById("price-product")
const stockProduct = document.getElementById("stock-product")
const codeProduct = document.getElementById("code-product")
const categoryProduct = document.getElementById("category-product")
const postProduct = document.getElementById("post-product")

postProduct.addEventListener('submit', e => {
    e.preventDefault()
    const title = titleProduct.value;
    const description = descProduct.value;
    const category = categoryProduct.value;
    const price = priceProduct.value;
    const code = codeProduct.value;
    const stock = stockProduct.value;
    socket.emit('newProd', { title, description, category, price, code, stock })
})

socket.on('addedProducts', ({ products }) => {
    let productsInHtml = ""
    products.forEach(element => {
        productsInHtml += `
                <div class="products-item">
                    <h2>${element.title}</h2>
                    <p>${element.description}</p>
                    <span>${element.price}</span>
                </div>`
    });
    productList.innerHTML = productsInHtml
})
