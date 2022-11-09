import BoardBackground from "components/board-background/BoardBackground";
import RulesBlock from "components/rules-block/RulesBlock";

function App() {
  return (
    <div className="App">
      <BoardBackground subBackgroundColor="yellow">
        <RulesBlock />
      </BoardBackground>
    </div>
  );
}

export default App;
