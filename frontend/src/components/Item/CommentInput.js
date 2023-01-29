import React, { useState } from "react";
import agent from "../../agent";
import { ADD_COMMENT } from "../../constants/actionTypes";
import { useDispatch } from 'react-redux'

export default function CommentInput({
  currentUser, 
  slug,
}) {
  const [body, setBody] = useState("")

  const dispatch = useDispatch()

  async function createComment(e) {
    e.preventDefault()
    
    const payload = await agent.Comments.create(slug, {
      body
    });

    dispatch({ type: ADD_COMMENT, payload })
    setBody("")
  }

  return (
    <form className="card comment-form m-2" onSubmit={createComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            value={body}
            onChange={setBody}
            rows="3"
          ></textarea>
        </div>
        <div className="card-footer">
          <img
            src={currentUser.image}
            className="user-pic mr-2"
            alt={currentUser.username}
          />
          <button className="btn btn-sm btn-primary" type="submit">
            Post Comment
          </button>
        </div>
      </form>
  )
}
