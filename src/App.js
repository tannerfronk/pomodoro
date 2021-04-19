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
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(15)


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

  const handleSave = (values) => {
    setPomodoroTime(values.pomoTime)
    setShortBreak(values.shortBreak)
    setLongBreak(values.longBreak)
    console.log(values.pomoTime, values.shortBreak, values.longBreak)
  }

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
          <ListItem button>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText>Report</ListItemText>
          </ListItem>
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
        <div className={classes.btns}>
          <Button>Pomodoro</Button>
          <Button>Short Break</Button>
          <Button>Long Break</Button>
        </div>
        <TheTimer pomoTimeData = {pomodoroTime}/>
        <Tasks />
        <Dialog open={settingsOpen} onClose={handleClickSettingsClose}>
          <Formik
            initialValues={{
              pomoTime: pomodoroTime,
              shortBreak: shortBreak,
              longBreak: longBreak,
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
            })}
            onSubmit={async (values, { setErrors, setstatus, setSubmitting }) => {
              try {
                if(settingsOpen === true) {
                  await handleSave(values);
                } 
                handleClickSettingsClose()
              }
              catch (err) {
                console.log(err)
                setstatus({ success: false });
                setErrors({ submit: err.message});
                setSubmitting(false)
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
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClickSettingsClose}>Cancel</Button>
                  <Button type="submit" >
                    Save
                  </Button>
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
