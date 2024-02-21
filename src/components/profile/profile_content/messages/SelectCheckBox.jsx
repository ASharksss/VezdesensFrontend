import React from "react";

const SelectCheckBox = ({ checked, onChange, children }) => {
    return (
      <label>
        <input
            style={{background: "black"}}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        {children}
      </label>
    );
  };

  export default SelectCheckBox;