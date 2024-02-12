export async function fetchFormEmails() {
  try {
    const response = await fetch(`${process.env.API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if required, such as authentication tokens
      },
      body: JSON.stringify({
        query: `
          query FormEmail {
            formEmail {
              id
              contactEmail
              joinSlackEmail
              newChapterEmail
            }
          }
        `,
      }),
    });

    const responseData = await response.json();

    if (response.ok) {
      return responseData.data.formEmail;
    } else {
      throw new Error(responseData.errors[0].message);
    }
  } catch (error) {
    console.error('Error fetching form email:', error);
    throw error;
  }
}
