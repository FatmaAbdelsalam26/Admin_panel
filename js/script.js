document.addEventListener("DOMContentLoaded", function(event) {
   
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId),
    bodypd = document.getElementById(bodyId),
    headerpd = document.getElementById(headerId)
    
    // Validate that all variables exist
    if(toggle && nav && bodypd && headerpd){
    toggle.addEventListener('click', ()=>{
    // show navbar
    nav.classList.toggle('show')
    // change icon
    toggle.classList.toggle('bx-x')
    // add padding to body
    bodypd.classList.toggle('body-pd')
    // add padding to header
    headerpd.classList.toggle('body-pd')
    })
    }
    }
    
    showNavbar('header-toggle','nav-bar','body-pd','header')
    
    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')
    
    function colorLink(){
    if(linkColor){
    linkColor.forEach(l=> l.classList.remove('active'))
    this.classList.add('active')
    }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
    
     // Your code to run since DOM is loaded and ready
    });
    
let productNameInput = document.getElementById('productNameInput');
let productPriceInput = document.getElementById('productPriceInput');
let productAddsInput = document.getElementById('productAddsInput');
let productTaxsInput = document.getElementById('productTaxsInput');
let productDiscountInput = document.getElementById('productDiscountInput');

let total = document.getElementById('total');
let productCategoryInput = document.getElementById('productCategoryInput');
let productImgInput = document.getElementById('imgFile');
let buttonUpdate = document.getElementById('btnProduct');
let mood ="create";
let temp;

let productList=[];

if(localStorage.getItem('products')!=null)
{
    productList=JSON.parse(localStorage.getItem("products"));
    displayProducts()
}
function getTotal(){
    if(productPriceInput.value !==''){
        let result =(+productPriceInput.value + +productAddsInput.value + +productTaxsInput.value) - +productDiscountInput.value;
        total.innerHTML = "total :" +result;
        total.style.background = '#040';

    }
    else{
            total.innerHTML = '';
            total.style.background = '#a00d02';
    }
}

function addProduct(){
    
    let product={
        name:productNameInput.value,
        price:productPriceInput.value,
        adds:productAddsInput.value,
        taxs:productTaxsInput.value,
        discount:productDiscountInput.value,
        total:total.value,
        category:productCategoryInput.value,
        img:productImgInput.value
    }
    if(mood === "create"){
        productList.push(product);
    }
    else{
        productList[temp]=product;
        mood = "create";
        buttonUpdate.innerHTML="create"

    }
    localStorage.setItem("products",JSON.stringify(productList));
    
    displayProducts();
    console.log(product);
    +clearForm();
    
}
function clearForm(){
    
    productNameInput.value = "";
    productPriceInput.value ="";
    productAddsInput.value ="";
    productTaxsInput.value ="";
    productDiscountInput.value ="";
    productCategoryInput.value ="";
    productImgInput.value ="";

}
function displayProducts(){
    let box=``;
    for(let i=0 ; i < productList.length;i++){
        box +=`<tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].adds}</td>
                <td>${productList[i].taxs}</td>
                <td>${productList[i].discount}</td>
                <td>${productList[i].total}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].img}</td>
                <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger btn-sm">Delete</button></td>
                <td><button  onclick="updateProduct(${i});"class="btn btn-outline-warning btn-sm">Update</button></td>
            </tr>`
    }
    document.getElementById('TableBody').innerHTML = box;

}
function deleteProduct(deletedIndex){
    productList.splice(deleteProduct,1);
    localStorage.setItem("products",JSON.stringify(productList));
    displayProducts();

}
function updateProduct(i){
    productNameInput.value = productList[i].name;
    productPriceInput.value = productList[i].price;
    productCategoryInput.value = productList[i].category;
    productDescriptionInput.value=productList[i].desc;

    buttonUpdate.innerHTML= "Update";
    mood ='update';
    temp =i;
    
}
function searchProduct(term){
    let box=``;
    for(let i=0 ; i < productList.length;i++)
        {
            if(productList[i].name.toLowerCase().includes(term.toLowerCase())===true);{
                box +=`<tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].desc}</td>
                <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger btn-sm">Delete</button></td>
                <td><button onclick="updateProduct();" class="btn btn-outline-warning btn-sm">Update</button></td>
            </tr>`
            }
        }
        document.getElementById('TableBody').innerHTML = box;


}