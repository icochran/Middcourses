import PropTypes from "prop-types";

export default function Filter({filterByCallback}) {
    filterByCallback()
    return(
        <div>
            <h1>Filter Icon</h1>
        </div>
    );
}

Filter.propTypes = {
    filterByCallback: PropTypes.func.isRequired
}