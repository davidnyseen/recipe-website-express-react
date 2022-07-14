const fetchPost = (url, value) => {
    return fetch(url, {  
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({value}),
    })
    // .then(res => {if(!res.ok){throw new Error(res.status)}})
  };
export default fetchPost;