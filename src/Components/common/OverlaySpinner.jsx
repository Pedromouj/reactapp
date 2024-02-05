import Spinner from "./Spinner";

const OverlaySpinner = () => (
  <div className="fixed z-[51] flex items-center justify-center w-screen h-screen top-0 left-0 bg-white/80">
    <Spinner />
  </div>
);

export default OverlaySpinner;
