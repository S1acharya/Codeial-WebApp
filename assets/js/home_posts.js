{
    // function which sends the data to controller action
    // this method sunmit data for new post using AJAX
    let createPost = function(){
        // id of form to create data from home.ejs
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            // prevent from automatically sun=bmitting
            e.preventDefault();

            // we will use AJAX to manually submit
            $.ajax({
                type: 'post',
                url:'/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $(`#posts-list-container>ul`).prepend(newPost);
                    deletePost($(' .delete-post-button' , newPost));
                    // console.log(data);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }





    // method to create a post in DOM
    let newPostDom = function(post){
        // copied the content of _post.ejs and pasting here in DOM
        return $(`<!-- this is working as a partial. we include it in home.ejs -->

                <li id = "post-${post._id}">
                    <p>
                        
                            <small>
                                <a class = "delete-post-button" href="/posts/destroy/${ post._id }">DELETE</a>
                            </small>
                        
                            ${ post.content}
                        <br>
                        <small>
                            ${ post.user.name }
                        </small>
                    </p>
                
                    <!-- form for comments -->
                    <div class = "post-comments">
                        <!-- form to be shown to user only if logged in -->
                        
                            <form action="/comments/create" method="POST">
                                <input type="text" name = "content" placeholder="Type Here to add comment..." required>
                                <input type="hidden"  name = "post" value=" ${ post._id } ">
                                <input type="submit" value = "Add Comment">
                            </form>
                
                        
                
                        <!-- show comment -->
                        <div class = "post-comments-list">
                            <ul id = "post-comments-${ post._id }">
                
                          
                            </ul>
                        </div>
                    </div>
                    
                </li>`
                )
    }







    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}