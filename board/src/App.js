import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListBoardComponent from "./components/ListBoardComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import WriteBoardComponent from "./components/WriteBoardComponent";
import DetailBoardComponent from "./components/DetailBoardComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListBoardComponent />}></Route>
            <Route
              path="/board/:p_num"
              element={<ListBoardComponent />}
            ></Route>
            <Route
              path="/search/:keyword"
              element={<ListBoardComponent />}
            ></Route>
            <Route path="/write/:id" element={<WriteBoardComponent />}></Route>
            <Route
              path="/detail/:id"
              element={<DetailBoardComponent />}
            ></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
