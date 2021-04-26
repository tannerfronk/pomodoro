import React, { useState } from "react";
import Timer from "react-compound-timer";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Card, Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShortBreak from "../ShortBreak/ShortBreak";
import LongBreak from "../LongBreak/LongBreak";

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
  pomodoroCount: {
    textAlign: "center",
  },
}));

export default function TheTimer({
  pomoTimeData,
  shortBreakData,
  longBreakData,
}) {
  const classes = useStyles();
  const [finished, setFinished] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const pomoTime = pomoTimeData * 60 * 1000;
  const shortBreak = shortBreakData * 60 * 1000;
  const longBreak = longBreakData * 60 * 1000;

  const handleFinish = () => {
    setFinished(finished + 1);
  };

  const handleFinishUpdatePomodoro = () => {
    setFinished(finished + 1);
    setPomodoroCount(pomodoroCount + 1);
  };

  const resetCount = () => {
    setPomodoroCount(0);
  };

  const handleRestart = () => {
    setFinished(0);
  };

  if (finished === 0) {
    return (
      <div key={pomoTimeData}>
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
              time: 0,
              callback: () => handleFinishUpdatePomodoro(),
            },
          ]}
        >
          {({ start, pause, reset }) => (
            <React.Fragment>
              {" "}
              <div className={classes.main}>
                <Card className={classes.card} variant="outlined">
                  <div>
                    <Button>Pomodoro 1</Button>
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
                    <IconButton
                      variant="contained"
                      onClick={handleFinishUpdatePomodoro}
                    >
                      <SkipNextIcon />
                    </IconButton>
                  </div>
                </Card>
              </div>
            </React.Fragment>
          )}
        </Timer>{" "}
        <div className={classes.pomodoroCount}>
          <h2>Pomodoro Count: {pomodoroCount}</h2>{" "}
          <Button variant="contained" onClick={resetCount}>
            Reset Count
          </Button>
        </div>
      </div>
    );
  } else if (finished === 1) {
    return (
      <div key={pomoTimeData}>
        <ShortBreak
          onFinish={handleFinish}
          finished={finished}
          shortBreakData={shortBreak}
        />{" "}
        <div className={classes.pomodoroCount}>
          <h2>Pomodoro Count: {pomodoroCount}</h2>{" "}
          <Button variant="contained" onClick={resetCount}>
            Reset Count
          </Button>
        </div>
      </div>
    );
  } else if (finished === 2) {
    return (
      <div key={pomoTimeData}>
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
              time: 0,
              callback: () => handleFinishUpdatePomodoro(),
            },
          ]}
        >
          {({ start, pause, reset }) => (
            <React.Fragment>
              {" "}
              <div className={classes.main}>
                <Card className={classes.card} variant="outlined">
                  <div>
                    <Button>Pomodoro 2</Button>
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
                    <IconButton
                      variant="contained"
                      onClick={handleFinishUpdatePomodoro}
                    >
                      <SkipNextIcon />
                    </IconButton>
                  </div>
                </Card>
              </div>
            </React.Fragment>
          )}
        </Timer>
        <div className={classes.pomodoroCount}>
          <h2>Pomodoro Count: {pomodoroCount}</h2>{" "}
          <Button variant="contained" onClick={resetCount}>
            Reset Count
          </Button>
        </div>
      </div>
    );
  } else if (finished === 3) {
    return (
      <div key={pomoTimeData}>
        <ShortBreak
          onFinish={handleFinish}
          finished={finished}
          shortBreakData={shortBreak}
        />{" "}
        <div className={classes.pomodoroCount}>
          <h2>Pomodoro Count: {pomodoroCount}</h2>{" "}
          <Button variant="contained" onClick={resetCount}>
            Reset Count
          </Button>
        </div>
      </div>
    );
  } else if (finished === 4) {
    return (
      <div key={pomoTimeData}>
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
              time: 0,
              callback: () => handleFinishUpdatePomodoro(),
            },
          ]}
        >
          {({ start, pause, reset }) => (
            <React.Fragment>
              {" "}
              <div className={classes.main}>
                <Card className={classes.card} variant="outlined">
                  <div>
                    <Button>Pomodoro 3</Button>
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
                    <IconButton
                      variant="contained"
                      onClick={handleFinishUpdatePomodoro}
                    >
                      <SkipNextIcon />
                    </IconButton>
                  </div>
                </Card>
              </div>
            </React.Fragment>
          )}
        </Timer>{" "}
        <div className={classes.pomodoroCount}>
          <h2>Pomodoro Count: {pomodoroCount}</h2>{" "}
          <Button variant="contained" onClick={resetCount}>
            Reset Count
          </Button>
        </div>
      </div>
    );
  } else if (finished === 5) {
    return (
      <div key={pomoTimeData}>
        <ShortBreak
          onFinish={handleFinish}
          finished={finished}
          shortBreakData={shortBreak}
        />{" "}
        <div className={classes.pomodoroCount}>
          <h2>Pomodoro Count: {pomodoroCount}</h2>{" "}
          <Button variant="contained" onClick={resetCount}>
            Reset Count
          </Button>
        </div>
      </div>
    );
  } else if (finished === 6) {
    return (
      <div key={pomoTimeData}>
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
              time: 0,
              callback: () => handleFinishUpdatePomodoro(),
            },
          ]}
        >
          {({ start, pause, reset }) => (
            <React.Fragment>
              {" "}
              <div className={classes.main}>
                <Card className={classes.card} variant="outlined">
                  <div>
                    <Button>Pomodoro 4</Button>
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
                    <IconButton
                      variant="contained"
                      onClick={handleFinishUpdatePomodoro}
                    >
                      <SkipNextIcon />
                    </IconButton>
                  </div>
                </Card>
              </div>
            </React.Fragment>
          )}
        </Timer>{" "}
        <div className={classes.pomodoroCount}>
          <h2>Pomodoro Count: {pomodoroCount}</h2>{" "}
          <Button variant="contained" onClick={resetCount}>
            Reset Count
          </Button>
        </div>
      </div>
    );
  } else if (finished === 7) {
    return (
      <div key={pomoTimeData}>
        <LongBreak
          onFinish={handleRestart}
          finished={finished}
          longBreakData={longBreak}
        />{" "}
        <div className={classes.pomodoroCount}>
          <h2>Pomodoro Count: {pomodoroCount}</h2>{" "}
          <Button variant="contained" onClick={resetCount}>
            Reset Count
          </Button>
        </div>
      </div>
    );
  }
}
