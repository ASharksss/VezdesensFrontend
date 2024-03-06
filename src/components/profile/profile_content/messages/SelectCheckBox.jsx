import React from "react";
import '../messages/messages.css'

const selectCheckBox = ({ setIsChecked, onChange, children }) => {
    return (
      <label className="chbx_label">
        <input
          className="chbx_for_message"
          style={{background: "black"}}
          type="checkbox"
          onChange={onChange}
        />
        <span className="chbx_marker" onClick={() => !setIsChecked}></span>
        {children}
      </label>
    );
  };

  export default selectCheckBox;