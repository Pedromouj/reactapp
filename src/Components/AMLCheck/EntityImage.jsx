import { useMemo, useState } from "react";
import ImgModal from "../common/ImgModal";
import Avatar from "/icons/avatar.png";

const EntityImage = ({
  image,
  type,
  Typo,
  width = 50,
  heigth = "auto",
  showModal = true,
  witFallback = true,
  ...rest
}) => {
  const [imgUrl, setImgUrl] = useState("");
  const imgFolder = useMemo(
    () => (type === "pep" || type === "person" ? "portraits" : "logos"),
    [type]
  );

  return image ? (
    <>
      <img
        className={`object-contain inline ${showModal ? "cursor-zoom-in" : ""} ${
          imgFolder === "portraits" ? "rounded-full aspect-square object-cover" : "rounded"
        }`}
        src={`${import.meta.env.VITE_AML_IMG_BASE_URL}/${imgFolder}/${image}`}
        width={width}
        heigth={heigth}
        alt=""
        onClick={(e) => {
          setImgUrl(`${import.meta.env.VITE_AML_IMG_BASE_URL}/${imgFolder}/${image}`);
          e.stopPropagation();
        }}
        {...rest}
      />
      {showModal && <ImgModal url={imgUrl} setUrl={setImgUrl} />}
    </>
  ) : Typo !== "" ? (
    <img
      src={Typo === "People" ? "/img/fallback_avatar.png" : "/img/fallback_entity.png"}
      className="rounded-full  object-contain inline"
      width={50}
      heigth="auto"
      alt=""
    />
  ) : (
    <img
      src={imgFolder === "portraits" ? "/img/fallback_avatar.png" : "/img/fallback_entity.png"}
      className="rounded object-contain inline"
      width={50}
      heigth="auto"
      alt=""
    />
  );
};

export default EntityImage;
