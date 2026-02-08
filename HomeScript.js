
   let currentPage=1
    let lastPage=1

   // ===========infinit scroll============= //
   window.addEventListener("scroll",function(){

     const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight-10;
     console.log(window.innerHeight , window.pageYOffset,document.body.scrollHeight)

     if(endOfPage && currentPage < lastPage){

         currentPage=currentPage+1
        getPosts(currentPage,false)
       
             
     }
   
   })
    // ========infinit scroll============= //

  
    setupUI() 
    getPosts()

/*
        let currentPage = 1;
        let lastPage = Infinity;
        let isLoading = false;

        window.addEventListener("scroll", function () {
        const endOfPage = window.innerHeight + window.pageYOffset >= document.body.scrollHeight ;

        if (endOfPage && currentPage < lastPage && !isLoading) {
            isLoading = true;
            currentPage++;

            getPosts(currentPage, false).then(() => {
            isLoading = false;
            });
        }
        });

        setupUI();
        getPosts();
    

  */

   function postClicked(postID){
       window.location=`postDetails.html?postID= ${postID}`

   }


   function userClicked(userId){
     
     window.location=`profile.html?userid=${userId}`
    }

   function toggleloader(show=true){
        if(show){
        document.getElementById("loader").style.visibility = 'visible'
        }else{
        document.getElementById("loader").style.visibility ='hidden'

        }


   }
    
  

   
    
