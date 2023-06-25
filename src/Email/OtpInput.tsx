import React, { useMemo } from "react";
import { RE_DIGIT } from "./constants";
import { Input, Container } from "reactstrap";
import "../styles/otpInput.css";

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

export const OTPInput = ({ value, valueLength, onChange }: Props) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split(""); // [1,2,3] //construct an array from value
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    const targetValue = target.value;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();

      return focusToNextInput(target);
    }
    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();

      return focusToPrevInput(target);
    }

    //keep selection range position
    //if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    focusToPrevInput(target);
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <Container className="w-25 d-flex flex-row justify-content-center  align-items-center text-center ">
      {valueItems.map((digit, idx) => (
        <Input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={valueLength}
          className="text-center text-light bg-transparent "
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputKeyDown}
          onFocus={inputOnFocus}
        />
      ))}
    </Container>
  );
};
