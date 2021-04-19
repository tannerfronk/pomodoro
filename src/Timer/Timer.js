import React from "react";
import Timer from "react-compound-timer";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Card } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";

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

export default function TheTimer({pomoTimeData}) {
  const classes = useStyles();

  const pomoTime = pomoTimeData*60*1000

  return (
    <div key={pomoTimeData}>
    <Timer
      initialTime={pomoTime}
      startImmediately={false}
      direction="backward"
      timeToUpdate='10' 
      onStart={() => console.log("onStart hook")}
      onResume={() => console.log("onResume hook")}
      onPause={() => console.log("onPause hook")}
      onReset={() => console.log("onReset hook")}
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
              </div>
            </Card>
          </div>
        </React.Fragment>
      )}
    </Timer>
    </div>
  );
}
