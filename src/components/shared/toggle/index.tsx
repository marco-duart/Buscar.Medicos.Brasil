import React from 'react';
import styled from 'styled-components';

const SwitchWrapper = styled("label")<{ isActive: boolean, disabled: boolean }>`
  display: inline-block;
  width: 58px;
  height: 28px;
  background-color: ${(props: { isActive: boolean }) => props.isActive ? '#00C247' : 'grey'};
  border-radius: 20px;
  position: relative;
  cursor: ${(props: { disabled: boolean }) => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props: { disabled: boolean }) => (props.disabled ? 'none' : 'auto')};
`;

const SwitchBall = styled("div")<{ isActive: boolean }>`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  transition: transform 0.2s;
  left: ${(props: { isActive: boolean }) => (props.isActive ? '30px' : '2px')};
  top: 1.28px;
`;

interface SwitchProps {
  onToggle: () => void;
  isActive: boolean;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ onToggle, isActive, disabled = false }) => {
  return (
    <SwitchWrapper isActive={isActive} disabled={disabled} onClick={disabled ? undefined : onToggle}>
      <SwitchBall isActive={isActive} />
    </SwitchWrapper>
  );
};

export default Switch;

