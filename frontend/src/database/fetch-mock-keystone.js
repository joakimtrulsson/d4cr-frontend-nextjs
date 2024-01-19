const [data, setData] = useState([]);

// fetch data from keystone
const result = async () => {
  
  try {
    const response = await fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
         query Chapters {
                    chapters {
                        id
                        title
                    }
                }            `,
      }),
    });

    const data = await response.json();
    setData(data.data.chapters);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
