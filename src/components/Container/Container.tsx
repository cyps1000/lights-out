/**
 * Imports styling
 */
import "./Container.css";

/**
 * Displays the component
 */
const Container: React.FC = (props) => {
  const { children } = props;

  return <div className="Container">{children}</div>;
};

export default Container;
