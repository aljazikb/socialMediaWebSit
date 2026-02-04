

   setupUI()
   

   let currentPage=1
   let lastPage=1

   // ===========infinit scroll============= //
   window.addEventListener("scroll",function(){

     const endOfPage = window.innerHeight + window.pageYOffset>= document.body.offsetHeight
     
     if(endOfPage && currentPage<lastPage){
 
        getPosts(currentPage+1,false)
        currentPage++ 
     }
     console.log(endOfPage)
   })
    // ========infinit scroll============= //

/*
   function getPost( page = 1, reload=true ){

        axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
            .then((response)=>{

              

                let obs=response.data.data 
                lastPage = response.data.meta.last_page
                if (reload){
                    document.getElementById("posts").innerHTML=""
                }
            

                for(let s of obs){
                
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

                                        <span id="post-tags-${s.id}"> 
                                        (${s.comments_count}) Comments
                                            <span>
                                                <button class="btn btn-sm rounded-5" style="background-color: gray; color:white">
                                                    police
                                                </button>
                                            </span>
                                        </span>
                                </div>

                                    
                                </div>
                            </div>
                            <!-- //POST//-->
                    `
                    document.getElementById("posts").innerHTML +=content
                    const currentPostTagsId=`post-tags-${s.id}`
                    document.getElementById(currentPostTagsId).innerHTML=""

                    for(tag of s.tags){
                    let tagsContent=`
                        <button class="btn btn-sm rounded-5" style="background-color: gray; color:white">
                            ${tag.name}
                            </button>
                    
                    ` 
                    document.getElementById(currentPostTagsId).innerHTML+=tagsContent
                    }

                }
            
            }).catch((error)=>{;
            console.error("error")
            })

   }*/
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
            setupUI()
            showAlert("Logged in successfully","success")
            

        })
       console.log(UserName,password)
        
    }

    function RegisterBtnClicked(){
        console.log("ho")

        const UserName= document.getElementById("RegisterUsernameinput").value
       const password=document.getElementById("RegisterPasswordinput").value
       const Name=document.getElementById("RegisterNameinput").value
       const image=document.getElementById("RegisterImageinput").files[0]
       
        //Type of forDate instead of JSON object. Beacuse we used file of image
        let forDate=new FormData()
        forDate.append( "username",UserName)
        forDate.append( "password",password)
        forDate.append("name",Name)
        forDate.append("image",image)


       axios.post("https://tarmeezacademy.com/api/v1/register",forDate,{
            headers:{
                 "Content-type": "multipart/form-data",
            }
       })
       .then((res)=>{
            console.log(res.data)
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("currentUser",JSON.stringify(res.data.user))

            const modal= document.getElementById("RegisterModal")
            const modalInsrance = bootstrap.Modal.getInstance(modal)
            modalInsrance.hide()

            
            showAlert("Register in successfully","success")
            setupUI()
            

        }).catch((error)=>{
            const message = error.response.data.message
            showAlert(message,"danger")
        })
      
        
    }


    function CreateNewPostBtnClicked(){

        const title= document.getElementById("Post-titleInput").value
        const body =document.getElementById("PostTitleInput").value
        const Image=document.getElementById("Post-ImageInput").files[0]
        const token=localStorage.getItem("token")
        
        //Type of forDate instead of JSON object. Beacuse we used file of image
        let forDate=new FormData()
        forDate.append("body",body)
        forDate.append("title",title)
        forDate.append("image",Image)

       
       axios.post("https://tarmeezacademy.com/api/v1/posts", forDate,{
            headers:{
                "Content-type": "multipart/form-data",
                "authorization":`Bearer ${token}`
            }
       })
       .then((res)=>{

            const modal= document.getElementById("Create-post-Modal")
            const modalInsrance = bootstrap.Modal.getInstance(modal)
            modalInsrance.hide()
            showAlert("New Post Has Been Created","success")
           
            
           console.log(res)

        }).catch((error)=>{
             const message=error.response.data.message
             showAlert(message,"danger")
        })
     
    
    }


   function showAlert(customMessage,type) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML =[ `
            <div class="alert alert-${type} alert-dismissible" role="alert">
                <div>${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `].join('')

        alertPlaceholder.append(wrapper)
    }

    appendAlert(customMessage, type)

    //hide alert
    setTimeout(()=>{
        const alert = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')
        
    },2000)
    
    }


    
    function setupUI(){
       
    const token = localStorage.getItem("token");

    const loggedIndiv = document.getElementById("loggedIndiv");
    const logout = document.getElementById("logoutdiv");
    const Post=document.getElementById("AddButton");

    if (token == null) { // user is a guest
        
        if(Post!=null){
             Post.style.setProperty("display", "none", "important");
        }
        loggedIndiv.style.setProperty("display", "flex", "important");
        logout.style.setProperty("display", "none", "important");
       

    } else { // user is logged in
        if(Post!=null){
              Post.style.setProperty("display", "flex", "important");
        }
        loggedIndiv.style.setProperty("display", "none", "important");
        logout.style.setProperty("display", "flex", "important");
       
         // <b id="navUserName">@al</b>//
            const user=getCurrentUser()
        document.getElementById("navUserName").innerHTML= user.username
        document.getElementById("navImage").src =user.profile_image

        }
    }

    function getCurrentUser(){

        let user=null
        const storagUser =localStorage.getItem("currentUser")

        if(storagUser !=null){

            user=JSON.parse(storagUser)
        }
        return user

    }

    
    function logout(){ 
        localStorage.removeItem("token")
        localStorage.removeItem("currentUser")
        showAlert("Logged out successfully","success")
        setupUI()

    }




   
