import "./App.css";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import _ from "lodash";
import { paginate } from "./components/paginate";
import cloneDeep from "lodash/cloneDeep";

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsCount, setItemsCount] = useState(0);
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const issue = cloneDeep(paginate(issues, currentPage, pageSize));

  useEffect(() => {
    fetch(
      "https://api.github.com/repos/facebook/create-react-app/issues?page=1&per_page=30"
    )
      .then((res) => res.json())
      .then((data) => {
        setIssues(data);
        setLoading(false);
        setItemsCount(data.length);
      })
      .catch(console.log);

    console.log(issue);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Github Issues</h1>
      <div className="box">
        {loading ? <h1 style={{ textAlign: "center" }}>loading...</h1> : ""}
        {issue.map((title) => (
          <div className="issues">
            <div style={{ float: "left", width: "90%" }} className="issue">
              <span
                style={{ marginLeft: 10, fontWeight: "bold" }}
                className="issue-title"
              >
                {title.title} &nbsp;&nbsp;
              </span>
              <span
                style={{
                  backgroundColor: title.labels[0]
                    ? `#${title.labels[0].color}`
                    : "white",
                  padding: 2,
                  borderRadius: "5%",
                }}
              >
                {title.labels[0] ? title.labels[0].name : ""}
              </span>
            </div>
            <div style={{ marginLeft: "90%" }}>{title.comments} comments</div>
          </div>
        ))}
      </div>

      <Pagination
        itemsCount={itemsCount}
        pageSize={pageSize}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
}

export default App;

//https://api.github.com/repos/facebook/create-react-app/issues?page=1&per_page=30
