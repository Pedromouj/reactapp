import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import UsersInfo from "../Components/Tools/UsersInfo"
import { faFingerprint } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import Token from "../Components/Tools/Token"

function Pointages() {

const addPointages= async()=>{
    const date = new Date();
    let formattedDate = date.toISOString();


    await axios.post(`${import.meta.env.VITE_API_BASE_URL_USERS}/api/add/pointages` , {
        "date_pointage": formattedDate ,
        "absence":  "Oui",
        "presence": "Non",
        "Cin_employe": UsersInfo?.CIN ,
        "heurSup" : "0"
    } ,{
        headers : {
            Authorization : Token
        }
    })

}


  return (


    <table className="w-[90%] mt-10 rounded shadow-md mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nom complet
                </th>
                <th scope="col" className="px-6 py-3">
                   CIN
                </th>
                <th scope="col" className="px-6 py-3">
                status
                </th>
                <th scope="col" className="px-6 py-3">
                    Pointages
                  
                </th>
             
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {UsersInfo.nom_complet}
                </td>
                <td className="px-6 py-4">
                {UsersInfo.CIN}

                </td>
                <td className="px-6 py-4">
                {UsersInfo.status === 0 ? "Employe" : "Chef"}

                </td>
                <td className="px-6 py-4">
                    <button onClick={addPointages} className="bg-red-600 p-1 text-sm flex items-center gap-3 justify-center animate-pulse  font-medium text-white w-40 rounded">
                        <FontAwesomeIcon icon={faFingerprint} className="h-5 w-5" />
                        <span>pointer</span>
                    </button>
                </td>
             
            </tr>
          
        </tbody>
    </table>

  )
}

export default Pointages