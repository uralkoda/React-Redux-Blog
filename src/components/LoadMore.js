import React from "react";
import { Spinner } from "./Spinner";
export class LoadMore extends React.Component {

    render() {
        const { label, disabled, onClick } = this.props;

        return (
            <div className="btn btn-block btn-dark" disabled={disabled} onClick={onClick}>
                {label}
            </div>
        )
    }
}