import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

function NotFound() {
  return (
    <div className={css.notFound}>
      <h1>404 Not Found</h1>
      <p>Sorry, the page does not exist!</p>
      <Link to="/" className={css.link}>
        Go back to <span className={css.linkSpan}> Home!</span>
      </Link>
    </div>
  );
}

export default NotFound;
