import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { courseParts } from "./data";

const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;