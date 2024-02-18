import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

export interface ModalState {
  open: boolean;
  type: "info" | "error" | "success";
  text: string;
}

export default function useModal() {
  const { setModalState } = useContext(GlobalContext);

  function openInfoModal(text: string) {
    setModalState({
      type: "info",
      text,
      open: true,
    });
  }

  function openErrorModal(text: string) {
    setModalState({
      type: "error",
      text,
      open: true,
    });
  }

  function openSuccessModal(text: string) {
    setModalState({
      type: "success",
      text,
      open: true,
    });
  }

  return { openInfoModal, openErrorModal, openSuccessModal };
}
