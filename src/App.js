import React from "react";
import "./App.css";
import "react-dropzone-uploader/dist/styles.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "axios";

class App extends React.Component {
  state = {
    files: "",
    files_names: [],
    drag_drop: "white",
  };
  check = (e) => {
    if (this.state.files === "") {
      e.preventDefault();
    }
    console.log(this.state.files_names);
  };

  fileHandle = (e) => {
    this.setState({
      files: e.target.files,
      files_names: Object.values(e.target.files),
    });
  };

  drag = () => {
    this.setState({ drag_drop: "lightgray" });
  };

  drop = () => {
    this.setState({ drag_drop: "white" });
  };

  sendFile = () => {
    console.log(this.state.files);
    let formData = new FormData();
    formData.append("file", this.state.files[0]);
    axios.post("http://127.0.0.1:5000", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res)=>{alert(res.data)}).catch((res) => {alert(res.response.data)});
    
  };

  render() {
    return (
      <div className="App">
        <section class="transBack">
          <center>
            <div class="formDiv">
              <div
                id="drop"
                onDragOver={this.drag}
                onDragLeave={this.drop}
                onDrop={this.drop}
                style={{ backgroundColor: this.state.drag_drop }}
              >
                <input
                  type="file"
                  name="file"
                  onChange={this.fileHandle}
                  id="files"
                  accept=".rar, .zip, .7zip"
                />
                {this.state.files_names.length === 0 ? (
                  <h3>Drag and drop file or click (.zip, .rar, .7zip)</h3>
                ) : null}
                <table>
                  {this.state.files_names.map((file) => {
                    return (
                      <tr>
                        <th>{file["name"]}</th>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <br></br>
              <AiOutlineCloudUpload
                color="dodgerblue"
                fontSize="35px"
                style={{ cursor: "pointer" }}
                onClick={this.sendFile}
              />
              <input type="file" onChange={this.fileHandle}></input>
            </div>
          </center>
        </section>
        <center>
          <div class="block">
            <h1>aaaa</h1>
          </div>
        </center>
      </div>
    );
  }
}

export default App;
