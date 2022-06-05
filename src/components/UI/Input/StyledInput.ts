import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MyInput = styled(TextField)({
  width: "100%",
  maxWidth: "600px",
  "label + &": {
    marginTop: "6px",
  },
  "& .MuiInputBase-input": {
    borderRadius: "5px",
    backgroundColor: "#fff",
    border: "none",
    fontSize: "16px",
    fontFamily: "NotoSerif",
    fontWeight: 400,
    padding: "10px 12px",
    "::placeholder": {
      color: "#D9D9D9",
    },
  },
});
