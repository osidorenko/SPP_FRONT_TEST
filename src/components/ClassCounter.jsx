import React from "react";


class ClassCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.add = this.add.bind(this);
        this.del = this.del.bind(this);
    }

    add() {
        this.setState({count: this.state.count + 1})
    }

    del() {
        this.setState({count: this.state.count - 1})
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.add}> countAdd</button>
                <button onClick={this.del}> countDel</button>
            </div>
        )
    }
}

export default ClassCounter