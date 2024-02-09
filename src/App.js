import { isValid } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const events = [];
const validateDates = [];
const targetValues = [];

const App = () => {
  const [date, setDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dates, setDates] = useState(null);
  const [change, setChange] = useState(null);
  const today = new Date();

  const handleChange = (date) => {
    events.push("onChange");
    if (Array.isArray(date)) {
      const [startDate, endDate] = date;
      setChange(date);
      // if (props.config.showYearDropdown !== undefined && !props.config.showYearDropdown) {
      //   if (
      //     startDate !== null &&
      //     startDate !== undefined &&
      //     new Date().getFullYear() - startDate.getFullYear() > MaxYearDifference
      //   ) {
      //     startDate.setFullYear(new Date().getFullYear());
      //   }

      //   if (
      //     endDate !== null &&
      //     endDate !== undefined &&
      //     new Date().getFullYear() - endDate.getFullYear() > MaxYearDifference
      //   ) {
      //     endDate.setFullYear(new Date().getFullYear());
      //   }

      //   if (
      //     startDate !== null &&
      //     startDate !== undefined &&
      //     endDate !== null &&
      //     endDate !== undefined &&
      //     startDate.getMonth() > endDate.getMonth()
      //   ) {
      //     endDate.setFullYear(new Date().getFullYear() + MinYearDifference);
      //   }
      // }

      setDate(startDate);
      setEndDate(endDate);
      const [from, to] = date.map((d) => (d !== null ? d.toISOString() : null));
      // props.change(from === null && to === null ? null : { from, to });
      setDates("from: " + from + "\n to: " + to);
    } else {
      setDate(date);
      const dateIso = date !== null ? date.toISOString() : null;
      // props.change(dateIso);
      setDates(dateIso);
    }
  };

  const handleChangeRaw = ({ target }) => {
    targetValues.push(target.value)
    events.push("onChangeRaw");
    if (target.value !== undefined && target.value !== "") {
      const dates = target.value.split(" - ").map((date) => {
        const d = new Date(date);
        validateDates.push({date: d, isValid: isValid(d)})
        return isValid(d) ? d : new Date();
      });
      handleChange(dates);
    }
  };
  return (
    <div style={{ margin: "10px" }}>
      <p>Selected Dates::: {dates}</p>
      <p>Date Array: {JSON.stringify(change)}</p>
      <DatePicker
        selected={date}
        selectsRange={true}
        startDate={date}
        endDate={endDate}
        onChange={handleChange}
        onChangeRaw={handleChangeRaw}
        showMonthDropdown
        showYearDropdown={false}
        dateFormat={"MM/dd"}
        onBlur={() => events.push("onBlur")}
        onFocus={() => events.push("onFocus")}
      />

      <p>target values: {targetValues.map((value) => (
        <p>{value}</p>
      ))}
      </p>
      <p>date changes: {validateDates.map((value) => (
        <p>{JSON.stringify(value)}</p>
      ))}
      {JSON.stringify(new Date('02/01' + today.getFullYear()))}
      </p>
    </div>
  );
};

export default App;
