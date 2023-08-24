import React, { useState } from "react";
import { Grid, TextareaAutosize, Box } from "@mui/material";
import { saveAs } from "file-saver";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormatWithExpand from "./FormatWithExpand"; // Importing a custom component
import Modal from '@mui/material/Modal';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
}

const JSONFormatterV2 = () => {
  const [input, setInput] = useState(""); // State for user input
  const [result, setResult] = useState(""); // State for formatted JSON
  const [spacing, setSpacing] = useState(2); // State for tab spacing
  const [openModal, setOpenModal] = React.useState(false); // State for modal visibility
  const [inputFetchValue, setInputValue] = useState(''); // State for JSON URL input

  // Function to format the input JSON
  const formatJSON = () => {
    try {
      const parseJSON = JSON.parse(input);
      const formatted = JSON.stringify(parseJSON, undefined, spacing);
      setResult(formatted);
    } catch {
      setResult(JSON.stringify("INVALID JSON"));
    }
  };

  // Function to read and set content from uploaded file
  const readFile = (e) => {
    setOpenModal(false)
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setInput(e.target.result);
    };
  };

  // Function to download formatted JSON as a file
  const downloadJSON = () => {
    const blob = new Blob([result], { type: "application/json" });
    saveAs(blob, "data.json");
  };

  // Function to fetch JSON from a URL
  const fetchJSON = () => {
    setOpenModal(false)
    axios.get(`${inputFetchValue}`)
      .then(response => {
        setInput(JSON.stringify(response.data));
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
      });
  };

return (
    <Grid
      container
      spacing={2}
      style={{ maxHeight: "100vh", overflow: "hidden" }}
    >
      {/* Input JSON */}
      <Grid item xs={12} sm={5}>
        <TextareaAutosize
          className="numbered"
          rowsMin={3}
          style={{ width: "100%", height: "500px", overflow: "auto" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Grid>
      {/* Formatting Controls */}
      <Grid item xs={12} sm={2}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          padding="15px"
        >
          <Button variant="contained"  onClick={formatJSON}>
            Format
          </Button>
          <Button variant="contained" onClick={() => navigator.clipboard.writeText(result)}>
            Copy
          </Button>
          {/* Select spacing for formatting */}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tab Space</InputLabel>
            <Select
              value={spacing}
              label="Tab Space"
              onChange={(e) => setSpacing(parseInt(e.target.value))}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
          </FormControl>
          {/* Open the modal for file upload or URL input */}
          <Button variant="contained" onClick={() => setOpenModal(true)}>Upload Data</Button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden onChange={readFile} />
              </Button>
              <TextField
                label="Enter JSON URL"
                fullWidth
                margin="normal"
                value={inputFetchValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={fetchJSON}
              >
                Fetch JSON
              </Button>
            </Box>
          </Modal>
          {/* Download formatted JSON */}
          <Button variant="contained" onClick={downloadJSON}>
            Download
          </Button>
        </Box>
      </Grid>
      {/* Formatted JSON Output */}
      <Grid item xs={12} sm={5} style={{ 
                                      width: "100%", 
                                      height: "500px", 
                                      overflow: "auto",
                                      border: "1px solid gray"
                                      }}>
      {/* Conditionally render the custom component FormatWithExpand */}
      {result.length > 0 && (<FormatWithExpand data={JSON.parse(result)} spacing={spacing} />)}
      </Grid>
    </Grid>
  );
};

export default JSONFormatterV2;
