const CommentModel = require('./post');

const createComment = async ({
  content,
  postId,
  userId
}) => {
  const newComment = await CommentModel.create({
    content,
    post: postId,
    createdBy: userId  
  });
  return newComment;
}

module.exports = {
    createComment
}