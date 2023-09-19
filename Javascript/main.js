window.addEventListener("load", () =>{
    "use strict"
    let form = elementSelect("form")
    let inputs = elementSelectAll("input")
    let name_text = elementSelect(".name_text")
    let lastname = elementSelect(".lastname_text")
    let password = elementSelect(".password_text")
    let btn = elementSelect(".products_next__page button")
    const handleSubClick = () =>{
        let token__array = [ 1,2,3,4,5,6,7,8,9,0,"q","w","e","r","t","y","u","i","o","p","a","d","f","g",1,2,3,4,5,6,7,8,9,0,"q","w","e","r","t","y","u","i","o","p","a","d","f","g"]
        function handleReturnToken(token__array){
            if(token__array?.length){
                let string = ""
                for (let i = 0; i < 50; i++) {
                    string += token__array[parseInt( Math.random() * token__array.length)]
                }
                return string
            }
        }
        let token = handleReturnToken(token__array)
        if (token) {
            setTimeout(() =>{
                window.location.replace("./Main/product.html")
            }, 1000)
        }
    }
    const handleKeyap = (event) =>{ 
        switch(event.target.id){
            case "name":{
                if (event.target.value.length >= 3) {
                    name_text.textContent = "Name"
                    name_text.classList.remove("text-danger")
                }else{
                    name_text.textContent = "Name is mandatory"
                    name_text.classList.add("text-danger")
                }
            }break;
            case "lastname":{
                if (event.target.value.endsWith("va") || event.target.value.endsWith("ov") || event.target.value.endsWith("ev") ){
                    lastname.textContent = "Lastame"
                    lastname.classList.remove("text-danger")
                }else{
                    lastname.textContent = "Lastname is mandatory"
                    lastname.classList.add("text-danger")
                }
            }break; 
            case "password":{
                if (event.target.value.length >= 3 && event.target.value.length <= 15 ) {
                    password.textContent = "Password"
                    password.classList.remove("text-danger")
                    
                }else{
                    password.textContent = "Password is mandatory"
                    password.classList.add("text-danger")
                }
            }break;
        }
    }
    inputs.forEach(item => {
        item.addEventListener("keyup", handleKeyap)
        item.addEventListener("blur", handleKeyap)
    })
    btn.addEventListener("click", handleSubClick)
    const handleSub = (event) =>{
        event.preventDefault()
    }
    form.addEventListener("submit", handleSub)
})