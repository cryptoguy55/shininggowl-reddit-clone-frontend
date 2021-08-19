import DeleteButton from './DeleteButton';
import React from 'react';

const Comment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <div className="mt-3 border-l-4 border-blue-500 pl-4">
       <hr className="my-3"/>
        <div className="flex">         
          <img src={`http://localhost:8080/api/public/${comment.author.image}`} alt={comment.author.username} className="rounded-full" width="20"/>
          &nbsp; &nbsp; {comment.author.username}
          <div className="flex-grow"></div>
          <span className="date">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
         </div>

      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer text-right">      
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
      </div>
     
    </div>
  );
};

export default Comment;
