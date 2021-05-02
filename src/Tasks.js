import { React, useState } from "react";
import "./App.css";
import {
  Divider,
  IconButton,
  TextField,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  TextareaAutosize,
  Card,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import ColorPickerButton from './colorPicker'
// import { render } from "@testing-library/react";

const useStyles = makeStyles({
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  cards: {
    border: "red",
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

let taskList = []; // to store task objects in
let activeTask = []; // to store currently active task to easily reference
let completedTasks = [] // to store completed tasks separately
let localStorageItem

if(Boolean(localStorage.getItem('pomoTaskList')) === true){
  let tempGrab = localStorage.getItem('pomoTaskList') // to store task objects in
  let parseGrab = JSON.parse(tempGrab)
  console.log('Localstorage Fetch: ')
  console.log(parseGrab)
  taskList = parseGrab.tlLocal
  completedTasks = parseGrab.ctLocal
}

export default function Tasks({pomoCount}) {
  const classes = useStyles();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const [complete, setComplete] = useState(false)
  const [color, setColor] = useState(null)

  const setLocalStorage = () =>{
    localStorageItem = {tlLocal: taskList, ctLocal: completedTasks}
    localStorage.setItem('pomoTaskList', JSON.stringify(localStorageItem))
  }

  const sendColorData = (colorChoice, i) =>{
    setEditId(i)
    setColor(colorChoice)
  }

  const handleClickAddOpen = () => {
    setAddOpen(true);
  };

  const handleClickEditOpen = (i) => { //set editId and edit state
    setEditId(i)
    setEditOpen(true);
  }

  function RenderTasks(){ //create tasks in cards

    const classes = useStyles();

    let incompleteList = taskList.map((task, i) => (
      <Card key={i} className={classes.cards}>
        <h3>Task: {task.values.taskName}</h3>
        <p>Estimated Pomodoros: {task.values.estPomodoros}</p>
        {task.values.active !== false ? <p>Actual Pomodoros: {pomoCount}</p> : <p>Actual Pomodoros: {taskList[i].values.actPomodoros} </p>}
        <p>Project Name: {task.values.projectName}</p>
        <p>Notes: {task.values.notes}</p>
        <DialogActions>
          {task.values.active === false ? <Button id={"setActiveBtn"+i} onClick={() => handleSetActive(i)}>Set Active</Button> : ""}
          <Button onClick={() => handleClickEditOpen(i)}>Edit</Button>
          <Button onClick={() => handleDelete(i)}>Delete</Button>
          <Button onClick={() => handleComplete(i)}>Complete</Button>
        </DialogActions>
      </Card>
    ))

    let completeList = completedTasks.map((task, i) => (
      <Card key={i} className={classes.cards}>
        <h3>Task: {task.values.taskName}</h3>
        <p>Estimated Pomodoros: {task.values.estPomodoros}</p>
        <p>Actual Pomodoros: {task.values.actPomodoros == 0 ? 'N/A' : task.values.actPomodoros}</p>
        <p>Project Name: {task.values.projectName}</p>
        <p>Notes: {task.values.notes}</p>
      </Card>
    ))

    if(taskList <= 0 && completedTasks <= 0) {
      return(
        <h3>No Tasks available, add one!</h3>
      )
    } else{
      return(
        <div>
        <div>
        <h2>In Progress Tasks:</h2>
        {incompleteList}
        </div>
        <div>
        <h2>Completed Tasks:</h2>
        {completeList}
        </div>
        </div>
      )
    }
  }

  const handleAdd = (values) => { //adds id to task and pushes obj to taskList
    let previousId;
    let id = 0;
    if(taskList.length === 0){
      previousId = 0;
    } else {
      previousId = taskList.length - 1
      id = previousId + 1;
    }
    taskList.push({id, values})
    setLocalStorage()
  }

  const handleSetActive = (i) => {
    activeTask = [taskList[i]];
    resetActive(i).then(
        taskList[i].values.active = true
    )
    let activeBtn = document.getElementById("setActiveBtn" + i)//makes current active task setActiveBtn disappear
    activeBtn.style.display = "none"
    activeTask = [taskList[i]];
    setEditId(i)//setting EditId to keep things consistent with other functions
    setLocalStorage()
  }

  async function resetActive(i) {
    await taskList.forEach(task => task.values.active = false)
  }

  const handleEdit = (values) => { //replaces objects values upon edit
    taskList[editId].values = values
  }
  const handleDelete = (i) => { //will delete selected task
    setEditId(i)
    setConfirm(true)
  }
  const handleComplete = (i) => {//grabs id for current task
    setEditId(i)
    setComplete(true)
    setLocalStorage()
  }
  const completeTask = () => {//will mark task as complete
    let actPomodoros = pomoCount // replace this with var passed from Timer.js
    taskList[editId].values.actPomodoros = actPomodoros
    taskList[editId].values.complete = true
    setComplete(false)
    completedTasks.push(taskList[editId])
    taskList.splice(editId, 1)
    setLocalStorage()
  }
  const confirmDelete = () => {
    taskList.splice(editId, 1)
    setLocalStorage()
    setConfirm(false)
  }

  const handleClose = () => { //closes edit or add task dialogs
    setAddOpen(false);
    setEditOpen(false);
    setConfirm(false);
    setComplete(false);
    setLocalStorage()
  };

  return (
    <div>
      <div className={classes.taskHeader}>
        <h1>Tasks</h1>
        <IconButton onClick={() => handleClickAddOpen()}>
          <AddIcon />
        </IconButton>
      </div>
      <Divider />
      <Dialog open={addOpen || editOpen} onClose={handleClose}>
        <Formik
          initialValues={{
            taskName: "Task Name",
            estPomodoros: 5,
            projectName: "New Project",
            notes: "Notes...",
            complete: false,
            actPomodoros: 0,
            color: '#bbdefe',
            active: false,
          }}
          validationSchema={Yup.object().shape({
            taskName: Yup.string("Enter task name.").required("Name is required"),
            estPomodoros: Yup.number("Please Enter a Number")
            .typeError("Please Enter a Number")
            .required("Required")
            .min(1, "Must be more than 0"),
            projectName: Yup.string("Enter Project Name"),
            notes: Yup.string(""),
            actPomodoros: Yup.number("Pomodoros")
          })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                if(addOpen === true){
                  await handleAdd(values);
                } else {
                  await handleEdit(values);
                }
                handleClose();
              } catch (err) {
                console.error(err);
                setStatus({ success: false });
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
              <DialogTitle>{editOpen === false ? "Add Task" : "Editing Task: " + taskList[editId].values.taskName}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  id="taskName"
                  name="taskName"
                  label={editOpen === false ? "Task Name" : taskList[editId].values.taskName}
                  defaultValue={editOpen === false ? "" : taskList[editId].values.taskName}
                  type="text"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.taskName && errors.taskName)}
                  helperText={touched.taskName && errors.taskName}
                />
                <TextField
                  id="estPomodoros"
                  name="estPomodoros"
                  label="Estimated Pomodoros"
                  type="number"
                  fullWidth
                  defaultValue={editOpen === false ? values.estPomodoros : parseInt(taskList[editId].values.estPomodoros)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.estPomodoros && errors.estPomodoros)}
                  helperText={touched.estPomodoros && errors.estPomodoros}
                />
                <TextField
                  id="projectName"
                  name="projectName"
                  label="Project Name"
                  type="text"
                  fullWidth
                  defaultValue={editOpen === false ? "New Project" : taskList[editId].values.projectName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.projectName && errors.projectName)}
                  helperText={touched.projectName && errors.projectName}
                />
                <TextareaAutosize
                  id="notes"
                  name="notes"
                  label="Notes"
                  rowsMin={3}
                  defaultValue={editOpen === false ? "Notes..." : taskList[editId].values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.notes && errors.notes)}
                  helperText={touched.notes && errors.notes}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button><ColorPickerButton></ColorPickerButton></Button>
                <Button type="submit">{editOpen === false ? "Add" : "Edit"}</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <div className={classes.cardsContainer}>
      <RenderTasks />
      </div>
      <Dialog open={confirm} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete {confirm === false ? "" : taskList[editId].values.taskName}?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={complete} onClose={handleClose}>
        <DialogTitle>How many Pomodoros did it take to complete {complete === false ? "" : taskList[editId].values.projectName}?</DialogTitle>
        <DialogContent>
        <TextField
                  id="actPomodoros"
                  name="actPomodoros"
                  label="Actual Pomodoros"
                  type="number"
                  defaultValue={complete === false ? "Actual Pomodoros" : pomoCount}
                  fullWidth
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={completeTask}>Complete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
