import axios from 'axios';
import { getUsers, userDelete, resetError, setError } from '../slices/admin';

export const getAllUsers = () => async (dispatch, getState) => {
  const {
    order: { shippingAddress },
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get('api/users', config);
    dispatch(getUsers(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'No se han podido encontrar usuarios.'
      )
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  const {
    order: { shippingAddress },
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.delete(`api/users/${id}`, config);
    dispatch(userDelete(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'El usuario no ha podido ser borrado.'
      )
    );
  }
};

export const resetErrorAndRemoval = () => async(dispatch) => {
  dispatch(resetError());
}
