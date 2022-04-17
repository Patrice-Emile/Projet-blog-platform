const Footer = (props) => {
  const { children, ...otherProps } = props;

  return <footer {...otherProps}>{children}</footer>;
};

export default Footer;
