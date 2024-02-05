import React from "react";
import { useParams } from "react-router-dom";

const GlobalAPIEntity = () => {
  const { search_id, entity_id } = useParams();
  return (
    <div>
      {search_id}
      {entity_id}
    </div>
  );
};

export default GlobalAPIEntity;
