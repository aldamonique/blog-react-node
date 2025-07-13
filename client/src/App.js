import "./App.css";

function App() {
  return (
    <main>
        <div className="container">
          <header>
            <a href="" className="logo">
              {" "}
              My Blog
            </a>
            <nav>
              <a href="">Login</a>
              <a href="">Register</a>
            </nav>
          </header>
          </div>
          <div className="post">
            <img src="https://ims.com.br/wp-content/uploads/2021/10/Clarice-Lispector-Acervo-IMS_1700x1058.jpg"/>
            <div className="description">
              <h2>The Rio de Janeiro of Clarice Lispector</h2>
              <p>
                Clarice Lispector spent her childhood in Recife, but at the age of 15 she moved with her father and two sisters to Rio de Janeiro. It was in the then capital of Brazil that the writer lived her youth and early adult life: she completed high school, graduated from law school, had her first professional experiences in the press, got married, and in 1943, released her first book Near to the Wild Heart.
              </p>
            </div>
           
          </div> 
        
    </main>
  );
}

export default App;
