const Footer = (props) => {
  const { children, ...otherProps } = props;
  return (
    <footer {...otherProps}>
      {"\u00a9 "}
      {children}
    </footer>
  );
};

export default Footer;
