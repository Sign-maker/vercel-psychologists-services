import { toast } from "react-toastify";
import { ACTION_OPTIONS } from "../../constants/actionOptionsConstants";
import { UNIVESAL_BUTTON_CLASSES } from "../../constants/universalButtonConstants";
import { useAuth } from "../../hooks/useAuth";
import { UniversalBtn } from "../UniversalBtn/UniversalBtn";
import css from "./LogOutForm.module.css";

export const LogOutForm = ({ onClose }) => {
  const { signOutUser, isUserLoading, user } = useAuth();

  const handleLogOut = async () => {
    try {
      await signOutUser();
      toast.success(`User ${user.displayName} was succesfully logged out.`);
    } catch (error) {
      toast.error(`Ooops, something went wrong! ${error.message}`);
    }
  };

  return (
    <div className={css.wrapper}>
      <UniversalBtn onClick={handleLogOut} height={48} width={150}>
        {ACTION_OPTIONS.signOut.title}
      </UniversalBtn>
      <UniversalBtn
        isLoading={isUserLoading}
        btnClass={UNIVESAL_BUTTON_CLASSES.btnTransparent}
        onClick={onClose}
        height={48}
        width={150}
      >
        Cancel
      </UniversalBtn>
    </div>
  );
};
