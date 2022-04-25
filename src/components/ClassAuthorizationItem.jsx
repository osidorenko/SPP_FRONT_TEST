import React from "react";

class ClassAuthorizationItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="authorization">
                <div>
                    <h3>User name or email</h3>
                    <input size={50}/>
                    <h3>Password</h3>
                    <input size={50}/>
                </div>
                <button>Apply</button>
            </div>
        );
    }
}

export default ClassAuthorizationItem