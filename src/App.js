import { React, useState } from "react";
import "./App.css";
import Tasks from "./Tasks";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  CssBaseline,
  List,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Modal,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TimerIcon from "@material-ui/icons/Timer";
import AssessmentIcon from "@material-ui/icons/Assessment";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import TheTimer from "./Timer/Timer";
import { Formik } from "formik";
import * as Yup from "yup";

const drawerWidth = 240;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  btns: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  timer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 350,
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [finished, setFinished] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  const totalTime = pomodoroCount * pomodoroTime

  console.log(pomodoroTime)

  const handleFinish = () => {
    setFinished(finished + 1);
  };

  const handleFinishUpdatePomodoro = () => {
    setFinished(finished + 1);
    setPomodoroCount(pomodoroCount + 1);
  };

  const resetCount = () => {
    setPomodoroCount(0);
    setFinished(0);
    setSessionCount(0);
  };
  const finishSession = () => {
    setSessionCount(sessionCount + 1);
  };

  const handleRestart = () => {
    setFinished(0);
    finishSession();
  };

  const handleClickSettingsOpen = () => {
    setSettingsOpen(true);
  };

  const handleClickSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleClickLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleClickLoginClose = () => {
    setLoginOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };



  const handleSave = (values) => {
    setPomodoroTime(values.pomoTime);
    setShortBreak(values.shortBreak);
    setLongBreak(values.longBreak);
    console.log(values.pomoTime, values.shortBreak, values.longBreak);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="report-modal">Reports</h2>
      <p>Total Pomodoros: {pomodoroCount}</p>
      <p>Total Sessions: {sessionCount}</p>
      <p>Total Time: {totalTime} minutes</p>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Pomodoro
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText>Timer</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleOpenReport()}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText>Report</ListItemText>
          </ListItem>
          <Modal
            open={openReport}
            onClose={handleCloseReport}
            aria-labelledby="report-modal"
          >
            {body}
          </Modal>
          <ListItem button onClick={() => handleClickSettingsOpen()}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleClickLoginOpen()}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText>Login</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <TheTimer
          pomoTimeData={pomodoroTime}
          shortBreakData={shortBreak}
          longBreakData={longBreak}
          finished={finished}
          pomodoroCount={pomodoroCount}
          sessionCount={sessionCount}
          handleFinishUpdatePomodoro={handleFinishUpdatePomodoro}
          handleFinish={handleFinish}
          resetCount={resetCount}
          handleRestart={handleRestart}
        />
        <Tasks />
        <Dialog open={settingsOpen} onClose={handleClickSettingsClose}>
          <Formik
            initialValues={{
              pomoTime: pomodoroTime,
              shortBreak: shortBreak,
              longBreak: longBreak,
              alarmVolume: 50,
              tickingVolume: 50,
            }}
            validationSchema={Yup.object().shape({
              pomoTime: Yup.number("Please Enter a Number")
                .typeError("Please Enter a Number")
                .required("Required")
                .min(1, "Must be more than 0"),
              shortBreak: Yup.number("Please Enter a Number")
                .typeError("Please Enter a Number")
                .required("Required")
                .min(1, "Must be more than 0"),
              longBreak: Yup.number("Please Enter a Number")
                .typeError("Please Enter a Number")
                .required("Required")
                .min(1, "Must be more than 0"),
              alarmVolume: Yup.number("Please Enter a Number")
                .typeError("Please Enter a Number")
                .required("Required")
                .min(1, "Must be more than 0")
                .max(100, "Cannot be more than 100"),
              tickingVolume: Yup.number("Please Enter a Number")
                .typeError("Please Enter a Number")
                .required("Required")
                .min(1, "Must be more than 0")
                .max(100, "Cannot be more than 100"),
            })}
            onSubmit={async (
              values,
              { setErrors, setstatus, setSubmitting }
            ) => {
              try {
                if (settingsOpen === true) {
                  await handleSave(values);
                }
                handleClickSettingsClose();
              } catch (err) {
                console.log(err);
                setstatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                className={classes.dialogContent}
              >
                <DialogTitle>Settings</DialogTitle>
                <DialogContent>
                  <h3>Time</h3>
                  <TextField
                    id="pomoTime"
                    name="pomoTime"
                    label="Pomodoro Time"
                    type="number"
                    value={values.pomoTime}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.pomoTime && errors.pomoTime)}
                    helperText={touched.pomoTime && errors.pomoTime}
                  />
                  <TextField
                    id="shortBreak"
                    name="shortBreak"
                    label="Short Break"
                    type="number"
                    value={values.shortBreak}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.shortBreak && errors.shortBreak)}
                    helperText={touched.shortBreak && errors.shortBreak}
                  />
                  <TextField
                    id="longBreak"
                    name="longBreak"
                    label="Long Break"
                    type="number"
                    value={values.longBreak}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.longBreak && errors.longBreak)}
                    helperText={touched.longBreak && errors.longBreak}
                  />
                  <h3>Volume</h3>

                  <TextField
                    id="alarmVolume"
                    name="alarmVolume"
                    label="Alarm Volume"
                    type="number"
                    value={values.alarmVolume}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.alarmVolume && errors.alarmVolume)}
                    helperText={touched.alarmVolume && errors.alarmVolume}
                  />
                  <TextField
                    id="tickingVolume"
                    name="tickingVolume"
                    label="Ticking Volume"
                    type="number"
                    value={values.tickingVolume}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(
                      touched.tickingVolume && errors.tickingVolume
                    )}
                    helperText={touched.tickingVolume && errors.tickingVolume}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickSettingsClose}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </Dialog>

        <Dialog open={loginOpen}>
          <DialogTitle>Log In</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                email: "",
                password: "",
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().max(50).required(),
                password: Yup.string().min(8).max(50).required(),
              })}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form noValidate onSubmit={handleSubmit} autoComplete="off">
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    margin="normal"
                    label="Email Address"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <DialogActions>
                    <Button
                      onClick={handleClickLoginClose}
                      variant="contained"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={Boolean(errors.email || errors.password)}
                    >
                      Signup
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
