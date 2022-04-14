import React from "react";
import {disabledButtonStyle, enabledButtonStyle} from "./Styles";

function AlgoButton(props) {
  const {buttonText, disabled, onClick} = props;

  const buttonEnter = (e) => {
    if (!disabled) {
      e.currentTarget.style.color = "#98d6e8";
    }
  }

  const buttonLeave = (e) => {
    if (!disabled) {
      e.currentTarget.style.color = "#fff";
    }
  }

  const buttonStyle = disabled ? disabledButtonStyle : enabledButtonStyle;

  return (
    <button disabled={disabled} className={"sidebar-button"} onClick={onClick} style={buttonStyle}
            onMouseEnter={buttonEnter} onMouseLeave={buttonLeave}>
      {buttonText}
    </button>
  );
}

export default AlgoButton;
