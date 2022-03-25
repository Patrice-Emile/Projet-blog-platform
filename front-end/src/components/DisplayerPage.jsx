import Link from "next/link";
const DisplayerPage = (props) => {
  const { children, hideHeader, ...otherProps } = props;

  return (
    <div {...otherProps}>
      <header className="header">
        <Link href="/">
          <h1>Blog-platform</h1>
        </Link>
        <div>
          <Link href="/portal/sign-in">
            <button>Sign In</button>
          </Link>
          <Link href="/portal/sign-up">
            <button>Sign Up</button>
          </Link>
        </div>
      </header>

      <main>{children}</main>
      <footer>SUP 2021</footer>
    </div>
  );
};

export default DisplayerPage;
