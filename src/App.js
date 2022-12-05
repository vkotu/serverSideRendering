import { StrictMode, useState, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ThemeContext from "./ThemeContext";
import SearchParams  from "./SearchParams";
import Details from "./Details";

// const Details = lazy(() => import('./Details'));
// const SearchParams = lazy(() => import('./SearchParams'));

const App = () => {
  const theme = useState("darkblue");
  return (
    <StrictMode>
      {/* <Suspense fallback={<h2>loading, be patient you weirdo</h2>}> */}
      <ThemeContext.Provider value={theme}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
      </ThemeContext.Provider>
      {/* </Suspense> */}
    </StrictMode>
  );
};

export default App;
