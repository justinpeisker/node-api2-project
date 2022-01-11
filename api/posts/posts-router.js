// implement your posts router here
const express = require('express')
const router = express.Router()
const Post = require('./posts-model.js')

router.get('/', (req,res) => {
    Post.find(req.query)
    .then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved", 
        },err.message)
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post)
        }else{
            res.status(404).json({message:"The post with the specified ID does not exist"})
         }   
        })
    .catch(err => {
        res.status(500).json({message: "The post information could not be retrieved"}, err.message)
    })

})

router.post('/', (req, res) => {
    
    if(!req.body.title || !req.body.contents){
        res.status(400).json({message: "Please provide title and contents for the post"})
    }else{
        Post.insert(req.body)
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error while saving the post to the database" }, err.message)
        })
      }   
    })


router.put('/:id', async (req, res) => {
    const post = req.body
    try{
        const searchedPost = await Post.findById(req.params.id)
        if(!searchedPost){
            res.status(404).json({message: "The post with the specified ID does not exist" })
        } else {
            if(!post.title || !post.contents){
                res.status(400).json({message: "Please provide title and contents for the post" })
            
        } else {
            const updatedPost = await Post.update(req.params.id, post)
            res.status(200).json(updatedPost)
        }}
    }catch(err) {
        res.status(500).json({message: "The post information could not be modified" })
    }
})

router.delete('/:id', (req, res) => {
    
})

router.get('/:id/comments', (req, res) => {

})

module.exports = router