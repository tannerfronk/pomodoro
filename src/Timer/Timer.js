import React, { useState } from "react";
import Timer from "react-compound-timer";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Card } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";
// import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShortBreak from '../ShortBreak/ShortBreak';

const useStyles = makeStyles(() => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
  },
  time: {
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  card: {
    width: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },
}));

export default function TheTimer({ pomoTimeData, shortBreakData }) {
  const classes = useStyles();
  const [finished, setFinished] = useState(false);
  const pomoTime = pomoTimeData * 60 * 1000;
  const shortBreak = shortBreakData * 60 * 1000;

  const handleFinish = () => {
    setFinished(true);
  };

  return (
    <div key={pomoTimeData}>
      {finished ? (
        <ShortBreak shortBreakData={shortBreak}/>
      ) : (
        <Timer
          initialTime={pomoTime}
          startImmediately={false}
          direction="backward"
          timeToUpdate="10"
          onStart={() => console.log("onStart hook", finished)}
          onResume={() => console.log("onResume hook")}
          onPause={() => console.log("onPause hook")}
          onReset={() => console.log("onReset hook")}
          checkpoints={[
            {
              time: 1,
              callback: () => handleFinish(),
            },
          ]}
        >
          {({ start, pause, reset }) => (
            <React.Fragment>
              {" "}
              <div className={classes.main}>
                <Card className={classes.card} variant="outlined">
                  <div className={classes.time}>
                    <Timer.Minutes /> Minutes <Timer.Seconds /> Seconds
                  </div>
                  <div>
                    {" "}
                    <IconButton variant="contained" onClick={reset}>
                      <ReplayIcon />
                    </IconButton>
                    <IconButton variant="contained" onClick={start}>
                      <PlayArrowIcon />
                    </IconButton>
                    <IconButton variant="contained" onClick={pause}>
                      <PauseIcon />
                    </IconButton>
                    {/* <IconButton variant="contained" onClick={handleFinish}>
                      <SkipNextIcon />
                    </IconButton> */}
                  </div>
                </Card>
              </div>
            </React.Fragment>
          )}
        </Timer>
      )}
    </div>
  );
}
