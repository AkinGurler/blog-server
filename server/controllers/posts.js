import Post from "../models/posts.js";


/* --------GET ALL POSTS------------ */
export const getPosts = async (req, res) => {
    try {
      const posts = await Post.find();/* get all posts */
      res.status(200).json(posts); /* if there is no problem turn into datas json send client side with status 200 code */
    } catch (error) {
      res.status(404).json({   /* if error exist send error with 404 */
        message: error.message,
      });
    }
  };

/* --------CREATE A NEW POSTS------------ */
export const createPost=async(req,res)=>{
    const post =req.body /* get data from request body */
    const newPost= new Post({ ...post, creator: req.userID , createdAt: new Date().toISOString() }) /* we create a child post inherit from post and we give some values  */
    try{
       await newPost.save() /* sava this document db */
       res.status(201).json(newPost)
        
    } catch(error){
        res.status(409).json({
            message:error.message
        })
    }
}

export const getSinglePost = async (req, res) => {
  try {
    const { id: _id } = req.params; /* get id like _id because findByID metho */
    const post = await Post.findById(_id); /* find the post which is contains id */
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try { 
    const deletedPost = await Post.findByIdAndRemove(_id);
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
    console.log("updated post ", updatedPost)
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};