import React from 'react'
import { debounce, throttle } from 'lodash';



class FormSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    handleClick = async (event) => {
        const { keyword } = this.props;
        this.props.submitForm(keyword)

    }

    debounceFetch = debounce(() => {
        this.fetchData(this.state.keyword);
    }, 1000)

    handleChange = (event) => {
        this.props.handleChangeKeyword(event.target.value);

        // this.setState(
        //     {
        //         keyword: event.target.value,
        //         change: true
        //     },
        //     this.debounceFetch
        // )
    }
    render() {
        return (
            <div className="d-flex" id="form">
                <input
                    value={this.props.keyword}
                    onChange={this.handleChange}
                    className="form-control" />
                <button className="btn btn-primary ml-2"
                    onClick={this.handleClick}>
                    Tìm</button>
            </div>
        )
    }
}
export default FormSearch