import useModal from "./useModal";

export function useTryCatch() {
  const { openErrorModal } = useModal();

  async function tryWithErrorHandler(main: Function) {
    try {
      return await main();
    } catch (e) {
      if (e instanceof Error) {
        openErrorModal(e.message);
      } else {
        openErrorModal(JSON.stringify(e));
      }
    }
  }

  return {
    tryWithErrorHandler,
  };
}
