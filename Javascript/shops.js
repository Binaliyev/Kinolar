window.addEventListener("load", () =>{
    "use strict"
    const form =elementSelect("form")
    const template =elementSelect("template").content
    const products__item =elementSelect(".products__item")
    const products__search = elementSelect(".products__search")
    let PRODUCTS = products
    let cancellation_temp = elementSelect(".cancellation_temp").content
    let cart__items = elementSelect(".cart__items")
    let products_back = elementSelect(".products_back")
    const cart = window.localStorage.getItem("cart") ? JSON.parse(window.localStorage.getItem("cart")) :[]
    const handleClickBack = () =>{
        window.location.reload()    
    }
    products_back.addEventListener("click", handleClickBack)
    const handleRenderProducts = (arr) => {
        if(arr?.length){
            products__item.innerHTML = null
            for(let i = 0; i<arr.length; i++){
                let clone = template.cloneNode(true)
                let name = clone.querySelector(".products__name")
                name.textContent = arr[i].name
                let img = clone.querySelector(".products__img") 
                img.src = arr[i].bigPoster
                let model = clone.querySelector(".products__model")
                model.textContent = arr[i].model
                let color = clone.querySelector(".products__color")
                color.textContent = arr[i].color
                let price = clone.querySelector(".products__price")
                price.textContent = arr[i].price
                let buy = clone.querySelector(".products__buy")
                buy.dataset.id = arr[i].id
                products__item.appendChild(clone)
            }
        }

    }
    const handleSub = (event) => {
        event.preventDefault()
        let rejex = new RegExp(products__search.value, "gi")
        let filter= []
        if(products__search.value.length){
           filter = PRODUCTS.filter(item => item.name.match(rejex))
        }
        handleRenderProducts(filter)
    }
    form.addEventListener("submit", handleSub)
    let handleCartRender = (arr) =>{
        if (arr.length) {
            cart__items.innerHTML = null
            for (let i = 0; i < arr.length; i++) {
                let clone = cancellation_temp.cloneNode(true)
                let name = clone.querySelector(".cancellation_temp__name")
                name.textContent = arr[i].name
                let price = clone.querySelector(".cancellation_temp__price")
                price.textContent = arr[i].price
                let cance = clone.querySelector(".products_cancellation")
                cance.dataset.id = arr[i].id
                cart__items.appendChild(clone)
            }
        }else{
            let h2 = creatTag("h2")
            h2.textContent = "Nothing has been purchased yet."
            h2.classList.add("text-danger")
            cart__items.appendChild(h2)
        }
    }
    const handleClick = (event) => {
        let id = event.target.dataset.id
        if(event.target.matches(".products__buy")){
            let prod = PRODUCTS.find(item => item.id === id)
            if(cart.length){
                if(!cart.some(item => item.id === id)){
                    cart.push(prod)
                    handleCartRender(cart)
                    window.localStorage.setItem("cart", JSON.stringify(cart))
                } 
            }else{
                cart.push(prod)
                handleCartRender(cart)
                window.localStorage.setItem("cart", JSON.stringify(cart))
            }
        }else if(event.target.closest(".products_cancellation")){
            let filter = cart.filter(item => item.id  !== id) 
            handleCartRender(filter)
            window.localStorage.setItem("cart", JSON.stringify(filter))
            window.location.reload()
         }
    }
    window.addEventListener("click", handleClick)
    handleCartRender(cart)
    handleRenderProducts(PRODUCTS)
})