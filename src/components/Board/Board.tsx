import { Fragment, Component } from "react";

/**
 * Imports components
 */
import Cell from "../Cell";

/**
 * Imports styling
 */
import "./Board.css";

/**
 * Defines the props interface
 */
interface BoardProps {
  nrows?: number;
  ncols?: number;
  chanceLightStartsOn?: number;
}

/**
 * Defines the state interface
 */
interface BoardState {
  hasWon: boolean;
  board: boolean[][];
}

/**
 * Displays the component
 */
class Board extends Component<BoardProps> {
  /**
   * Defines the default props
   */
  static defaultProps: BoardProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  };

  /**
   * Defines the default state
   */
  state: BoardState = {
    hasWon: false,
    board: this.createBoard(),
  };

  /**
   * Handles creating a board with n rows
   * each cell randomly lit or unlit
   */
  createBoard() {
    const board = [];

    for (let y = 0; y < this.props.nrows!; y++) {
      const row = [];

      for (let x = 0; x < this.props.ncols!; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn!);
      }

      board.push(row);
    }
    return board;
  }

  /**
   * Handles changing a cell: update board & determine if winner
   */
  flipCellsAround(coord: string) {
    const { ncols, nrows } = this.props;
    const board = this.state.board;
    const [y, x] = coord.split("-").map(Number);

    const flipCell = (y: number, x: number) => {
      /**
       * If coord is actually on board, flip it
       */
      if (x >= 0 && x < ncols! && y >= 0 && y < nrows!) {
        board[y][x] = !board[y][x];
      }
    };

    /**
     * Handles flipping this cell and the cells around it
     */
    flipCell(y, x); //Flip initial cell
    flipCell(y, x - 1); //flip left
    flipCell(y, x + 1); //flip right
    flipCell(y - 1, x); //flip below
    flipCell(y + 1, x); //flip above

    /**
     * win when every cell is turned off
     */
    const hasWon = board.every((row) => row.every((cell) => cell));

    this.setState({ board, hasWon });
  }

  /**
   * Renders game board or winning message.
   */
  makeTable() {
    const tblBoard = [];

    for (let y = 0; y < this.props.nrows!; y++) {
      const row = [];

      for (let x = 0; x < this.props.ncols!; x++) {
        const coord = `${y}-${x}`;

        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
    );
  }

  render() {
    return (
      <Fragment>
        {this.state.hasWon ? (
          <div className="winner">
            <span className="neon-orange">YOU</span>
            <span className="neon-blue">WIN!</span>
          </div>
        ) : (
          <div>
            <div className="Board-title">
              <div className="neon-orange">Lights</div>
              <div className="neon-blue">Out</div>
            </div>
            {this.makeTable()}
          </div>
        )}
      </Fragment>
    );
  }
}

export default Board;
