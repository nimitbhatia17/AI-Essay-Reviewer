import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { setAuth, finishInitialLoad } from "@/redux/features/authSlice";

export default function useVerify() {
  const [verify] = useVerifyMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then((data) => {
        dispatch(setAuth(data));
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, []);
  return <></>;
}
