const fetchGet = async (url) => {
  try {
    const res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!res.ok) {
      throw new Error("error status code server returned is " + res.status);
    }
    const data = await res.json();
    return data;
  }
  catch (err) {
    console.log(err);
  }
}

export default fetchGet;