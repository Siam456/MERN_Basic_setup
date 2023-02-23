import "./App.css";

function App() {
  return (
    <div className="App">
      <div>{process.env.NODE_ENV}</div>
      <h1 className="text-3xl font-bold text-red-500 underline">
        Hello world!
      </h1>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
