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
//end delete role

//permissions
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions)
{
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click",()=>{
        let permissions = [];

        const rows = tablePermissions.querySelectorAll("[data-name]");
        
        rows.forEach(row=>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if(name == "id")
            {
                inputs.forEach(input =>{
                    const id = input.value;
                    permissions.push({
                        id:id,
                        permissions:[]
                    });
                })
            }
            else
            {
                inputs.forEach((input,index)=>{
                    const checked = input.checked;
                    // console.log(name);
                    // console.log(checked);
                    // console.log("--------");
                    if(checked){
                    permissions[index].permissions.push(name);
                }
                })
            }
        })
        console.log(permissions);
        if(permissions.length>0)
        {
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputpermisions = formChangePermissions.querySelector("input[name='permissions']");
            inputpermisions.value= JSON.stringify(permissions);
            formChangePermissions.submit();
        }
    })
}

//end permissions

//permission data-default 
const dataRecord = document.querySelector("[data-records]");
if(dataRecord)
{
    const records = JSON.parse(dataRecord.getAttribute("data-records"));
     console.log(records);
    const tablePermissions = document.querySelector("[table-permissions]");
    records.forEach((record,index)=>{
        const permissions = record.permission;
        // console.log(permissions);
        permissions.forEach(permission=>{
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        })
    })
    
}

//end permission data-default 

