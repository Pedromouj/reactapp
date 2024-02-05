const Profiles = [
  { name: "AB", color: "#3498db" },
  { name: "BA", color: "#2ecc71" },
  { name: "CD", color: "#e74c3c" },
  { name: "DE", color: "#9b59b6" },
  { name: "EF", color: "#f39c12" },
  { name: "MY", color: "#f33512" },
  { name: "GH", color: "#1abc9c" },
  { name: "HI", color: "#d35400" },
  { name: "IJ", color: "#c0392b" },
  { name: "JK", color: "#3498db" },
  { name: "KL", color: "#2ecc71" },
  { name: "MN", color: "#e74c3c" },
  { name: "NO", color: "#9b59b6" },
  { name: "OP", color: "#f39c12" },
  { name: "QR", color: "#1abc9c" },
  { name: "FA", color: "#1abc9c" },
  { name: "RS", color: "#d35400" },
  { name: "ST", color: "#c0392b" },
  { name: "UV", color: "#3498db" },
  { name: "VW", color: "#2ecc71" },
  { name: "RA", color: "#e74c3c" },
  { name: "HA", color: "#9b59b6" },
  { name: "YZ", color: "#f39c12" },
  { name: "SA", color: "#f39c12" },
  { name: "ZA", color: "#1abc9c" },
  { name: "US", color: "#1abc9c" },
  { name: "AZ", color: "#d35400" },
  { name: "US", color: "#c0392b" },
  { name: "NA", color: "#c0392b" },
];

const getRandomColorName = (firstLetter, secondLetter) => {
  const matchingProfiles = Profiles.filter(
    (itm) => itm.name === firstLetter?.toUpperCase() + secondLetter?.toUpperCase()
  );

  if (matchingProfiles.length > 0) {
    return matchingProfiles.map((itm) => itm.color)[0]; // Return the color of the first matching profile
  } else {
    return "#3498db"; // You can set a default color if there is no match
  }
};

export default getRandomColorName;
