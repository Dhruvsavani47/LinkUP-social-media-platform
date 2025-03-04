export const checkImage = (file) => {
    let err = "";

    if (!file) {
        return err = "File not found"
    }
    if (file.size > 1024 * 1024 * 2) {
        return err = "File size should be less than 2 mb";
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return err = "File format should be jpeg or png";
    }
}

export const imageupload = async (image) => {
    console.log(image);
    let imgArr = [];

    for (const item of image) {
        const formData = new FormData();

        if (item.camera) {
            formData.append('file', item.camera);
        } else {
            formData.append('file', item);
        }
        
        formData.append('upload_preset', "Social")
        formData.append('cloud_name', "dcmmyuypc")

        const res = await fetch('https://api.cloudinary.com/v1_1/dcmmyuypc/upload', {
            method: "POST",
            body: formData
        })

        const data = await res.json();
        imgArr.push({ public_id: data.public_id, secure_url: data.secure_url });

    }
    return imgArr;
}