import Header from "./Header";
import Footer from "./Footer";

const DisplayerPage = (props) => {
  const { children, hideHeader, ...otherProps } = props;

  return (
    <div {...otherProps}>
      <Header children={"Blog de Vinci"} className="header" />
      <main>{children}</main>
      <Footer children={"CATTIER Patrice-Emile 2022"} />
    </div>
  );
};

export default DisplayerPage;
