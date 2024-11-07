//delete role
const buttondelete = document.querySelectorAll("[button-delete]");
    if(buttondelete.length>0)
    {
        const formdelete = document.querySelector("#form-delete-item");
        const path = formdelete.getAttribute("path");
        buttondelete.forEach((button)=>{
            button.addEventListener("click",()=>{
                const isConfirm = confirm("Bạn có muốn xoá role không ?");
                if(isConfirm)
                {
                    const id = button.getAttribute("data-id");
                    const action = `${path}/${id}?_method=DELETE`;
                    formdelete.action = action;
                    console.log(action);
                    formdelete.submit();
                }
            })
        })
    }