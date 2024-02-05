import BANNER from "../../assets/bannav-min.png";

export default function BannerPage({heading = ""}) {
  return (
    <section className="h-full bg-white">
      <h1>{heading}</h1>
      <img src={BANNER} alt="" className="w-full h-full object-cover" />
    </section>
  );
}