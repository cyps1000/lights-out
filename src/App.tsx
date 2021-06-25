import { Component } from "react";

/**
 * Imports components
 */
import Board from "./components/Board";
import Container from "./components/Container";

/**
 * Displays the component
 */
class App extends Component {
  render() {
    return (
      <Container>
        <Board />
      </Container>
    );
  }
}

export default App;
