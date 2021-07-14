import React, {useEffect, useState} from "react";
import {Avatar} from "@material-ui/core";

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => (resolve(reader.result));
    reader.onerror = error => reject(error);
})

export const AvatarPreview = (props) => {
    let { file, classes } = props;
    const [preview, setPreview] = useState(file);

    useEffect(() => {
        if(!!file){
            let reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }, [file])

    return(
        <div>
            {!!preview
                ? <Avatar src={preview} className={classes}/>
                : null
            }
        </div>
    )
}