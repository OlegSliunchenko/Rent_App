import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button';

const FileUploader = (props:any) => {
  const [imgState, setImgState] = useState({selectedFile: null})
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
       // @ts-ignore
    hiddenFileInput.current.click();

    const data = new FormData();
    // @ts-ignore
    data.append('file', imgState.selectedFile);
    axios.post("http://localhost:8000/upload", data, {
    })
      .then(res => {
          console.log(res.statusText)
      })
     };

    const handleChange = (event:any) => {
            setImgState({selectedFile: event.target.files[0]})
        };

  return (
    <>
      <Button handler={handleClick} name={'Upload'} divStyle={'addButtonStyle buttonDefault'}/>
      <input
        type="file"
        name={'file'}
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
}
export default FileUploader;