import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    // New lifecycle method in React 16.0
    // Try -> Catch -> Block

    // If CardList.js has error //componentDidCatch(error, ...)
    // will this.setState( { has Error: true } )
    componentDidCatch(error, info) {
        this.setState( { hasError: true } )
    }

    // Check this.state.hasError: true? 
    // default = false
    render() {
        if (this.state.hasError) {
            return <h1>Oooops. That is not good</h1>
        }
        return this.props.children
        // this.props.children = Anything between the ErrorBoundary
        // CardList.js in this case
    }

}

export default ErrorBoundary;
