import React from 'react';
import Form from './Form';
import Output from './Output';
import Footer from './Footer';

const App = () => {
    return (
        <div>

            <div className="main">
                <div className="mainLeft">
                    <Form />
                </div>
                <div className="mainRight">
                    <Output />
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default App;