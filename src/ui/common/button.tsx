import React from "react";
import { Pressable } from "./pressable";
import { Text } from "./text";

type Props = {
  label?: string;
  onPress?: () => void;
  className?: string;
};

const DEFAULT_CLASS_NAME = "bg-blue-500 p-4 rounded-md";

export const Button: React.FC<Props> = ({
  label,
  onPress = () => {},
  className,
}) => {
  return (
    <Pressable
      className={`${DEFAULT_CLASS_NAME} ${className}`}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </Pressable>
  );
};
