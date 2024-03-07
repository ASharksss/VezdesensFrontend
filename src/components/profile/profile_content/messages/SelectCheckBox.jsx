import React from "react";
import '../messages/messages.css'

const selectCheckBox = ({ setIsChecked=false, onChange, children, chatId }) => {
    return (
      <label className={`chbx_label${setIsChecked ? ' active': ''}`}>
        <input
          checked={setIsChecked}
          className="chbx_for_message"
          style={{background: "black"}}
          type="checkbox"
          onChange={() => onChange(chatId)}
        />
        <span className="chbx_marker"></span>
        {children}
      </label>
    );
  };

  export default selectCheckBox;
