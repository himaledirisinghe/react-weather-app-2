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
          <a href="mailto:info@abc.com?subject=Weather%20App&body=Hello%20Abc%20Corporation">
            2023 Abc Corporation
          </a>
        </div>
        
      </main>
    </>
  );
}
