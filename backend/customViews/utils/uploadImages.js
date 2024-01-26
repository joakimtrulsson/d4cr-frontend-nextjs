import FormData from 'form-data';

export async function uploadImages([newFile1, newFile2, newFile3], id) {
  // Om Files1, files2 eller files3 finns så ladda upp dem
  const filesToUpload = [newFile1, newFile2, newFile3].filter((file) => file);

  if (filesToUpload.length === 0) {
    return;
  }

  const formData = new FormData();

  filesToUpload.forEach((file, index) => {
    formData.append('image', file.file);
  });

  formData.append('id', id);

  try {
    const response = await fetch('http://localhost:3000/api/imageupload', {
      method: 'PATCH',
      headers: {
        ...(formData instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: formData,
    });

    const data = await response.json();

    if (data.success === 'true') {
      return data.imageUrls;
    }
  } catch (error) {
    return error.message;
  }
}
