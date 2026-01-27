
   setupUI()
   axios.get("https://tarmeezacademy.com/api/v1/posts?limit=5")
    .then((response)=>{

    let obs=response.data.data
     document.getElementById("posts").innerHTML=""


    for(let s of obs){
    
    console.log("inside the loop")

    let  postTitle=""
    if(s.title!=null){
        postTitle=s.title
    }

    let content =`

     <div class="card shadow-lg my-5">

                <h5 class="card-header ">
                    <img class="rounded-circle border border-2" src="${ typeof s.author.profile_image=="string"?s.author.profile_image:""}" alt="" style="width :40px; height: 40px; ">
                    <b> ${s.author.username}</b>
                </h5>
                <div class="card-body">
                    <h5 class="card-title">
                     <img class="w-100" src="${typeof s.image=="string"?s.image:""}" alt="" >
                     <h6 style="color: gray;" class="mt-1 ">${s.created_at}</h6>
                    </h5>
                   <h5>
                    ${postTitle}
                   </h5>
                   <p>
                   ${s.body}
                   </p>
                   <hr>

                   <div >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                             <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                        <span> 
                        (${s.comments_count}) Comments
                        </span>
                   </div>

                    
                </div>
            </div>
            <!-- //POST//-->
    `
      document.getElementById("posts").innerHTML +=content

    }

    }).catch((error)=>{;
    console.error("error")
    })


    function loginBtnClicked(){
       const UserName= document.getElementById("usernameinput").value
       const password=document.getElementById("passwordinput").value

       const params=
        {
            "username" : UserName,
            "password" : password
        }
       
       axios.post("https://tarmeezacademy.com/api/v1/login",params)
       .then((res)=>{
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("currentUser",JSON.stringify(res.data.user))

            const modal= document.getElementById("LoginModal")
            const modalInsrance = bootstrap.Modal.getInstance(modal)
            modalInsrance.hide()
            showSuccessAlert()

        })
       console.log(UserName,password)
        
    }

showSuccessAlert()
    function showSuccessAlert(){
        

        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)  
        appendAlert('Nice, you triggered this alert message!', 'success')
        }

    }

    function setupUI(){
        const token=localStorage.getItem("token")

        const loginBtn=document.getElementById("login-btu")
        const regester=document.getElementById("Register-btu")
       const logout = document.getElementById("logout-btu") 

        if(token ==null){ //user is a guest
           loginBtn.style.visibility="visible"
            regester.style.visibility="visible"
            logout.style.visibility="hidden"
           
        }else{
            loginBtn.style.visibility="hidden"
            regester.style.visibility="hidden"
            logout.style.visibility="visible"
            

        }

    }

    function longout(){ 
        localStorage.removeItem("token")
        localStorage.removeItem("currentUser")
        alert("logout ")

    }

    
    
