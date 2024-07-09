import { useState } from "react";
import { ACTION_OPTIONS } from "../../constants/actionOptionsConstants";
import { UniversalBtn } from "../UniversalBtn/UniversalBtn";
import css from "./AuthNav.module.css";
import Modal from "../Modal/Modal";
import { AuthForm } from "../AuthForm/AuthForm";
import { UNIVESAL_BUTTON_CLASSES } from "../../constants/universalButtonConstants";
import { ModalContentWrapper } from "../ModalContentWrapper/ModalContentWrapper";

export const AuthNav = () => {
  const [showModal, setShowModal] = useState(false);
  const [actionOption, setActionOption] = useState({});

  const handleSignInClick = () => {
    setActionOption(ACTION_OPTIONS.signIn);
    setShowModal(true);
  };

  const handleSignUpClick = () => {
    setActionOption(ACTION_OPTIONS.signUp);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.wrapper}>
      <UniversalBtn
        onClick={handleSignInClick}
        width={124}
        btnClass={UNIVESAL_BUTTON_CLASSES.btnTransparent}
      >
        {ACTION_OPTIONS.signIn.title}
      </UniversalBtn>

      <UniversalBtn onClick={handleSignUpClick} width={172}>
        {ACTION_OPTIONS.signUp.title}
      </UniversalBtn>

      {showModal && (
        <Modal onClose={handleCloseModal}>
          <ModalContentWrapper
            actionOption={actionOption}
            onClose={handleCloseModal}
          >
            <AuthForm actionOption={actionOption} />
          </ModalContentWrapper>
        </Modal>
      )}
    </div>
  );
};
