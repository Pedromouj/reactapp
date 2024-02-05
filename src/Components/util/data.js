export const dataTypeToInputType = () => {
  return {
    texte: "text",
    nombre: "number",
    date: "date",
    fichier: "file",
    GPS: () => {
      return "";
    },
  };
};

export const getPropFromStringified = (str, propertyToGet = "libelle") => {
  try {
    return JSON.parse(str)[propertyToGet] || str;
  } catch (error) {
    console.error(error);
    return str;
  }
};

export const countryIsoCodeToName = (isoCode) => {
  try {
    const REGION_NAMES = new Intl.DisplayNames("en", {
      type: "region",
    });
    return REGION_NAMES.of(isoCode.toUpperCase());
  } catch (errro) {
    return isoCode;
  }
};

export const isImgUrl = (url) => {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const isImg = (img) => {
  return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(img);
};

export const isPdfUrl = (url) => {
  return /^https?:\/\/.+\.(p f)$/.test(url);
};

export const isPdf = (pdf) => {
  return /\.(pdf)$/.test(pdf);
};

export const isFile = (value) => isPdf(value) || isImg(value);

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "_")
    .replace(/^-+|-+$/g, "");
};

export const getFileUrl = (name) => {
  return `${import.meta.env.VITE_IMG_BASE_URL}/uploadFiles/${name}`;
};

export const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return str;
  }
};

export function generateString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength === 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = [];
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i === 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

export const isDevelopmentMode = () => {
  return import.meta.env.DEV;
};

export const getLang = () => {
  return localStorage.getItem("i18nextLng") || "en";
};

export const skippedFields = [
  "libelle",
  "id",
  "img_perso_url",
  "logo",
  "status",
  "test",
  "tome",
  "type_per",
  "created_at",
  "type",
  "fep",
  "id_local",
  "risk",
  "regulator",
  "entity_counties",
  "new_1",
  "new_2",
  "new_3",
  "importer_pk",
  "add_to_export",
  "add_to_export_env",
  "logo_authority",
  "old",
  "net",
  "financialReports",
  "paysVat",
];

export const typeToTextAndBorderColor = {
  pep: {
    title: "PEP",
    textColor: "text-blue-600",
    borderColor: "border-blue-300",
  },
  person: {
    title: "person",
    textColor: "text-blue-600",
    borderColor: "border-blue-300",
  },
  sanction: {
    title: "Sanction",
    textColor: "text-red-600",
    borderColor: "border-red-300",
  },
  watchlist: {
    title: "Watchlist",
    textColor: "text-orange-600",
    borderColor: "border-orange-300",
  },
  wanted_person: {
    title: "Wanted",
    textColor: "text-orange-500",
    borderColor: "border-orange-400",
  },
  beneficial_owners: {
    title: null,
    textColor: "text-blue-900",
    borderColor: "border-blue-900",
  },
};

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
