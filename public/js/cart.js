//cart cập nhập số lượng
const inputQuantity = document.querySelectorAll("input[name='quantity']");
if(inputQuantity.length > 0)
{
    inputQuantity.forEach(input => {
        input.addEventListener("change",()=>{
         // e.target = input
            const productId = input.getAttribute("item-id");
            const quantity = input.value;
            console.log(productId);
            console.log(quantity);
            
            window.location.href = `/cart/update/${productId}/${quantity}`
        }); 
    });
}

//end cart