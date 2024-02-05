import  { useEffect, useState } from 'react'
import EmployeTable from './EmployeTable'
import axios from 'axios'
import Token from '../Tools/Token'

function PrincipaleEmployes() {
const [Employes , setEmployes] = useState([])
const [allchantier , setAllChantier] = useState([])



const fetchAllEmployes =async()=>{
const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/api/all/employe` , {
   headers : {
    Authorization : Token
   }

})
setEmployes(data)
}


const fetchAllChantier = async()=> {
  const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/api/all/chantier` , {
    headers : {
      Authorization : Token
    }
  });

  setAllChantier(data)

}


useEffect(()=>{
  fetchAllEmployes()
  fetchAllChantier()
},[])
  return (
    <EmployeTable data={Employes} fetchAllEmployes={fetchAllEmployes} allchantier={allchantier}/>
  )
}

export default PrincipaleEmployes