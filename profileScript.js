setupUI()
getUser()

 function getUser(){

    axios.get(`https://tarmeezacademy.com/api/v1/users/2`)

    .then((response)=>{
        const user= response.data.data
        document.getElementById("main-info-email").innerHTML =user.email
        document.getElementById("main-info-name").innerHTML =user.name
        document.getElementById("main-info-username").innerHTML =user.username

        //comment & post count
        document.getElementById("comment-count").innerHTML =user.comments_count
        document.getElementById("post-count").innerHTML =user.posts_count
       
        console.log(response.data)
    })

                    
 }           
