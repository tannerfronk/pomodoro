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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

const taskList = [];

export default function Tasks() {
  const classes = useStyles();
  const [addOpen, setAddOpen] = useState(false);

  const handleClickAddOpen = () => {
    setAddOpen(true);
  };

  const handleAdd = (values) => {
    taskList.push(values)
    console.log(taskList)
  }

  const handleCloseAdd = () => {
    setAddOpen(false);
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
      <Dialog open={addOpen} onClose={handleCloseAdd}>
        <Formik
          initialValues={{
            taskName: "Task Name",
            estPomodoros: "Estimated Pomodoros",
            projectName: "Project Name",
            notes: "Notes...",
          }}
          validationSchema={Yup.object().shape({
            taskName: Yup.string("Enter task name.").required("Name is required"),
            estPomodoros: Yup.number("Pomodoros"),
            projectName: Yup.string("Enter Project Name"),
            notes: Yup.string(""),
          })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                await handleAdd(values);
                handleCloseAdd();
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
              <DialogTitle>Add Task</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  id="taskName"
                  name="taskName"
                  label="Task Name"
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
                  label="Estimate Pomodoros"
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
                  label="Project Name"
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
                  placeholder="Notes..."
                  rowsMin={3}
                  value={values.notes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.notes && errors.notes)}
                  helperText={touched.notes && errors.notes}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAdd}>Cancel</Button>
                <Button type="submit">Add</Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}
