import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <RotatingLines
      visible={true}
      height="96"
      width="96"
      color="grey"
      strokeColor="royalblue"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Loader;
