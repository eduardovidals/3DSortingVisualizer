import React from 'react';
import AlgoButton from "./AlgoButton";

function AlgoButtonSetting(props) {
  const {settingDescription, buttonText, disabled, onClick} = props;

  return (
    <div className={"sidebar-setting"}>
      <p> {settingDescription} </p>
      <AlgoButton buttonText={buttonText} disabled={disabled}
                  onClick={onClick}/>
    </div>
  );
}

export default AlgoButtonSetting;
