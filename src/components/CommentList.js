import React from 'react';
import timeago from 'timeago.js';
import { Message } from './Message';

class CommentList extends React.Component {
    render() {
        const { commentList } = this.props;
        console.log(commentList);



        if (null === commentList) {
            return (<Message message="no comments yet" />);
        }

        return (<div className="card mb-3 mt-3 shadow-sm">
            <div className="card-body">
                {commentList.map(comment => {
                    return (
                        <div className="card-body border-bottom" key={comment.id}>
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

        </div>)
    }
}

export default CommentList;