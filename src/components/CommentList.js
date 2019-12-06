import React from 'react';
import timeago from 'timeago.js';
import { Message } from './Message';


import "./CommentList.css";

class CommentList extends React.Component {
    render() {
        const { commentList } = this.props;
        if (null === commentList || 0 === commentList.length) {
            return (<Message message="no comments yet" />);
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm">

                <div className="card-body">
                    {commentList.map(comment => {
                        return (

                            <div key={comment.id} className="card-body border-bottom" >
                                <p className="card-text mb-0">
                                    {comment.content}
                                </p>
                                <p className="card-text">
                                    <small>
                                        {timeago().format(comment.published)} by&nbsp;
                                            {comment.author.name}
                                    </small>
                                </p>
                            </div>

                        )
                    })}
                </div>

            </div>
        )
    }
}

export default CommentList;