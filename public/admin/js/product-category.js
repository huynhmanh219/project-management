//change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if( buttonChangeStatus.length>0 )
{
    const formChangeStatus = document.querySelector("#form-change-status");
    const pathStatus = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = (statusCurrent == "active" ? "inactive" : "active");
            
            const action = pathStatus + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action
            formChangeStatus.submit();

        })
    })
}
//end change status

//delete product-catagory
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length>0){
    const formDelete = document.querySelector('#form-delete-item');
    const path = formDelete.getAttribute('data-path');
    buttonDelete.forEach(button=>{
        button.addEventListener('click',()=>{
            const isConfirm = confirm("Bạn có muốn xoá danh mục này ?");
            if(isConfirm)
            {
                const id = button.getAttribute("data-id");                
                const action = `${path}/${id}?_method=DELETE`;
                formDelete.action = action;
                console.log(action);
                formDelete.submit();
            }
        })
    })

}
// end delete product