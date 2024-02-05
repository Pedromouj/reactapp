import { useState } from "react"
import Modal from "../common/Modal"
import axios from "axios"
import Token from "../Tools/Token"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
function EmployeTable({data ,fetchAllEmployes ,allchantier }) {
  const [showAddPop ,  setShowAddPop] = useState(false)
  const [selectedChantier , setSelectedChantier] = useState("selectionnez votre chantier")
  const [cin , setCin] = useState("")
  const [nom , setNom] = useState("")
  const [prenom , setPrenom] = useState("")
  const [prix , setPrix] = useState("")
  const [showEditPop , setShowEditPop] = useState(false);
  const [Item  , setItem] = useState() ;
  const [datedebut , setDateDebut] = useState()
 const [messageConfirmation , setMessageConfirmation] = useState(false);
 const [Cin_ , setCin_] =useState("")
const AddEmployes  =async(e)=> {
  e.preventDefault();
  
  await axios.post(`${import.meta.env.VITE_API_BASE_URL_USERS}/api/add/employes`,{
    CIN : cin, 
    nom : nom ,
    prenom : prenom ,
    prix : prix ,
    date_debut : datedebut ,
    numChantier  : selectedChantier 
  } ,{
    headers :{
      Authorization : Token
    }
  })

  fetchAllEmployes()
  setShowAddPop(false)
}


const UpdateEmploye  = async(e)=>{
  e.preventDefault()
  await axios.put(`${import.meta.env.VITE_API_BASE_URL_USERS}/api/update/employes/${Item.CIN}`,{
    CIN : document.getElementById("cin").value, 
    nom : document.getElementById("Nom").value ,
    prenom : document.getElementById("Prénom").value ,
    prix : document.getElementById("Prix").value ,
    numChantier  : document.getElementById("chantierselected").value
  } ,{
    headers :{
      Authorization : Token
    }
  })
  fetchAllEmployes()
  setShowEditPop(false)
}



const showPopUpdate = (item)=>{
  setShowEditPop(prev=>!prev)
  setItem(item)
}

const ShowDelete = async(cin)=>{
  setMessageConfirmation(prev => !prev)
  setCin_(cin)
}

const deleteEmploye = async(index)=>{
  if(index === 1){
    await axios.put(`${import.meta.env.VITE_API_BASE_URL_USERS}/api/delete/employes/${Cin_}`,{},{
      headers :{
        Authorization : Token
      }
    })
      fetchAllEmployes()
     
     setMessageConfirmation(false) 
  }else if(index === -1){
    setMessageConfirmation(false) 

  }
}


const convertDateToExactFormat = (datePointageString) => {
  // Convert the input string to a Date object
  const datePointage = new Date(datePointageString);
  
  // Extract day, month, and year
  const day = String(datePointage.getDate()).padStart(2, '0');
  const month = String(datePointage.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = datePointage.getFullYear();
  
  // Format the date as DD/MM/YYYY
  return `${day}/${month}/${year}`;
};

  
  return (
    <>
    <button className="bg-blue-600 text-white p-1 flex items-center gap-2  mt-5 rounded-lg" onClick={()=>setShowAddPop(prev=>!prev)}>
    <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
    Add
   </button>
    <div className="relative  overflow-x-auto  mx-auto  shadow ">
  

    <table className="container w-full  text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs  text-gray-400 uppercase border-b">
        <tr>
         
          <th scope="col" className="px-4 sm:px-6 py-3">
          CIN
          </th>
          <th scope="col" className="px-4 sm:px-6 py-3">
          Nom  Complet
          </th>
          <th scope="col" className="px-4 sm:px-6 py-3">
           Prix
          </th>
          <th scope="col" className="px-4 sm:px-6 py-3">
           Date debut
          </th>
          <th scope="col" className="px-4 sm:px-6 py-3">
           Date sortie
          </th>
          <th scope="col" className="px-4 sm:px-6 py-3">
           Controls
          </th>
          
        </tr>
      </thead>
      <tbody>

      {
        data?.filter((itm) => itm.status != -1).map((item)=>(
          <tr key={item.CIN}>
          <td className="py-2 px-2">{item.CIN}</td>
          <td className="py-2 px-2">{item.nom}  {item.prenom}</td>
          <td className="py-2 px-2">{item.prix}</td>
          <td className="py-2 px-2">{convertDateToExactFormat(item.date_debut)}</td>
          <td className="py-2 px-2">---</td>
          <td className="py-2 px-2">
        <div className="flex items-center gap-3">

        <button onClick={()=> showPopUpdate(item)} className="bg-green-700  p-1 w-16 rounded hover:opacity-50 duration-100 transition-all cursor-pointer">
          <FontAwesomeIcon icon={faEdit} className="w-4 h-4 text-white" />
          </button>

          <button onClick={()=> ShowDelete(item.CIN)} className="bg-red-600  p-1 w-16 rounded hover:opacity-50 duration-100 transition-all cursor-pointer">
          <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-white" />
          </button>
        </div>
          </td>
          </tr>
        ))
      }
        
      </tbody>
    </table>

  <Modal isOpen={showAddPop} setIsOpen={setShowAddPop} >
    <form onSubmit={AddEmployes} className="grid grid-cols-12 gap-3 items-center p-3">
                     <div className="col-span-6">
                     <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIN</label>
                     <input type="text" id="cin" onChange={e=> setCin(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
                     </div>  
                     <div className="col-span-6">
                     <label htmlFor="Nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                     <input type="text" id="Nom" onChange={e=> setNom(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
                     </div>  
                     <div className="col-span-6">
                     <label htmlFor="Prénom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                     <input type="text" id="Prénom" onChange={e=> setPrenom(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
                     </div>  
                     <div className="col-span-6">
                     <label htmlFor="Prix" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
                     <input type="text" id="Prix" onChange={e=> setPrix(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
                     </div>  

                     <div className="col-span-6">
                     <label htmlFor="datedebut" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date debut</label>
                     <input type="date" id="datedebut" onChange={e=> setDateDebut(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
                     </div>  
                     <div className="col-span-6 w-full">
                     <label htmlFor="chantier" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chantier</label>

                      <select id="chantier" defaultValue={"selectionnez votre chantier"} onChange={(e)=> setSelectedChantier(e.target.value)} className="bg-gray-50 p-2.5 border border-gray-300  rounded-lg cursor-pointer w-full ">
                         <option key="s" disabled={true} value={"selectionnez votre chantier"}>selectionnez votre chantier</option>
                        {allchantier?.map((item) => (
                          <option key={item.numChantier} value={item.numChantier}>{item.Libelle}</option>
                        ))
                      }
                      </select>
                     </div>  
             <div className="col-span-12 mx-auto mt-5">
               <button type="submit" className="bg-blue-600 p-1 text-white rounded w-52 mx-auto cursor-pointer hover:opacity-60 duration-100 transition-all"> Ajouter</button>
             </div>  
    </form>
  </Modal>


<Modal isOpen={showEditPop} setIsOpen={setShowEditPop}>
<form onSubmit={UpdateEmploye} className="grid grid-cols-12 gap-3 items-center p-3">
      <div className="col-span-6">
        <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CIN</label>
        <input type="text" id="cin" defaultValue={Item?.CIN} onChange={e=> setCin(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
       </div>  
        <div className="col-span-6">
          <label htmlFor="Nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
          <input type="text" id="Nom" defaultValue={Item?.nom} onChange={e=> setNom(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
        </div>  
                     <div className="col-span-6">
                     <label htmlFor="Prénom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom</label>
                     <input type="text" id="Prénom"  defaultValue={Item?.prenom} onChange={e=> setPrenom(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
                     </div>  
                     <div className="col-span-6">
                     <label htmlFor="Prix" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix</label>
                     <input type="text" id="Prix" defaultValue={Item?.prix} onChange={e=> setPrix(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  required />
                     </div>  
                     <div className="col-span-12 w-full">
                      <select id="chantierselected" defaultValue={Item?.numChantier} onChange={(e)=> setSelectedChantier(e.target.value)} className="bg-gray-50 p-1.5 border border-gray-300  rounded-lg cursor-pointer w-full ">
                         <option key="s" disabled={true} value={"selectionnez votre chantier"}>selectionnez votre chantier</option>
                        {allchantier?.map((item) => (
                          <option key={item.numChantier} value={item.numChantier}>{item.Libelle}</option>
                        ))
                      }
                      </select>
                     </div>  
                     <div className="col-span-12 mx-auto mt-5">
                      <button type="submit" className="bg-blue-600 p-1 text-white rounded w-52 mx-auto cursor-pointer hover:opacity-60 duration-100 transition-all"> Soumettre</button>
                     </div>  
                  
</form>
</Modal>


<Modal isOpen={messageConfirmation} setIsOpen={setMessageConfirmation}>
 <div className="flex flex-col gap-2 p-2">
  <span className="text-center text-2xl mb-8">
  voulez-vous supprimer ?
  </span>

  <div className="flex gap-3 justify-center ">
   <button onClick={()=> deleteEmploye(1)} className="bg-blue-600 w-40 p-1 text-white rounded hover:opacity-60 duration-100 transition-all">Oui</button>
   <button onClick={()=> deleteEmploye(-1)} className="bg-red-600 w-40 p-1 text-white rounded hover:opacity-60 duration-100 transition-all">Non</button>
  </div>
 </div>
</Modal>




  </div>
    </>
  )
}

export default EmployeTable