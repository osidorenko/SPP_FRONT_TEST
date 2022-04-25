import React from "react";

const DataItem = ({date, time}) => {
    return (
        <div>
            <strong><h5>{date} {time}</h5>

            </strong>
        </div>
    );
}
export default DataItem;