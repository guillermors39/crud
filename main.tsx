import { useDispatch } from 'react-redux';
import { getUsersSuccess } from '../redux/userSlice';
import localForage from 'localforage';

export const getServerSideProps = async () => {
  const users = await localForage.getItem('users');
  if (users) {
    const dispatch = useDispatch();
    dispatch(getUsersSuccess(users));
  }
  return {
    props: {},
  };
};
