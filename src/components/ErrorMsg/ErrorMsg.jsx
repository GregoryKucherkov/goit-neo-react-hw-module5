import css from "./ErrorMsg.module.css";

function ErrorMessage() {
  return (
    <div className={css.errorMsg}>
      The error occured, don&apos;t worry, try reloading the page!
    </div>
  );
}

export default ErrorMessage;
