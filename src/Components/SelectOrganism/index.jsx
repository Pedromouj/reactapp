import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrganism from "../hooks/useOrganism";
import UsersInfo from "../Tools/UsersInfo";
import Token from "../Tools/Token";

const SelectOrganism = () => {
  const navigate = useNavigate();
  const { organisms, setSelectedOrganism, setModules } = useOrganism();
  const [loading, setLoading] = useState(false);

  const handleOrganismSelect = async (organism) => {
    setLoading(true);
    try {
      setSelectedOrganism(organism);
      localStorage.setItem("selectedOrganism", JSON.stringify(organism));
      const { data } = await http.put(
        "/organismeutilisateurmodules",
        {
          idutilisateur: UsersInfo.userId,
          idorganisme: organism.id,
        },
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      setModules(data);
      localStorage.setItem("modules", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <OverlaySpinner />;
  return (
    <div className="min-h-screen py-14">
      <div className="container mx-auto border rounded-lg shadow-lg bg-white p-5">
        <h1>Select Your Organism</h1>
        {/* <-- organisms --> */}
        <div className="flex gap-5">
          {organisms.map((o) => (
            <div
              key={o.id}
              onClick={() => handleOrganismSelect(o)}
              className="flex rounded-lg shadow-md border overflow-hidden cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <img src={o.logo} alt="" className="w-32 h-auto" />
              <div className="p-5">
                <h4>{o.organisme}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectOrganism;
