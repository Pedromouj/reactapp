import axios from 'axios';
import React, { useState } from 'react'
import Token from '../Tools/Token';

const SubCalender = ({joursDuMois , dataPointages , HeurSup , fetchAllPointages , month , fetchDataByCin}) => {
  const [selectedHeureSup ,  setSelectedHeurSup] = useState("Heur sup")








    const addPointages =  async(dateFormat, items, value , heurSup = 0) => {

        const newDateFormat = '...-...-..';
        
        // Example date string in original format
         // Replace with your actual date string
        
        // Split the original date string into an array
        const dateArray = dateFormat.split('/');
        
        // Create a new date string with the desired format
        const newDateString = newDateFormat
          .replace('...', dateArray[2])  // Replace '...' with the year
          .replace('...', dateArray[1])  // Replace '...' with the month
          .replace('..', dateArray[0]);  // Replace '..' with the day
        
        // Create a new Date object from the formatted date string
        const dateObject = new Date(newDateString);
        
        // // async
        // // Get individual components of the date
        // const year = dateObject.getFullYear();
        // const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        // const day = String(dateObject.getDate()).padStart(2, '0');
        // const hours = String(dateObject.getHours()).padStart(2, '0');
        // const minutes = String(dateObject.getMinutes()).padStart(2, '0');
        // const seconds = String(dateObject.getSeconds()).padStart(2, '0');
      
        // // Construct the formatted date string
        // const formattedDate = `${year}-${day}-${month} ${hours}:${minutes}:${seconds}`;
      
      
        try {
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL_USERS}/api/add/pointages`,
            {
              date_pointage: dateObject,
              absence: value.includes("absent Oui") ? "Oui" : "Non",
              presence: value.includes("present Oui") ? "Oui" : "Non",
              Cin_employe: items.cin,
              heurSup: heurSup,
            },
            {
              headers: {
                Authorization: Token,
              },
            }
          );
      
          fetchAllPointages(month)
          fetchDataByCin(month)
        } catch (error) {
          console.error("Error adding pointages:", error);
          // Handle the error as needed
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
      const UpdateByselect  = async(dateObject , Cin ,heurSup)=>{
        try {
      
          setSelectedHeurSup(heurSup)
          const newDateFormat = '...-...-..';
        
          // Example date string in original format
           // Replace with your actual date string
          
          // Split the original date string into an array
          const dateArray = dateObject.split('/');
          
          // Create a new date string with the desired format
          const newDateString = newDateFormat
            .replace('...', dateArray[2])  // Replace '...' with the year
            .replace('...', dateArray[1])  // Replace '...' with the month
            .replace('..', dateArray[0]);  // Replace '..' with the day
          
          // Create a new Date object from the formatted date string
          const dateObject_ = new Date(newDateString);
          
      
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL_USERS}/api/add/pointages`,
            {
              date_pointage: dateObject_,
              absence:"Non",
              presence : "Oui",
              Cin_employe: Cin,
              heurSup: heurSup,
            },
            {
              headers: {
                Authorization: Token,
              },
            }
          );
      
          fetchAllPointages(month)
          if(joursDuMois[0]?.jour === 1){
      
            fetchDataByCin(month ,"first15")
          }else{
            fetchDataByCin(month ,"last15")
          }
        } catch (error) {
          console.error("Error adding pointages:", error);
          // Handle the error as needed
        }
      }
      

  return (
    <div className="overflow-x-auto">
    <table className="w-full text-xs  border-black border-2  text-left rtl:text-right text-gray-500">
      <thead className="text-xs text-gray-700 capitalize border-black border-b-2 bg-gray-50">
        <tr className="border-black border-l-2  ">
      
          {joursDuMois?.map((dayObj) => (
            <th className="border-black border-l-2 py-2 px-4" key={dayObj}>
              {dayObj.dateFormat}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        { dataPointages?.map((employee) => (
         <tr key={employee.cin}>
           
            {joursDuMois.map((dayObj) => (
              <td className="border-black  border-l-2 py-2 px-4" key={dayObj}>
               {/* {dayObj.year} */}
                <div className="flex flex-col">
              <div className="flex items-center mb-1 gap-3">
              <input
                  name={`${employee.cin}_${dayObj.jour}`}
                  checked={employee.pointages.some((item) => convertDateToExactFormat(item.date_pointage) === dayObj.dateFormat && item.presence === "Oui")}
                   disabled={new Date() < new Date(dayObj.dateNormale) }
                  type="radio"
                  id={`Present_${employee.cin}_${dayObj.jour}`}
                  value={"Oui"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  onChange={(e) => addPointages(dayObj.dateFormat, employee, `present ${e.target.value}`)}
              />
                <label htmlFor={`Present_${employee.cin}_${dayObj.jour}`} className="ms-2 text-xs font-medium text-gray-400">Présent</label>
              </div>

              <div className="flex items-center mb-1 gap-3">
                <input name={`${employee.cin}_${dayObj.jour}`}
                 onChange={(e)=> addPointages(dayObj.dateFormat,employee,"absent "+e.target.value)}
                 disabled={new Date() < new Date(dayObj.dateNormale)}
                 checked={employee.pointages.some((item) => convertDateToExactFormat(item.date_pointage) === dayObj.dateFormat && item.absence === "Oui" )  && true}
                 type="radio" 
                 id={`Absent_${employee.cin}_${dayObj.jour}`} 
                 value={"Oui"} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded " />
                <label htmlFor={`Absent_${employee.cin}_${dayObj.jour}`} className="ms-2 text-xs font-medium text-gray-400">Absent</label>
              </div>
              <div>
              </div>
              <div className="flex items-center gap-3">
                <select 
                disabled={new Date() < new Date(dayObj.dateNormale)} className={`mt-2 ${new Date() < new Date(dayObj.dateNormale)? "cursor-default" : "cursor-pointer"} border shadow`} 
                onChange={(e) => UpdateByselect(dayObj.dateFormat ,employee.cin,dayObj.jour,  e.target.value)}
                >
                  <option value={"Heur sup"}>Heur sup</option>
                  {HeurSup.map((itm) => (
                    <option key={itm} value={itm}>
                      {itm}
                    </option>
                  ))}
                </select>
              </div>
              <button>
              </button>
               </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
     </div>

  )
}

export default SubCalender