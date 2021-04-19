// import { React, useState } from "react";
// import "./App.css";
// import {
// //   Divider,
// //   IconButton,
//   TextField,
//   DialogActions,
//   Button,
// //   DialogTitle,
//   DialogContent,
//   Dialog,
//   TextareaAutosize,
// //   Card,
// } from "@material-ui/core";
// // import AddIcon from "@material-ui/icons/Add";
// import { Formik } from "formik";
// import * as Yup from "yup";


// export default function Settings(props) {
  
//   const handleClickSettingsOpen = () => {
//     setSettingsOpen(true);
//   };

//   const handleClose = () => { //closes edit or add task dialogs
//     setSettingsOpen(false);
//   };
  
//   return (
//     <div>
//      <button onClick={props.openSettings}>Settings</button>

//       <Dialog open={settingsOpen} onClose={handleClose}>
//         <Formik
//           initialValues={{
//             taskName: "Task Name",
//             estPomodoros: "Estimated Pomodoros",
//             projectName: "Project Name",
//             notes: "Notes...",
//           }}
//           validationSchema={Yup.object().shape({
//             taskName: Yup.string("Enter task name.").required("Name is required"),
//             estPomodoros: Yup.number("Pomodoros"),
//             projectName: Yup.string("Enter Project Name"),
//             notes: Yup.string(""),
//           })}
//             onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//             //   try {
//             //     if(settingsOpen === true){
//             //       await handleAdd(values);
//             //     } else {
//             //       await handleEdit(values);
//             //     }
//             //     handleClose();
//             //   } catch (err) {
//             //     console.error(err);
//             //     setStatus({ success: false });
//             //     setErrors({ submit: err.message });
//             //     setSubmitting(false);
//             //   }
//             }}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//           }) => (
//             <form
//               noValidate
//               autoComplete="off"
//               onSubmit={handleSubmit}
//             >
//               {/* <DialogTitle>{editOpen === false ? "Add Task" : "Editing Task: " + taskList[editId].values.taskName}</DialogTitle> */}
//               <DialogContent>
//                 <TextField
//                   autoFocus
//                   id="Pomodoro Time"
//                   name="pomodoroTime"
//                 //   label={editOpen === false ? "Task Name" : taskList[editId].values.taskName}
//                   type="text"
//                   fullWidth
//                   value={values.pomodoroTime}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={Boolean(touched.pomodoroTime && errors.pomodoroTime)}
//                   helperText={touched.pomodoroTime && errors.pomodoroTime}
//                 />
//                 <TextField
//                   id="estPomodoros"
//                   name="estPomodoros"
//                 //   label={editOpen === false ? "Estimate Pomodoros" : taskList[editId].values.estPomodoros}
//                   type="number"
//                   fullWidth
//                   value={values.estPomodoros}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={Boolean(touched.estPomodoros && errors.estPomodoros)}
//                   helperText={touched.estPomodoros && errors.estPomodoros}
//                 />
//                 <TextField
//                   id="projectName"
//                   name="projectName"
//                 //   label={editOpen === false ? "Project Name" : taskList[editId].values.projectName}
//                   type="text"
//                   fullWidth
//                   value={values.projectName}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={Boolean(touched.projectName && errors.projectName)}
//                   helperText={touched.projectName && errors.projectName}
//                 />
//                 <TextareaAutosize
//                   id="notes"
//                   name="notes"
//                   label="Notes"
//                 //   placeholder={editOpen === false ? "" : taskList[editId].values.projectName}
//                   rowsMin={3}
//                   value={values.notes}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   error={Boolean(touched.notes && errors.notes)}
//                   helperText={touched.notes && errors.notes}
//                 />
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 {/* <Button type="submit">{editOpen === false ? "Add" : "Edit"}</Button> */}
//               </DialogActions>
//             </form>
//           )}
//         </Formik>
//       </Dialog>
//     </div>
//   );
// }
