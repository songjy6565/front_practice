import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <div>React {process.env.test_variable}</div>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));