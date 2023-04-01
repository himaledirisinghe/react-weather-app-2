import logo from "../images/logo.png";

export default function Main({ children }) {
  return (
    <>
      <main>

        <header>
          <img src={logo} alt="logo" className="main-header-logo" />
          &nbsp; &nbsp;
          <h3 className="app-name">Weather App</h3>
        </header>

        {children}

        <div className="footer">
          <a href="mailto:info@fidenz.com?subject=Weather%20App&body=Hello%20Fidenz%20Technologies">
            2023 Fidenz Technologies
          </a>
        </div>
        
      </main>
    </>
  );
}
