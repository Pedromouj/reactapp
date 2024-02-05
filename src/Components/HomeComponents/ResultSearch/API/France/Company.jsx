import {
  DocumentIcon,
  ArrowDownOnSquareIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Link,
   useParams
} from "react-router-dom";
import CardPlaceholder from "@/components/common/AMLCheck/CardPlaceholder";

const Company = () => {
  const { siren } = useParams();
  // const [results, setResults] = useState({});
  const [pappersResult, setPappersResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);
      // const { data } = await axios.get(
      //   `https://bodacc-datadila.opendatasoft.com/api/records/1.0/search/?dataset=annonces-commerciales&q=${siren}&facet=publicationavis&facet=publicationavis_facette&facet=typeavis&facet=typeavis_lib&facet=familleavis&facet=familleavis_lib&facet=numerodepartement&facet=departement_nom_officiel`
      // );
      // setResults(data);
      // const { data: pappersData } = await axios.get("/company.json");
      const { data: pappersData } = await axios.get(
        `https://api.pappers.fr/v2/entreprise?siren=${siren}&code_naf=&api_token=e12ce6995f924f0f37ddf4178d341c503a7e1368666e8ee9&precision=standard`
      );
      setPappersResult(pappersData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [siren]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <>
      {loading && <CardPlaceholder />}
      {pappersResult && (
        <div className="flex flex-col gap-4">
          <div className="border border-gray-300 rounded-lg p-3 shadow bg-white">
            <div className="grid grid-cols-12">
              <h2 className="flex items-start gap-3 col-span-12">{pappersResult.nom_entreprise}</h2>
              <div className="col-span-2">Adresse</div>
              <div className="col-span-10">{pappersResult.siege?.adresse_ligne_1}</div>
              <div className="col-span-2">Activite</div>
              <div className="col-span-10">{pappersResult.libelle_code_naf}</div>
              <div className="col-span-2">Effictif</div>
              <div className="col-span-10">
                {pappersResult.effectif}
                <span className="text-gray-500 text-sm">
                  {" "}
                  (donnee {pappersResult.annee_effectif})
                </span>
              </div>
              <div className="col-span-2">Creation</div>
              <div className="col-span-10">{pappersResult.date_creation_formate}</div>
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="bg-white col-span-6 grid grid-cols-12 gap-2 border border-gray-300 rounded-lg p-3 shadow">
              <h4 className="col-span-12">
                Informations Juridiques de {pappersResult.nom_entreprise}
              </h4>
              <div className="col-span-4">Siren</div>
              <div className="col-span-8">{pappersResult.siren}</div>
              <div className="col-span-4">SIRET (Siege)</div>
              <div className="col-span-8">{pappersResult.siege?.siret}</div>
              <div className="col-span-4">Forme juridique</div>
              <div className="col-span-8">{pappersResult.forme_juridique}</div>
              <div className="col-span-4">Statut RCS</div>
              <div className="col-span-8">
                <span
                  className={`uppercase font-semibold ${
                    pappersResult.statut_rcs.toLowerCase() === "inscrit" ? "text-green-800" : ""
                  }`}
                >
                  {pappersResult.statut_rcs}
                </span>
              </div>
              <div className="col-span-4">Capital social</div>
              <div className="col-span-8">
                {pappersResult.capital ? pappersResult.capital.toFixed(2) + " €" : "Inconnu"}
              </div>
              <div className="col-span-12 flex gap-2 flex-wrap text-center">
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={`https://api.avis-situation-sirene.insee.fr/identification/pdf/${pappersResult.siege?.siret}`}
                  className="text-center px-4 py-2 bg-blue-800 rounded-lg text-white flex gap-2"
                >
                  <ArrowDownOnSquareIcon className="w-5 h-5" /> Avis de situation{" "}
                  {pappersResult.nom_entreprise}
                </a>
                <button className="px-10 py-2 bg-blue-800 rounded-lg text-white flex gap-2">
                  <ArrowDownOnSquareIcon className="w-5 h-5" />
                </button>
                <button className="px-10 py-2 bg-blue-800 rounded-lg text-white flex gap-2">
                  <ArrowDownOnSquareIcon className="w-5 h-5" /> Avis de situation{" "}
                  {pappersResult.nom_entreprise}
                </button>
              </div>
            </div>
            <div className="bg-white col-span-6 grid grid-cols-12 gap-2 border border-gray-300 rounded-lg p-3 shadow ml-3">
              <h4 className="col-span-12">Activité de {pappersResult.nom_entreprise}</h4>
              <div className="col-span-4">Activité principale déclarée : </div>
              <div className="col-span-8">{pappersResult.objet_social}</div>
              <div className="col-span-4">Code NAF ou APE : </div>
              <div className="col-span-8">
                {pappersResult.code_naf} {pappersResult.libelle_code_naf}
              </div>
              <div className="col-span-4">Domaine d’activité : </div>
              <div className="col-span-8">{pappersResult.domaine_activite}</div>
              <div className="col-span-4">Convention collective : </div>
              <div className="col-span-8">
                {pappersResult.conventions_collectives?.nom} - IDCC{" "}
                {pappersResult.conventions_collectives?.idcc}
              </div>
              <div className="col-span-4">Date de cloture d'exercice comprable : </div>
              <div className="col-span-8">
                {pappersResult.prochaine_date_cloture_exercice_formate}
              </div>
            </div>
            <div className="bg-white col-span-6 grid grid-cols-12 gap-2 border border-gray-300 rounded-lg p-3 shadow mt-3">
              <h4 className="col-span-12">
                Dirigeants et représentants de {pappersResult.nom_entreprise}
              </h4>
              {pappersResult.representants?.map((representant, index) => (
                <>
                  <div className="col-span-6">
                    <h6>
                      <Link to={`#`} className="underline">
                        {representant.nom_complet}
                      </Link>
                    </h6>
                    <p>{representant.qualite}</p>
                    <p>25 ans - {representant.date_de_naissance}</p>
                  </div>

                  <div className="col-span-6">
                    En poste depuis de {representant?.date_prise_de_poste}
                  </div>
                </>
              ))}
            </div>

            <div className="bg-white col-span-6 grid grid-cols-12 gap-2 border border-gray-300 rounded-lg p-3 shadow mt-3 ml-3">
              <h4 className="col-span-12">
                Actionnaires et bénéficiaires effectifs de {pappersResult.nom_entreprise}
              </h4>
              {pappersResult.beneficiaires_effectifs?.map((benef, index) => (
                <>
                  <div className="col-span-6">
                    <h6>
                      <Link to={`#`} className="underline">
                        {benef.prenom} {benef.nom}
                      </Link>
                    </h6>
                    <p>Bénéficiaire direct</p>
                    <p>{benef.date_de_naissance_formatee}</p>
                  </div>
                  <div className="col-span-6">
                    <h6>{benef.pourcentage_parts}%</h6>
                    <p>des parts et des votes</p>
                  </div>
                </>
              ))}
            </div>
            <div className="bg-white col-span-6 grid grid-cols-12 gap-2 border border-gray-300 rounded-lg p-3 shadow mt-3 overflow-y-auto h-64">
              <h4 className="col-span-12">
                Documents juridiques de {pappersResult.nom_entreprise}
              </h4>
              {pappersResult.depots_actes.length}
              <DocumentsJuridiques depotsActes={pappersResult.depots_actes} />
            </div>

            <div className="bg-white col-span-6 grid grid-cols-12 gap-2 border border-gray-300 rounded-lg p-3 shadow mt-3 ml-3 overflow-y-auto h-64">
              <h4 className="col-span-12">Comptes annuels de {pappersResult.nom_entreprise}</h4>
              {pappersResult.comptes.length ? (
                pappersResult.comptes.map((compte) => (
                  <>
                    <div className="col-span-5">
                      <p className="font-bold">Comptes sociaux {compte.annee_cloture}</p>
                    </div>
                    <div className="col-span-5">
                      <p>{compte.date_depot_formate}</p>
                    </div>
                    <div className="col-span-2 h-6 w-6 text-red-600">
                      <DocumentIcon />
                    </div>
                  </>
                ))
              ) : (
                <h6 className="col-span-12 text-center">Aucune information.</h6>
              )}
            </div>

            <div className="bg-white col-span-6 grid grid-cols-12 gap-2 border border-gray-300 rounded-lg p-3 shadow mt-3 overflow-y-auto">
              <h4 className="col-span-12">Comptes annuels de {pappersResult.nom_entreprise}</h4>
              {pappersResult.etablissements.length ? (
                pappersResult.etablissements.map((etab) => (
                  <>
                    <div className="col-span-12 ">
                      <div className="float-left">
                        <BuildingOfficeIcon className="h-6 w-6 float-left text-blue-700" />
                        <span>Siège</span>
                        <p className="text-blue-700 font-bold">
                          En activité <CheckCircleIcon className="h-6 w-6 text-blue-700 inline" />
                        </p>
                      </div>
                      <div className="float-right">
                        <p>
                          {" "}
                          {etab.siret_formate} <DocumentDuplicateIcon className="h-4 w-4 inline" />
                        </p>
                      </div>
                    </div>

                    <div className="col-span-12">
                      <p className="font-normal">
                        Adresse :{" "}
                        <span className="font-medium">
                          {etab?.adresse_ligne_1} {etab.adresse_ligne_2} {etab.code_postal}{" "}
                          {etab.ville}
                        </span>
                      </p>
                      <p className="font-normal">
                        Date de création :{" "}
                        <span className="font-medium">{etab.date_de_creation}</span>
                      </p>
                      <p className="font-normal">
                        Nom commercial : <span className="font-medium">{etab.nom_commercial}</span>
                      </p>
                      <p className="font-normal">
                        Enseigne : <span className="font-medium">{etab.enseigne}</span>
                      </p>
                    </div>
                  </>
                ))
              ) : (
                <h6 className="col-span-12 text-center">Aucune information.</h6>
              )}
            </div>

            <div className="bg-white col-span-6 grid grid-cols-12 gap-2 border border-gray-300 rounded-lg p-3 shadow mt-3 ml-3 overflow-y-auto h-64">
              <h4 className="col-span-12">
                Annonces légales et BODACC de {pappersResult.nom_entreprise}
              </h4>
              {pappersResult.publications_bodacc?.map((pub) => (
                <>
                  <div className="col-span-12">
                    <div className="float-left">
                      <h6 className="font-medium">{pub.type}</h6>
                      <p>RCS {pub.rcs}</p>
                    </div>
                    <div className="float-right">{pub.date}</div>
                  </div>
                  <div className="col-span-12">
                    Type de dépot : <p className="inline font-medium">{pub.type_depot}</p>
                  </div>
                  <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DocumentsJuridiques = ({ depotsActes }) => {
  const [actes, setActes] = useState([]);
  useEffect(() => {
    const arr = [];
    depotsActes.forEach((el) => {
      const res = el.actes?.reduce((acc, cv) => {
        if (acc[JSON.stringify(cv.type)]) {
          acc[JSON.stringify(cv.type)].push({
            decision: cv.decision,
            date_acte: cv.date_acte,
            date_acte_formate: cv.date_acte_formate,
            type: cv.type,
          });
        } else {
          acc[JSON.stringify(cv.type)] = [
            {
              decision: cv.decision,
              date_acte: cv.date_acte,
              date_acte_formate: cv.date_acte_formate,
              type: cv.type,
            },
          ];
        }
        return acc;
      }, {});
      arr.push(res);
    });
    setActes(arr);
  }, [depotsActes]);
  return actes.map((el, index) =>
    Object.keys(el).map((key) => (
      <>
        {/* {JSON.stringify(el[key])} */}
        <div className="col-span-8">
          <p className="font-bold">{JSON.parse(key)}</p>
          <ul className="list-disc ml-3">
            {el[key].map((act, index) => act.decision && <li>{act.decision}</li>)}
          </ul>
        </div>
        <div className="col-span-4">
          <p>{el[key][0].date_acte_formate}</p>
          <DocumentIcon className="w-5 h-5 text-red-500" />
        </div>
      </>
    ))
  );
};

export default Company;
