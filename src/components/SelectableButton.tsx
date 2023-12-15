import { Button, alpha, type ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { type PropsWithChildren } from "react";
interface CustomButtonProps extends ButtonProps {
    isSelected?: boolean;
}

const CustomButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== "isSelected"
})<CustomButtonProps>(({ theme, isSelected }) => ({
    minWidth: 40,
    //   ...(!isSelected && {
    //     color: theme.palette.common.black,
    //   }),
    ...(isSelected && {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        }
    })
}));

export default function SelectableButton({ children, ...rest }: PropsWithChildren<CustomButtonProps>) {
    return (
        <CustomButton size="small" {...rest}>
            {children}
        </CustomButton>
    );
}
