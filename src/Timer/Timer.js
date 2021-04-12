import React from "react";
import Timer from "react-compound-timer";
import { makeStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";

const useStyles = makeStyles(() => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  time: {
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  minutes: {
    padding: "5rem",
  },
}));

export default function TheTimer() {
  const classes = useStyles();
  return (
    <Timer
      initialTime={1500000}
      startImmediately={false}
      direction="backward"
      onStart={() => console.log("onStart hook")}
      onResume={() => console.log("onResume hook")}
      onPause={() => console.log("onPause hook")}
      onReset={() => console.log("onReset hook")}
    >
      {({ start, pause, reset }) => (
        <React.Fragment>
          <div className={classes.main}>
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
            </div>
          </div>
        </React.Fragment>
      )}
    </Timer>
  );
}
