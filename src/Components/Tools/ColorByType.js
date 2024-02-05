import UsersInfo from "./UsersInfo";

const getRandomColorName = () => {
  const colorNames = ["#e11d48", "#dc2626", "#ea580c", "#065f46", "#1e40af", "#fbbf24"];
  return colorNames[Math.floor(Math.random() * colorNames.length)];
};

const ColorByType = (type) => {
  const randomColorName = getRandomColorName();

  // Check if the type matches any permission in UsersInfo
  const matchedPermission = UsersInfo.permissions.find((itm) => type === itm);

  if (matchedPermission) {
    const style = {
      backgroundColor: randomColorName,
      color: "white",
    };

    return style;
  } else {
    // Handle the case where there is no match
    return {};
  }
};

export default ColorByType;
