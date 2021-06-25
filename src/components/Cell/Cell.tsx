import { Component } from "react";

/**
 * Imports styling
 */
import "./Cell.css";

/**
 * Defines the props interface
 */
interface CellProps {
  isLit: boolean;
  flipCellsAroundMe: () => void;
}

/**
 * Displays the component
 */
class Cell extends Component<CellProps> {
  constructor(props: CellProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handles the event when clicking a cell
   */
  handleClick() {
    this.props.flipCellsAroundMe();
  }

  render() {
    /**
     * Handles the styling applied to the cell
     * based on the isLit prop
     */
    const classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");

    return <td className={classes} onClick={this.handleClick} />;
  }
}

export default Cell;
