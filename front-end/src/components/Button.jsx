import classNames from "classnames";

const variants = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-200 text-black",
};

const sizes = {
  sm: "py-1 px-2 text-sm",
  md: "py-1.5 px-3 text-md",
  lg: "py-2 px-4 text-lg",
};

const Button = (props) => {
  const { variant = "primary", size = "md", ...otherProps } = props;

  return (
    <button
      className={classNames(variants[variant], sizes[size])}
      {...otherProps}
    />
  );
};

export default Button;
