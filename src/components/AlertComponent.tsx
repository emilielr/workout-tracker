import { Alert } from "@material-ui/lab";
import { Dispatch, SetStateAction } from "react";
import { alertEnum } from "../utils/enums";

type Props = {
  severity: alertEnum;
  message: string;
  setOpenAlert: Dispatch<SetStateAction<boolean>>;
};

export const AlertComponent = ({ severity, message, setOpenAlert }: Props) => {
  return (
    <Alert severity={severity} onClose={() => setOpenAlert(false)}>
      {message}
    </Alert>
  );
};
