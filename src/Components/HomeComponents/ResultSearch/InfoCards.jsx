import { lazy } from "react";

import { typeToTextAndBorderColor } from "../../util/data";
import EntityImage from "../../AMLCheck/EntityImage";
import CountryImage from "../../AMLCheck/CountryImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import EntityInfoTable from "./EntityInfoTable";

const InfoCard = ({
  selectedRecord,
  showPoliticalPosition = false,
  hasPepRelations = false,
  showEntitySearchLinks = false,
  canRedirect = false,
  Typo,
}) => {
  if (!selectedRecord) return;

  return (
    <div className="overflow-auto print:overflow-hidden max-h-full print:!w-full pr-2 lg:px-2 print:!mt-10">
      <div className="flex flex-col gap-4 items-start flex-grow">
        <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-10 justify-between w-full">
          <EntityImage
            witFallback={false}
            type={selectedRecord.type}
            Typo={Typo}
            image={
              selectedRecord.img_perso_url ||
              selectedRecord.logo ||
              selectedRecord.logo_authority ||
              selectedRecord.logo_source
            }
            width={100}
            heigth="auto"
          />
          {showEntitySearchLinks && (
            <div className="print:hidden border rounded p-2 lg:px-4 lg:pr-14 h-fit py-2 flex flex-col gap-2 text-sm max-w-full">
              <div className="text-gray-400 truncate max-w-full">
                more on <span dangerouslySetInnerHTML={{ __html: selectedRecord.libelle }} />
              </div>
              <div>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    selectedRecord.libelle
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  Google <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-5 h-5" />
                </a>
                <a
                  href={`https://opencorporates.com/officers?q=${encodeURIComponent(
                    selectedRecord.libelle
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  OpenCorporates{" "}
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-5 h-5" />
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="w-full text-black flex-grow pb-2 mb-1 flex items-center flex-wrap gap-3">
          {canRedirect ? (
            <a
              href={`/amlv5/${selectedRecord.type}/${selectedRecord.libelle?.replace(/ /g, "-")}/${
                selectedRecord.id
              }`}
              className="text-3xl font-bold hover:underline"
              dangerouslySetInnerHTML={{
                __html: selectedRecord.libelle
                  ? selectedRecord.libelle
                  : `${selectedRecord.nom || ""} ${selectedRecord.prenom || ""}`,
              }}
            ></a>
          ) : (
            <div
              className="text-3xl font-bold"
              dangerouslySetInnerHTML={{
                __html: selectedRecord.libelle
                  ? selectedRecord.libelle
                  : `${selectedRecord.nom || ""} ${selectedRecord.prenom || ""}`,
              }}
            ></div>
          )}
          <div
            className={`text-sm py-0.5 px-3 rounded border uppercase font-bold ${
              typeToTextAndBorderColor[selectedRecord.type]?.borderColor
            } ${
              typeToTextAndBorderColor[selectedRecord.type]?.textColor ||
              "border-blue-900 text-blue-900"
            }`}
          >
            {selectedRecord.type}
          </div>

          {hasPepRelations && (
            <a
              className={`text-sm py-0.5 px-3 rounded border uppercase border-orange-500 text-orange-600 font-bold `}
              href="#section-pep"
            >
              pep
            </a>
          )}
          {showPoliticalPosition && selectedRecord.Position_politique && (
            <div>
              <div className="text-lg font-bold">{selectedRecord.Position_politique}</div>
              <div className="text-sm font-medium">
                {selectedRecord.entite}{" "}
                <CountryImage countryCode={selectedRecord.entity_counties} size={24} />
              </div>
            </div>
          )}
        </div>
      </div>
      <EntityInfoTable selectedRecord={selectedRecord} />
    </div>
  );
};

export default InfoCard;
