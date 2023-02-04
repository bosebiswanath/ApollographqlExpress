const PostModel = require("./models/Post.model")
const resolvers = {
    Query: {
        hello: () =>{
            return "Hello World Biswanath";
        },

        getAllPosts: async () =>{
            return await PostModel.find()
        },
        getPostByID: async (_parent,{id},_context,_info) =>{
            return await PostModel.findById(id)
        }
    },
    Mutation:{
        createPost: async (parent, args, context, info) =>{ 
            const { title, description } = args.post;
            const postmodel = new PostModel({title, description})
            await postmodel.save()
            return postmodel;
        },
        deletePost: async (parent, args, context, info) =>{
            const { id } = args;
            await PostModel.findByIdAndDelete(id)
            return "Post Deleteed successfully"
        },
        updatePost: async (parent, args, context, info) =>{
            const { id } = args;
            const { title, description } = args.post;
            const updatedvalue = await PostModel.findByIdAndUpdate(
                id,
                { title, description },
                {new: true}
            );
            return updatedvalue;
        }
    }

};
module.exports = resolvers;