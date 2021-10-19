import styled from "styled-components";
import clsx from "clsx";

export const ErrorMessage = styled.p.attrs({
  className: "text-red-500 mt-2",
})``;

export const FormGroup = styled.div.attrs({
  className: "relative mb-4",
})``;

export const Input = styled.input.attrs((props) => ({
  className: clsx(
    "w-full px-3 py-2 block rounded-md border-gray-300 shadow-sm focus:ring",
    props.error
      ? "border-red-500 focus:border-red-500 focus:ring-red-200"
      : "focus:border-blue-400 focus:ring-blue-200"
  )
}))``;

export const Label = styled.label.attrs({
  className: "leading-7 text-gray-600",
})``;

export const CheckBox = styled.input.attrs((props) => ({
  type: "checkbox",
  className: clsx(
    "rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50",
    props.error && "border-red-500 focus:border-red-500"
  )
}))``;

export const Button = styled.button.attrs((props) => ({
  className: clsx(
    "px-8 py-2 text-lg border-0 rounded focus:outline-none block w-full",
    props.error
      ? "text-black bg-gray-400"
      : "text-white bg-blue-600 hover:bg-blue-800"
  )
}))``;
