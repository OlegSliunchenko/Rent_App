import React from "react";
import '../css/uploadForm.css'

export default function FileUploader(props:any) {
        const onInputChange = (e: any) => {
        props.setFiles(e.target.files[0]);
    }
    return (<>
            <input
                onChange={onInputChange}
                type="file"
                className="form-control"
                multiple={false}
            />
        </>
    );
};
