var mongoose = require('mongoose');
var bodyParser =require('body-parser');
var Users = mongoose.model('Users');



 module.exports = {
   index: (request, response) => {
   },

   logreg: (request, response)=>{
     console.log(request.body);
     Users.findOne(request.body, function(err, users){
        if(users){
          request.session.user = users
          response.json(users)
        }else{
        var newuser = new Users(request.body);
        newuser.save(function(err, saveduser){
          if(err){
            console.log("I am here!")
            console.log(err);
            response.sendStatus(500);
          }else{
            request.session.user=saveduser
            response.json(newuser)
          }
        })
         }
      })
     },
     refresh:(request,response)=>{
       console.log(request.body);
       Posts.find({}).populate('_user').populate({path:'comments', model:'Comment', populate:{path:'_user', model:'User'}})
       .exec(function(err, messages){
         if(err){
           console.log("something went wrong... ugh");
           response.json(err)
         }else{
           console.log("something didnt go wrong");
           console.log(messages);
           response.json(messages);
         }
       })

     },

    posting:(request, response)=>{
      console.log(request.body);
      var newpost = new Posts();
      // var postinguser;
      console.log(request.body)
      newpost.message = request.body.themessage
      newpost._user = request.session.user._id
      console.log("this is the newpost before we save:")
      console.log(newpost);
      newpost.save(function(err){
        console.log(newpost)
        if(err){
          console.log("saving post")
          response.sendStatus(500);
        }else{
          // Posts.find({}, function(err, postings){
          //   console.log(postings)
          //   response.json(postings)
          // })
          Posts.find({}).populate('_user').populate({path:'comment'})
          .exec(function(err, messages){
            if(err){
              console.log("something went wrong... ugh");
              response.json(err)
            }else{
              console.log("something didnt go wrong");
              console.log(messages);
              response.json(messages);
            }
          })
        }
      })
    },
    commenting: (request, response)=>{
      console.log('creating comment')
      // console.log(request.params, ******************)
      Posts.findOne({_id: request.params.messid}).exec(function(err, thepost){
        console.log(thepost)
        if(err){
          console.log("not good")
          response.json(err)
        }else{
          console.log("found our message");
          console.log()
          var newcomment = new Comm(request.body);
          newcomment._user = request.session.user._id;
          newcomment.save(function(err){
            if(err){
              console.log("something went wrong saving the comment")
              response.json(err);
            }else{
              console.log("created comment");
              console.log("*************************", request.body.thecomment)
              console.log("****************", thepost.comments)
              thepost.comments.push(request.body.thecomment);
              thepost.save(function(err){
                if(err){
                  console.log("create comment");
                  response.json(err);
                }else{
                  console.log("message was saved with the new comment.")
                  response.json(thepost)
                }
              })
            }
          })

        }
      })
    }


   }
