import React from 'react'
import { useState } from 'react';
import { getUserToken } from '../utils/authToken';


const CommentForm = ({ comment, comments, postId, user, fetchPost }) => {
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    const commentSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await comment(postId, commentText);
            fetchPost();
            setCommentText('');
            setLoading(false);
        } catch (err) {
            console.error('Error posting comment', err);
            setLoading(false);
        }
    }
    const handleChange = (e) => {
        setCommentText(e.target.value)
    };

    const deleteComment = async (commentId) => {
      try {
        setLoading(true);
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/art/${postId}/comment/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getUserToken()}`,
          }
        });
        fetchPost();
        setLoading(false);
      } catch (err) {
        console.error('Error posting comment', err);
        setLoading(false);
    }
    }

    if (loading) {
      return <div  className='loading'><h1>Loading...</h1></div>
  }


  return (
    <div className='commentForm'>
      <div className='comments'>
        {comments && comments.map((com) => (
            <div key={com.id} className='comment'>
                <p className='commenter'>@{com.username}:</p><p>{com.text}</p>
                {user.username === com.username && (
                <button className='commentDeleteBtn' onClick={() => deleteComment(com.id)}>X</button>
                )}
            </div>
        ))}
      </div>
      <div className='commentFormBox'>
        <form onSubmit={commentSubmit}>
            <input 
            placeholder='Write A Comment...'
            value={commentText}
            onChange={handleChange}
            className='commentInput'
            required
            />
            <input className='submit bg-gradient-to-r from-blue-500 to-purple-500' type='submit' value='Submit' />
        </form>
      </div>
    </div>
  )
}

export default CommentForm
