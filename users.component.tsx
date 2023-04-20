import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
} from '../redux/userSlice';

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    dispatch(getUsersRequest());
    redisClient.get('users', (error, result) => {
      if (error) {
        console.error(error);
      } else if (result) {
        dispatch(getUsersSuccess(JSON.parse(result)));
      } else {
        fetch('/api/users')
          .then(response => response.json())
          .then(data => {
            dispatch(getUsersSuccess(data));
            redisClient.set('users', JSON.stringify(data), error => {
              if (error) {
                console.error(error);
              }
            });
          })
          .catch(error => {
            dispatch(getUsersFailure(error.message));
          });
      }
    });
  }, [dispatch]);

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUserRequest());
    fetch(`/api/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatch(deleteUserSuccess(id));
        // Actualizamos la caché
        redisClient.del('users', error => {
          if (error) {
            console.error(error);
          }
        });
      })
      .catch(error => {
        dispatch(deleteUserFailure(error.message));
      });
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
