import { useSelector} from 'react-redux';

const ShowTo = ({ children, role, reviewUserId }) => {
  const currentUser = useSelector(state => state.users.user);
  if ((currentUser&&currentUser.role === role) || (currentUser&&currentUser._id === reviewUserId)) {
    return children;
  }
  return null;
};

export default ShowTo;
