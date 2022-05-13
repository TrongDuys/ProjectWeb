
export const imageUpload = async (images) => {
    let imgArr = [];
    for (const item of images) {
      const formData = new FormData();
  
      if (item.camera) {
        formData.append('file', item.camera);
      } else {
        formData.append('file', item);
      }
  
      formData.append('upload_preset', 'hab7fpez');
      formData.append('cloud_name', 'dnfydoll0');
  
      const res = await fetch('https://api.cloudinary.com/v1_1/dnfydoll0/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await res.json();
      imgArr.push({public_id: data.public_id, fileName: data.original_filename, url: data.secure_url });
    
    }
    return imgArr;
  };