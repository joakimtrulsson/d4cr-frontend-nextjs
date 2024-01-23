export async function deleteImages(files) {
  if (!files) {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/delete-images', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(files),
    });

    const data = await response.json();

    if (data.success === true) {
      return true;
    }
  } catch (error) {
    return error.message;
  }
}
