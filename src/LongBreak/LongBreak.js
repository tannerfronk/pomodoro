import React from "react";
import Timer from "react-compound-timer";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Card, Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";
import SkipNextIcon from "@material-ui/icons/SkipNext";

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

export default function LongBreak({ longBreakData, save, onFinish, finished }) {
  const classes = useStyles();

  const longBreak = longBreakData

  return (
    <div key={save}>
      <Timer
        initialTime={longBreak}
        startImmediately={false}
        direction="backward"
        onStart={() => console.log("onStart hook")}
        onResume={() => console.log("onResume hook")}
        onPause={() => console.log("onPause hook")}
        onReset={() => console.log("onReset hook")}
        checkpoints={[
          {
            time: 0,
            callback: () => onFinish(),
          },
        ]}
      >
        {({ start, pause, reset }) => (
          <React.Fragment>
            {" "}
            <div className={classes.main}>
              <Card className={classes.card} variant="outlined">
              <div>
                  <Button>Long Break</Button>
                </div>
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
                  <IconButton variant="contained" onClick={onFinish}>
                    <SkipNextIcon />
                  </IconButton>
                </div>
              </Card>
            </div>
          </React.Fragment>
        )}
      </Timer>
    </div>
  );
}
