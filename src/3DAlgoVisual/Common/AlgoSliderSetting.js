import React from 'react';
import {disabledSliderStyle, enabledSliderStyle} from "./Styles";
import {Slider} from "@mui/material";

function AlgoSliderSetting(props) {
  const {settingDescription, statusDescription, disabled, onChange, defaultValue, min, max} = props;

  const sliderStyle = disabled ? disabledSliderStyle : enabledSliderStyle;

  return (
    <div className={"sidebar-setting"}>
      <p> {settingDescription} </p>
      <p> {statusDescription} </p>
      <Slider sx={sliderStyle} disabled={disabled} min={min}
              onChange={onChange} max={max} defaultValue={defaultValue}
              valueLabelDisplay="auto"/>
    </div>
  );
}

export default AlgoSliderSetting;
