import Spinner from "./Spinner";

const OverlayOrderSpinner = () => (
  <div className="fixed z-[51] flex items-center justify-center w-screen h-screen top-0 left-0 bg-white/80 dark:bg-slate-800/90">
    <div className="flex flex-col items-center">
      <Spinner />
      <div className="py-1" />
      <h4>Your Order Is Being Processed</h4>
      <p>It might take some time, please wait...</p>
    </div>
  </div>
);

export default OverlayOrderSpinner;
