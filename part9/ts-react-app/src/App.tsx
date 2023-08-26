import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const parts = courseParts;

  return (
    <div>
      <Header name={courseName} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;