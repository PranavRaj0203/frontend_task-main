export const getUsers = () => async dispatch => {
  try{
    const response = await fetch('http://example.com/users')
    const parsedResponse = await response.json()
    dispatch({
      type: 'LIST_USERS',
      payload: parsedResponse
    });
  }catch(e){
    console.log(e);
  }
};
export const addUser = (payload) => async (dispatch) => {
  try {
    const response = await fetch("http://example.com/user", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const parsedResponse = await response.json();

    if (parsedResponse.success) {
      dispatch(getUsers());
    } else {
      console.log('Error in response:', parsedResponse.message);
    }
  } catch (e) {
    console.log('Error during fetch:', e);
  }
};
