import React, { useState } from "react";
import Productdetails from "./Productdetails";

const Search = ({data,user}) => {
 
  return (
    <div className="p-4">
      <Productdetails data={data} user={user}/>
    </div>
  );
};

export default Search;
