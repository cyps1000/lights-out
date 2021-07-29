import { Component } from "react";

/**
 * Imports components
 */
import Board from "./components/Board";

/**
 * Imports Styling
 */
import "./App.css";

/**
 * Displays the component
 */
class App extends Component {
  render() {
    return (
      <div className="App">
        <Board />
      </div>
    );
  }
}

export default App;
