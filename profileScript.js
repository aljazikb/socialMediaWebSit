    setupUI()
    getUser()
    getPosts() 



    function getCurrentUserId(){

    const urlParms= new URLSearchParams(window.location.search)
    const id=urlParms.get("userid")
    return id

    }

 function getUser(){

     const id =  getCurrentUserId()

    
     axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)

    .then((response)=>{
        const user= response.data.data
        document.getElementById("main-info-email").innerHTML =user.email
        document.getElementById("main-info-name").innerHTML =user.name
        document.getElementById("main-info-username").innerHTML =user.username
        document.getElementById("header-image").src= user.profile_image
        document.getElementById("name-posts").innerHTML =user.username

       

       

        //comment & post count
        document.getElementById("comment-count").innerHTML =user.comments_count
        document.getElementById("post-count").innerHTML =user.posts_count
       
        console.log(response.data)
    })
                    
 }           


 function getPosts(){

        const id=  getCurrentUserId()
        
        axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
            .then((response)=>{

              

                let obs=response.data.data 
                 document.getElementById("user-posts").innerHTML =""

                for(let s of obs){


                    //show or hide edit button
                    let user= getCurrentUser()
                    let isMyPost= user!=null && s.author.id ==user.id
                   let butttonContent=``

                   if(isMyPost){
                      butttonContent=
                      `
                      <button class="btn btn-danger" style="margin-left:5px;float:right;" onclick="deletepostbtnclicked('${encodeURIComponent(JSON.stringify(s))}')">delete</button>

                      <button class="btn btn-secondary" style="float:right" onclick="editpostbtnclicked('${encodeURIComponent(JSON.stringify(s))}')">edit</button>
                      `
                   }
                
                    let  postTitle=""
                    if(s.title!=null){
                        postTitle=s.title
                    }

                    let content =`

                    <div class="card shadow-lg my-5">

                                <div class="card-header ">

                                    <div>
                                    
                                    <img class="rounded-circle border border-2" src="${ typeof s.author.profile_image=="string"?s.author.profile_image:""}" alt="" style="width :40px; height: 40px; ">
                                    <b> ${s.author.username}</b>
                                    </div>
                                        ${butttonContent}
                                </div>
                                <div class="card-body" onClick="postClicked(${s})" style="cursor: pointer">
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
                    document.getElementById("user-posts").innerHTML +=content
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

   }