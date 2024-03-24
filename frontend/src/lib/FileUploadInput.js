import { useState, useContext } from "react";
import { Grid, Button, TextField, LinearProgress } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Axios from "axios";

import { SetPopupContext } from "../App";

const FileUploadInput = (props) => {
  // org file in prj
  const setPopup = useContext(SetPopupContext);

  const { uploadTo, identifier, handleInput } = props;

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleUpload = () => {
    console.log("incoming file data", file);
    console.log("uploadTo", uploadTo);
    const data = new FormData();
    data.append("file", file);
    Axios.post(uploadTo, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json, text/plain, /",
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    })
      .then((response) => {
        console.log(response.data);
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
      })
      .catch((err) => {
        console.log("err  ", err);
        setPopup({
          open: true,
          severity: "error",
          message: "Something unexpected happend. Please try again later",
          // message: err.response.data
          //   ? err.response.data.message
          //   : err.response.statusText,
        });
      });
  };

  return (
    <Grid container item xs={12} direction="column" className={props.className}>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            style={{ width: "100%", height: "100%" }}
          >
            {props.icon}
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                console.log("file eevent", event.target.files);
                setUploadPercentage(0);
                setFile(event.target.files[0]);
              }}
              // onChange={onChange}
              // onChange={
              //   (e) => {}
              //   //   setSource({ ...source, place_img: e.target.files[0] })
              // }
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={props.label}
            value={file ? file.name || "" : ""}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%", height: "100%" }}
            onClick={() => handleUpload()}
            disabled={file ? false : true}
          >
            <CloudUpload />
          </Button>
        </Grid>
      </Grid>
      {uploadPercentage !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Grid>
      ) : null}
    </Grid>
  );
};

// const FileUploadInput_new = (props) => {
//   // mod file in proj
//   const setPopup = useContext(SetPopupContext);
//   const [fileData, setFileData] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const { uploadTo, identifier, handleInput } = props;

//   const handleFileUpload = (event) => {
//     setFileData(event.target.files[0]);
//     console.log("file", fileData);
//     const formData = new FormData();
//     formData.append("file", fileData);
//     Axios.post(uploadTo, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       onUploadProgress: (progressEvent) => {
//         const percentCompleted = Math.round(
//           (progressEvent.loaded * 100) / progressEvent.total
//         );
//         setUploadProgress(percentCompleted);
//       },
//     })
//       .then((response) => {
//         console.log(response);
//         handleInput(identifier, response.data.url);
//         setPopup({
//           open: true,
//           severity: "success",
//           message: response.data.message,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: "Something unexpected happend. Please try again later",
//         });
//       });
//   };

//   return (
//     <Grid container item xs={12} direction="column" className={props.className}>
//       <Grid container item xs={12} spacing={0}>
//         <Grid item xs={3}>
//           <form>
//             <Button
//               variant="contained"
//               color="primary"
//               component="label"
//               startIcon={<CloudUploadIcon />}
//               role={undefined}
//               tabIndex={-1}
//             >
//               Upload
//               <input
//                 type="file"
//                 onChange={handleFileUpload}
//                 style={{ display: "none" }}
//               />
//             </Button>
//           </form>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label={props.label}
//             value={fileData ? fileData.name || "" : ""}
//             InputProps={{
//               readOnly: true,
//             }}
//             variant="outlined"
//             style={{ width: "100%" }}
//           />
//         </Grid>
//         <Grid item xs={3}>
//           test 3 1
//         </Grid>
//       </Grid>
//       {uploadProgress !== 0 ? (
//         <Grid item xs={12} style={{ marginTop: "10px" }}>
//           <LinearProgress variant="determinate" value={uploadProgress} />
//         </Grid>
//       ) : null}
//     </Grid>
//   );
// };

// const FileUploadInput_ref = (props) => {
//   // git file
//   const setPopup = useContext(SetPopupContext);

//   const { uploadTo, identifier, handleInput } = props;

//   const [file, setFile] = useState("");
//   const [uploadPercentage, setUploadPercentage] = useState(0);

//   const handleUpload = () => {
//     console.log(file);
//     const data = new FormData();
//     data.append("file", file);
//     Axios.post(uploadTo, data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       onUploadProgress: (progressEvent) => {
//         setUploadPercentage(
//           parseInt(
//             Math.round((progressEvent.loaded * 100) / progressEvent.total)
//           )
//         );
//       },
//     })
//       .then((response) => {
//         console.log(response.data);
//         handleInput(identifier, response.data.url);
//         setPopup({
//           open: true,
//           severity: "success",
//           message: response.data.message,
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//         console.log(err);
//         setPopup({
//           open: true,
//           severity: "error",
//           message: "Something unexpected happend. Please try again later",
//         });
//       });
//   };

//   return (
//     <Grid container item xs={12} direction="column" className={props.className}>
//       <Grid container item xs={12} spacing={0}>
//         <Grid item xs={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             component="label"
//             style={{ width: "100%", height: "100%" }}
//           >
//             {props.icon}
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={(event) => {
//                 console.log(event.target.files);
//                 setUploadPercentage(0);
//                 setFile(event.target.files[0]);
//               }}
//               // onChange={onChange}
//               // onChange={
//               //   (e) => {}
//               //   //   setSource({ ...source, place_img: e.target.files[0] })
//               // }
//             />
//           </Button>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label={props.label}
//             value={file ? file.name || "" : ""}
//             InputProps={{
//               readOnly: true,
//             }}
//             variant="outlined"
//             style={{ width: "100%" }}
//           />
//         </Grid>
//         <Grid item xs={3}>
//           <Button
//             variant="contained"
//             color="secondary"
//             style={{ width: "100%", height: "100%" }}
//             onClick={() => handleUpload()}
//             disabled={file ? false : true}
//           >
//             <CloudUpload />
//           </Button>
//         </Grid>
//       </Grid>
//       {uploadPercentage !== 0 ? (
//         <Grid item xs={12} style={{ marginTop: "10px" }}>
//           <LinearProgress variant="determinate" value={uploadPercentage} />
//         </Grid>
//       ) : null}
//     </Grid>
//   );
// };

export default FileUploadInput;
