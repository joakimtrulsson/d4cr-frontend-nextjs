export async function uploadImage(file, id) {
  if (!file) {
    return;
  }

  const formData = new FormData();
  formData.append('image', file.file);
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
