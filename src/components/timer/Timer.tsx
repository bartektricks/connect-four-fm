import Text from "components/text/Text";
import getPlayerBackgroundColor from "utils/getPlayerBackgroundColor";
import styles from "./Timer.module.scss";

type TimerProps = {
  timeLeft?: number;
  isPlayers2Turn?: boolean;
};

const Timer = ({ timeLeft, isPlayers2Turn }: TimerProps) => {
  return (
    <div
      className={`${styles.timer}`}
      style={getPlayerBackgroundColor(!!isPlayers2Turn)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197 165">
        <defs>
          <filter
            id="a"
            width="108.4%"
            height="116.2%"
            x="-4.2%"
            y="-4.2%"
            filterUnits="objectBoundingBox"
          >
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="3"
              result="shadowSpreadOuter1"
            />
            <feOffset
              dy="10"
              in="shadowSpreadOuter1"
              result="shadowOffsetOuter1"
            />
            <feComposite
              in="shadowOffsetOuter1"
              in2="SourceAlpha"
              operator="out"
              result="shadowOffsetOuter1"
            />
            <feColorMatrix
              in="shadowOffsetOuter1"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            />
          </filter>
          <path
            id="b"
            d="M12.239 34.847 87.279 3.25a20 20 0 0 1 15.454-.029l75.96 31.65A20 20 0 0 1 191 53.333V130c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V53.28a20 20 0 0 1 12.239-18.433Z"
          />
        </defs>
        <g fill="none" fillRule="evenodd" transform="translate(3 2)">
          <use xlinkHref="#b" fill="#000" filter="url(#a)" />
          <path
            className={styles.background}
            stroke="#000"
            strokeWidth="3"
            d="M86.697 1.868a21.5 21.5 0 0 1 16.613-.03l75.96 31.65a21.478 21.478 0 0 1 9.62 7.92 21.478 21.478 0 0 1 3.61 11.925V130a21.433 21.433 0 0 1-6.297 15.203A21.433 21.433 0 0 1 171 151.5H20a21.433 21.433 0 0 1-15.203-6.297A21.433 21.433 0 0 1-1.5 130V53.28c0-4.326 1.296-8.44 3.589-11.893a21.478 21.478 0 0 1 9.568-7.923Z"
          />
          <foreignObject x="-3" y="41" width="100%" height="100%">
            <div className={styles.inner}>
              <Text type="xsmall">{`Player ${
                isPlayers2Turn ? 2 : 1
              }'s turn`}</Text>
              <Text type="large" isLowerCase>{`${timeLeft || 0}s`}</Text>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
};

export default Timer;
