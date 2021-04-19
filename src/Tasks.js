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
    maxWidth: 1000,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

const taskList = []; // to store task objects in

export default function Tasks() {
  const classes = useStyles();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(0)

  const handleClickAddOpen = () => {
    setAddOpen(true);
  };

  const handleClickEditOpen = (i) => { //set editId and edit state
    setEditId(i)
    setEditOpen(true);
  }

  function RenderTasks(){ //create tasks in cards

    const classes = useStyles();
  
    let fullList = taskList.map((task, i) => (
      <Card key={i} className={classes.cards}>
        <h3>Task: {task.values.taskName}</h3>
        <p>Estimated Pomodoros: {task.values.estPomodoros}</p>
        <p>Project Name: {task.values.projectName}</p>
        <p>Notes: {task.values.notes}</p>
        <DialogActions>
          <Button onClick={() => handleClickEditOpen(i)}>Edit</Button>
          <Button onClick={() => handleDelete(i)}>Delete</Button>
        </DialogActions>
      </Card>
    ))
  
    if(taskList <= 0) {
      return(
        <h3>No Tasks available, add one!</h3>
      )
    } else{
      return(
        fullList
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
  }

  const handleEdit = (values) => { //replaces objects values upon edit
    taskList[editId].values = values
  }
  const handleDelete = (i) => { //will delete selected task
    taskList.splice(i, 1)
  }

  const handleClose = () => { //closes edit or add task dialogs
    setAddOpen(false);
    setEditOpen(false);
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
            taskName: "",
            estPomodoros: "",
            projectName: "",
            notes: "",
          }}
          validationSchema={Yup.object().shape({
            taskName: Yup.string("Enter task name.").required("Name is required"),
            estPomodoros: Yup.number("Please Enter a Number")
            .typeError("Please Enter a Number")
            .required("Required")
            .min(1, "Must be more than 0"),
            projectName: Yup.string("Enter Project Name"),
            notes: Yup.string(""),
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
                  label={editOpen === false ? "Estimate Pomodoros" : taskList[editId].values.estPomodoros}
                  type="number"
                  fullWidth
                  value={values.estPomodoros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.estPomodoros && errors.estPomodoros)}
                  helperText={touched.estPomodoros && errors.estPomodoros}
                />
                <TextField
                  id="projectName"
                  name="projectName"
                  label={editOpen === false ? "Project Name" : taskList[editId].values.projectName}
                  type="text"
                  fullWidth
                  value={values.projectName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.projectName && errors.projectName)}
                  helperText={touched.projectName && errors.projectName}
                />
                <TextareaAutosize
                  id="notes"
                  name="notes"
                  label="Notes"
                  placeholder={editOpen === false ? "" : taskList[editId].values.projectName}
                  rowsMin={3}
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.notes && errors.notes)}
                  helperText={touched.notes && errors.notes}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">{editOpen === false ? "Add" : "Edit"}</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <div className={classes.cardsContainer}>
      <RenderTasks />
      </div>
    </div>
  );
}
