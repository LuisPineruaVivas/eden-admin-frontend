import { RootState } from "@config/store";
import { IUser } from "@interfaces/models";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  clearUser,
  setToken,
  setProfilePicture
} from "@config/store/reducers/user.slice";

function useUser() {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state.user);

  const user = selector.user;

  const clear = () => {
    dispatch(clearUser());
  };

  const authUpdate = (user: IUser, token?: string) => {
    dispatch(setUser({user}));
    if (token) dispatch(setToken(token));
  };

  const update = (user: IUser) => {
    dispatch(setUser({user}));
  };

  const setAvatar = (avatar: string | null) => {
    dispatch(setProfilePicture(avatar))
  };

  return { user, clear, update, authUpdate, setAvatar };
}

export default useUser;