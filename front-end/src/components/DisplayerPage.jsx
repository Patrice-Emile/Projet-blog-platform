import Header from "./Header";
import Footer from "./Footer";

const DisplayerPage = (props) => {
  const { children, hideHeader, ...otherProps } = props;

  return (
    <div {...otherProps}>
      <Header children={"Blog-platform"} className="header" />
      <main>{children}</main>
      <Footer children={"SUP 2021"} className="footer" />
    </div>
  );
};

export default DisplayerPage;
