import axios from "axios"
import Token from "../Tools/Token"
import  { useEffect, useState } from "react"
import Modal from "../common/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft , faChevronRight, faDownload, faEye, faGear} from "@fortawesome/free-solid-svg-icons"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SubCalender from "./SubCalender"
function Absences() {
const [innerWidth, setInnerWidth] = useState(window.innerWidth);
const [dataPointages , setDataPointages] = useState([])
const [selectedHeureSup ,  setSelectedHeurSup] = useState("Heur sup")
const [currentDate, setCurrentDate] = useState(new Date());
const [joursDuMois , setJoursDuMois] = useState([])
const [Month , setMonth] = useState()
const [ShowTotale , setShowTotale] = useState(false)
const [showCalender , setShowCalender] = useState(false);
const [TotaleHeur , setTotaleHeur] = useState([])
const obtenirJoursMois = (offset) => {
  const dateActuelle = new Date(currentDate);
  dateActuelle.setDate(dateActuelle.getDate() + offset);

  const tableauJours = [];
  const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const jourActuel = dateActuelle.getDate();
  const isFirstHalfOfMonth = jourActuel <= 15;

  const startDay = isFirstHalfOfMonth ? 1 : 16;
  const endDay = isFirstHalfOfMonth ? 15 : new Date(dateActuelle.getFullYear(), dateActuelle.getMonth() + 1, 0).getDate();

  for (let i = startDay; i <= endDay; i++) {
    const date = new Date(dateActuelle.getFullYear(), dateActuelle.getMonth(), i);
    const jourSemaine = joursSemaine[date.getDay()];
    const dateFormat = `${date.toLocaleDateString("fr-FR")}`;
    const year =  new Date(dateActuelle).getFullYear();
    const dateNormale = date; 
    tableauJours.push({ jour: i, jourSemaine, dateFormat ,dateNormale, jourActuel  , year});
  }

  setCurrentDate(dateActuelle);

 var month ;
 
 
  if(offset === 0) {
     month = new Date().getMonth()+1;
    setMonth(month)
    fetchAllPointages(month)
 
  }else{
     month = new Date(tableauJours[0].dateNormale).getMonth()+1;
    setMonth(month)

   
    fetchAllPointages(month)

  }
  if(tableauJours[0]?.jour === 1){

    fetchDataByCin(month ,"first15")
  }else{
    fetchDataByCin(month ,"last15")
  }
  
  setJoursDuMois(tableauJours);
};

const handlePreviousClick = () => {
  obtenirJoursMois(-15);

};

const handleNextClick = () => {
  obtenirJoursMois(15);
};



const fetchDataByCin = async( month , type)=>{
  const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/api/all/heur-sup/${month}/${type}` ,  {
    headers :{
      Authorization : Token
    }
  })
  // const Totale = []
  // data.map((item) => {
  //   Totale.push({ Totale : (prix * item.Totale) + (prix / 8) * item.Totale })
  // })

  //  console.log(Totale)
  setTotaleHeur(data)
}

const fetchAllPointages = async (month) => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_USERS}/api/all/pointages/${month}`, {
      headers: {
        Authorization: Token,
      },
    });

    setDataPointages(data);

  } catch (error) {
    // Handle error
    console.error("Error fetching pointages:", error);
  }
};

const calculeTotale = (prix , Totale)=>{

 return (prix * Totale) + (prix / 8) * Totale
}


// const CountTotaleByCin = (cin) => {
//   const filteredData = dataPointages?.filter((item) => item.cin === cin);

//   if (!filteredData) {
//     return 0;
//   }

//   const totale = filteredData.map((item) => {
//     const countPresence = item.pointages.filter((dat) => dat.presence === "Oui").length;
//     let somme = 0;

//     item.pointages.forEach((itm) => {
//       somme += (itm.heurSup || 0);
//     });


//     console.log("somme" , somme);

//     const totaleCl = Math.floor((item.prix * countPresence) + (item.prix / 8) * somme);

    
//     return totaleCl;
//   }).reduce((acc, val) => acc + val, 0);
  
//   return totale;
// };



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

    fetchAllPointages(Month)
    fetchDataByCin(Month)
  } catch (error) {
    console.error("Error adding pointages:", error);
    // Handle the error as needed
  }


}




const HeurSup = [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8]
/*
const obtenirJoursMoisCourant = () => {
  const dateActuelle = new Date();
  const jourActuel = dateActuelle.getDate();
  const estPremièreMoitiéDuMois = jourActuel <= 15;

  const tableauJours = [];
  const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  for (let i = 1; i <= 15; i++) {
    const jour = estPremièreMoitiéDuMois ? i : i + 15;
    const date = new Date(dateActuelle.getFullYear(), dateActuelle.getMonth(), jour);
    const jourSemaine = joursSemaine[date.getDay()];
    const dateFormat = `${date.toLocaleDateString("fr-FR")}`;

    tableauJours.push({ jour, jourSemaine, dateFormat , jourActuel});
  }

  setJoursDuMois(tableauJours);

  console.log(new Date(tableauJours).getMonth())
};
*/





// const joursDuMois = obtenirJoursMoisCourant();  =(nb de présent * Prix journalier) + ((Prix journalier / 8) * totale HS)





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

useEffect(()=>{
  obtenirJoursMois(0)
},[])



const TotaleGenerale = ()=>{
 let some = 0  ;
 dataPointages.map((employee)=>{
  TotaleHeur?.filter((item) => item.CIN === employee.cin)?.map((item) => {
     some += calculeTotale(employee.prix, item.Totale) ; 
   })
 })

 return some

}


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

    fetchAllPointages(Month)
    if(joursDuMois[0]?.jour === 1){

      fetchDataByCin(Month ,"first15")
    }else{
      fetchDataByCin(Month ,"last15")
    }
  } catch (error) {
    console.error("Error adding pointages:", error);
    // Handle the error as needed
  }
}




const generatePDF = () => {
  const doc = new jsPDF();
  // doc.setFontSize(16);
  // doc.text(`Totale : ${TotaleGenerale()} DH`, 14, 15);

  // Table headers
  const headers = ['CIN', 'Nom complet', 'Nombre de jour', 'Prix journalier', 'Heures sup', 'Total'];

  // Table data
  const tableData = dataPointages.map((employee) => [
    employee.cin,
    `${employee.nom} ${employee.prenom}`,
    dataPointages
      .filter((item) => item.cin === employee.cin)
      .map((item) => item.pointages.filter((dat) => dat.presence === 'Oui').length),
    `${employee.prix} DH`,
    TotaleHeur?.filter((item) => item.CIN === employee.cin).length > 0
      ? TotaleHeur?.filter((item) => item.CIN === employee.cin).map((item) => item.Totale)
      : '0',
    TotaleHeur?.filter((item) => item.CIN === employee.cin).length > 0
      ? TotaleHeur?.filter((item) => item.CIN === employee.cin).map((item) =>
          calculeTotale(employee.prix, item.Totale)
        )
      : '0',
  ]);

  // Calculate totals
  const totalRow = tableData.reduce(
    (acc, curr) => {
      // acc[2] += parseInt(curr[2]); // Nombre de jour
      acc[5] += parseFloat(curr[5]); // Total
      return acc;
    },
    [null, 'Totale générale : DH', null, null, null, 0] // Initial values for the total row
  );

  // Add table to PDF
  doc.autoTable({
    head: [headers],
    body: [...tableData], // Exclude total row from main table
    startY: 25, // Adjust the starting position of the main table
  });

  // Add total under the table
  doc.autoTable({
    body: [totalRow],
    startY: doc.previousAutoTable.finalY + 10, // Adjust the starting position of the total table
  });

  // Save the PDF
  doc.save('table.pdf');
};





useEffect(() => {
  // Function to update innerWidth
  const handleResize = () => {
    setInnerWidth(window.innerWidth);
  };

  // Attach the event listener when the component mounts
  window.addEventListener('resize', handleResize);

  // Remove the event listener when the component unmounts
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty dependency array ensures the effect runs only once on mount











return (
  <div className="relative text-xs    mt-10 sm:rounded-lg">
{ innerWidth > 768 &&
   <div className="flex gap-10 items-center bg-inherit w-full mb-2  justify-center">
    <button onClick={handlePreviousClick}>
      <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
    </button>
    <button onClick={handleNextClick}>
    <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
    </button> 
   </div>}

   {/* {joursDuMois[0]?.jour} */}
    

    <div className="flex items-center gap-3 ml-2 m-2">
    <button onClick={generatePDF} className="bg-inherit">
      <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
    </button>
    {innerWidth < 768 && <FontAwesomeIcon onClick={()=> setShowCalender(prev => !prev)} 
       className="w-5 h-5 text-blue-600 hover:opacity-60 duration-100 transition-all cursor-pointer"
        icon={faGear}   />}
    </div>
  <div className="flex text-xs  sm:w-auto  gap-2 ">
      <table className="w-full text-xs   border-black border-2  text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 capitalize border-black border-b-2 bg-gray-50">
          <tr className="border-black border-l-2  ">
            <th className="border-black  border-l-2 py-2 px-4">
              CIN
            </th>
            <th className="border-black  border-l-2 py-2 px-4">
              Nom complet
            </th>
            <th className="border-black  border-l-2 py-2 px-4">
              Prix journalié
            </th>
            <th className="border-black  border-l-2 py-2 px-4">
              Totale
            </th>
           
          </tr>
        </thead>
        <tbody>
          { dataPointages?.map((employee) => (
           <tr key={employee.cin}>
              <td className="border-black border-l-2 py-2 px-4">
                {employee.cin}
              </td>
              <td className="border-black border-l-2 py-2 px-4">
               <div className="flex gap-2">
                <div> {employee.nom} </div>
                <div> {employee.prenom} </div>
               </div>
              </td>
              <td className="border-black border-l-2 py-2 px-4">
              <div> {employee.prix} DH </div>
                
              </td>
              <td className="border-black border-l-2 py-2 px-4">
              <div  className="flex items-center gap-3 cursor-pointer  hover:underline text-blue-600 hover:opacity-60 duration-100 transition-all">
                {
                   TotaleHeur?.filter((item) => item.CIN === employee.cin).length > 0
                       ?  
                    TotaleHeur?.filter((item) => item.CIN === employee.cin).map((item) => (
                      <div key={item.CIN}>{calculeTotale(employee.prix , item.Totale)}</div>
                    ))
                : 
                    <div>0</div>
                }
              </div>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>

     { innerWidth > 768 ?

  <SubCalender fetchDataByCin={fetchDataByCin} month={Month} fetchAllPointages={fetchAllPointages} joursDuMois={joursDuMois} dataPointages={dataPointages} HeurSup={HeurSup} />
    :
    <Modal isOpen={showCalender} setIsOpen={setShowCalender} maxWidth="95%" >
      <div className="flex gap-10 items-center bg-inherit w-full mb-2  justify-center">
      <button onClick={handlePreviousClick}>
        <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
      </button>
      <button onClick={handleNextClick}>
      <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
      </button> 
    </div>
       <SubCalender fetchDataByCin={fetchDataByCin} month={Month} fetchAllPointages={fetchAllPointages} joursDuMois={joursDuMois} dataPointages={dataPointages} HeurSup={HeurSup} />
    </Modal>}
  </div>

  <Modal isOpen={ShowTotale} setIsOpen={setShowTotale} >
      <div className="flex gap-3 items-center w-full justify-center">
        <div className="">
          <div className="mb-5">Totale generale</div>  
          <img src="/icons/totale.png" className="w-14 h-14"  />
        </div>
        <div className="mt-10 text-3xl"> {TotaleHeur}</div>
      </div>
  </Modal>
</div>


  )
}

export default Absences ;



// const insertPromise = (async () => {
//   try {
//     await axios.post(
//       `${import.meta.env.VITE_API_BASE_URL_USERS}/api/add/pointages`,
//       {
//         date_pointage: formattedDate,
//         absence: "",
//         presence: "",
//         Cin_employe: items.cin,
//         heurSup: "0",
//       },
//       {
//         headers: {
//           Authorization: Token,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error adding pointages:", error);
//     // Handle the error as needed
//   }
// })();