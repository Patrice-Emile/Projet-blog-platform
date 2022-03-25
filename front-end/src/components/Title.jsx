const Title = (props) => {
  const { children, ...otherProps } = props;
  console.log(children);
  return (
    <div {...otherProps}>
      <h2>{children}</h2>
    </div>
  );
};

export default Title;
