import MenuBlock from "components/menu-block/MenuBlock";
import BoardBackground from "components/board-background/BoardBackground";
import { ReactComponent as Icon } from "assets/player-vs-player.svg";
import { ReactComponent as Logo } from "assets/logo.svg";

const Home = () => {
  return (
    <BoardBackground backgroundColor="dark-purple">
      <MenuBlock
        icon={Logo}
        buttons={[
          {
            to: "/start",
            children: "Play vs player",
            icon: Icon,
            backgroundColor: "yellow",
          },
          {
            to: "/rules",
            children: "Game rules",
            backgroundColor: "white",
            isAlignedLeft: true,
          },
        ]}
      />
    </BoardBackground>
  );
};

export default Home;
