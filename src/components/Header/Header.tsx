import { Box } from "@mui/material";
import React, { memo } from "react";
import { LogoIcon } from "../../assets/icons/LogoIcon";

interface IProps {}

export const Header: React.FC<IProps> = memo(() => {
  return (
    <Box p="2vh">
      <LogoIcon />
    </Box>
  );
});
