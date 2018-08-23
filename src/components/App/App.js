import React from 'react';
import Form from './App_Form';
import Output from './App_Output';
import Footer from './App_Footer';

const App = () => {
    return (
        <div>
            <h1>App Page</h1>
            <Form />
                <p>=======================================================</p>
            <Output />
                <p>=======================================================</p>
            <Footer />
        </div>
    )
}

export default App;