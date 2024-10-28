//button active
const buttonsStatus = document.querySelectorAll("[button-status]")
    if(buttonsStatus.length > 0)
    {
        buttonsStatus.forEach(button => {
            button.addEventListener("click",()=>{
               let url = new URL(window.location.href);
              
                const status = button.getAttribute("button-status")
                if(status)
                {
                    url.searchParams.set("status",status);
                } 
                else{
                    url.searchParams.delete("status");
                }
                window.location.href = url.href;
            })
        });
    }
//end button active 

//form search
    const formsearch = document.querySelector("#form-search");
    let url = new URL(window.location.href);
    if(formsearch)
    {
       
        formsearch.addEventListener('submit',(e)=>{
            e.preventDefault();
            const keyword = e.target.elements.keyword.value;
            if(keyword){
                url.searchParams.set("keyword",keyword)
            }
            else{
                url.searchParams.set("keyword") 
            }
            window.location.href = url.href;
        })
    }
//end form search

//pagination
    const buttonPagination = document.querySelectorAll("[button-pagination]");
    
    if(buttonPagination)
        {
            const url = new URL(window.location.href);
            buttonPagination.forEach(button=>{
                button.addEventListener('click',()=>{
                    const page = button.getAttribute("button-pagination");
                    
                    url.searchParams.set("page",page);
                    
                    window.location.href = url.href;
                });
            });
        }
 //end-pagination


//check-box multi
const checkboxmulti = document.querySelector("[checkbox-multi]")
if(checkboxmulti){
    const inputcheckall = checkboxmulti.querySelector("input[name='checkall']");
    const inputId = checkboxmulti.querySelectorAll("input[name='id']");

    inputcheckall.addEventListener('click',()=>{
        if(inputcheckall.checked)
        {
            inputId.forEach(input=>{
                input.checked = true;
            })
        }
        else {
            inputId.forEach(input=>{
                input.checked = false;
            }) 
        };
    })

    inputId.forEach(input=>{
        input.addEventListener('click',()=>{
            const countChecked = checkboxmulti.querySelectorAll("input[name='id']:checked").length; // tim nhung input da~ check vao
            console.log(countChecked);
            if(countChecked == inputId.length)
            {
                inputcheckall.checked = true;   
            }
            else{
                inputcheckall.checked = false;   
            }
            
        })
    })
}
//end check-box multi
 

//form change multi
const formChangemulti = document.querySelector("[form-change-multi]");


    if(formChangemulti)
    {
        formChangemulti.addEventListener('submit',(e)=>{
            e.preventDefault();
            const checkboxmulti = document.querySelector("[checkbox-multi]");
            const inputChecked = checkboxmulti.querySelectorAll("input[name='id']:checked");
            
            const typechange = e.target.elements.type.value; // lấy giá trị xóa tất cả;
            console.log(typechange);
            if(typechange == "delete-all")
            { 
                const isConfirm = confirm("Bạn có muốn xóa sản phẩm không ?");
                if(!isConfirm)
                {
                    return;
                }
            }
            if(inputChecked.length)
            {
                let ids = [];
                const inputIds = formChangemulti.querySelector("input[name= 'ids']");
                
                inputChecked.forEach(input =>{
                    let id = input.value// hooac input.gettribute("")
                    if(typechange == "change-position")
                    {
                        const inputPosition = input.closest("tr").querySelector("input[name='position']").value;
                        ids.push(`${id}-${inputPosition}`);
                    }
                    else
                    {
                         ids.push(id);
                    }          
                })
                inputIds.value = ids.join(', ');
                formChangemulti.submit();
            }
            else{
                alert("choose 1 record, please");
            }
           
        })
    }
//end form change multi

//show alert 
const showAlert = document.querySelector("[show-alert]");

const idshow = document.getElementById("show");
const idx = document.getElementById("idx");


if(showAlert)
{
    const closeAlert = showAlert.querySelector("[close-alert]");
    const time = parseInt(showAlert.getAttribute("data-time"));

    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
        // showAlert.removeChild(idshow.firstChild);
    },time)

    closeAlert.addEventListener('click',()=>{
        showAlert.classList.add("alert-hidden");
    })
}

//end show alert

//upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage)
{   
    //delete image 
    const deleteImage = document.querySelector("[button-delete]");
    deleteImage.addEventListener('click',(e)=>{
        e.preventDefault();
        uploadImageInput.value= "";
        uploadImagePreview.src="";
    })
    //end delete image

    const uploadImageInput =  document.querySelector("[upload-image-input]");
    const uploadImagePreview =  document.querySelector("[upload-image-preview]");
    console.log(uploadImageInput);
    
    uploadImageInput.addEventListener('change',(e) => {
        console.log(e); 
        const file = e.target.files[0];
        if(file)
        {
            uploadImagePreview.src = URL.createObjectURL(file);
        }    
    })
}
//end upload image

//sort
const sort = document.querySelector('[sort]');
if(sort)
{
    const url = new URL(window.location.href);
    const sortSelect = sort.querySelector('[sort-select]');
    const sortButton = sort.querySelector('[sort-clear]');

    //sắp xếp
    sortSelect.addEventListener("change",(e)=>{
        const value = e.target.value;
        const [sortKey,sortValue] = value.split("-");
        console.log(sortKey,sortValue);
        
        url.searchParams.set("sortKey",sortKey);
        url.searchParams.set("sortValue",sortValue);

        window.location.href = url.href;   
    })
    //end sắp xếp

    //xoá sắp xếp
    sortButton.addEventListener("click",()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;   
    });
     //xoá end sắp xếp
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue)
    {
        const stringSort = `${sortKey}-${sortValue}`;
        const optionSelected = sortSelect.querySelector(`option[value=${stringSort}]`);
        console.log(optionSelected);
        optionSelected.selected= true;
    }
}
//end sort
