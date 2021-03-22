import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import styled from 'styled-components';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const Input = styled.input`
  appearance: none;
  border: 1px solid #cad1dc;
  display: block;
  width: 100%;
  outline: none;
  font: inherit;
  line-height: 1.25;
  box-sizing: border-box;
  padding: calc(0.75rem - 3px) calc(0.75rem - 1px) calc(0.75rem - 2px);
  border-radius: 2px;
  color: #262f3d;
  background-color: #fff;
  box-shadow: none;
`;

const formatMoney = Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value) : ''}
      </h2>
      <p>{type.description}</p>
      <Input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
