import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useVerifyMutation } from "@/redux/features/authApiSlice";
import { setAuth, finishInitialLoad } from "@/redux/features/authSlice";

export default function useVerify() {
  const [verify] = useVerifyMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    verify()
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, []);
  return <></>;
}
