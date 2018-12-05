import React, {Component} from 'react';

class ErrorHandler extends Component {
    state = {
        hasError: false,
        isLoading: null
    }

    componentDidMount = () => {
        let loading = window.setTimeout(this.showError, 1000);
        this.setState({isLoading: loading});
    }

    componentWillUnmount = () => {
        window.clearTimeout(this.state.isLoading);
    }

    showError = () => {
        this.setState({hasError: true});
    }

    render() {
        return (
              <div>
                {this.state.hasError  ? (<h3>Error loading Google Maps. Please try again later. </h3>)
                : (<h3>Loading... Please wait.</h3>)
            } </div>
        )
    }
}
export default ErrorHandler;
