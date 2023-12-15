import { Alert, Box, Button, Grid, InputLabel, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { alpha } from "@mui/system";
import { useState } from "react";
import {
    Controller,
    useForm,
    type ControllerRenderProps,
    type FieldError,
    type FieldPath,
    type FieldValues,
    type SubmitHandler
} from "react-hook-form";
import { useNavigate } from "react-router";
import SkillsSelect from "../components/SkillsSelect";
import useResourceList from "../hooks/useResourceList";
import { type Skill } from "../hooks/useSkills";
import { addResource } from "../services/resource";

interface CreateResourceFrom {
    firstname: string;
    lastname: string;
    role: string;
    email: string;
    skills: Array<Skill["id"]>;
}

const defaultValues: CreateResourceFrom = {
    firstname: "",
    lastname: "",
    role: "",
    email: "",
    skills: []
};

function FormBinder<
    TFieldValues extends FieldValues = FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    error,
    label,
    field
}: {
    error: FieldError | undefined;
    label: string;
    field: ControllerRenderProps<TFieldValues, TFieldName>;
}) {
    return (
        <Stack>
            <InputLabel shrink required sx={(theme) => (error?.message ? { color: theme.palette.error.main } : {})}>
                {label}
            </InputLabel>
            <TextField
                error={!!error?.message}
                variant="outlined"
                size="small"
                style={{ marginTop: 0 }}
                helperText={error?.message}
                {...field}
            />
        </Stack>
    );
}

export default function ResourceCreate() {
    const navigate = useNavigate();
    const { mutate } = useResourceList();
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, isDirty, isValid, isSubmitted }
    } = useForm<CreateResourceFrom>({
        defaultValues
    });

    const onSubmit: SubmitHandler<CreateResourceFrom> = async (data) => {
        try {
            const res = await addResource(data);
            setOpen(true);
            await mutate();
            navigate(`/resources/${res.id}`);
        } catch (error) {
            setOpenError(true);
        }
    };

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        setOpen(false);
        setOpenError(false);
    };

    return (
        <Box sx={{ display: "flex", p: 3 }}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    Resource created successfully
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openError}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    Something went wrong
                </Alert>
            </Snackbar>

            <form
                onSubmit={handleSubmit(onSubmit, (err) => {
                    console.error(err);
                })}
            >
                <Stack spacing={1}>
                    <Typography variant="h6" fontWeight={500}>
                        Create New Resource
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="firstname"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormBinder<CreateResourceFrom, "firstname">
                                        error={error}
                                        label="First Name"
                                        field={field}
                                    />
                                )}
                                rules={{ required: "This field is mandatory" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="lastname"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <FormBinder<CreateResourceFrom, "lastname">
                                        error={error}
                                        label="Last Name"
                                        field={field}
                                    />
                                )}
                                rules={{ required: "This field is mandatory" }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormBinder<CreateResourceFrom, "role">
                                            error={error}
                                            label="Role"
                                            field={field}
                                        />
                                    )}
                                    rules={{ required: "This field is mandatory" }}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormBinder<CreateResourceFrom, "email">
                                            error={error}
                                            label="Email"
                                            field={field}
                                        />
                                    )}
                                    rules={{ required: "This field is mandatory" }}
                                />
                            </Stack>
                            <Box sx={{ mt: 3 }}>
                                <Controller
                                    name="skills"
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <SkillsSelect
                                            value={field.value}
                                            onChange={field.onChange}
                                            errorText={error?.message ?? ""}
                                        />
                                    )}
                                    rules={{ validate: (v) => v.length >= 1 || "Please select at least one Skill" }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <Box sx={{ m: 3, ml: 0 }}>
                                <Button
                                    disabled={isSubmitting ? true : isDirty ? !isValid : !!isSubmitted}
                                    type="submit"
                                    variant="text"
                                    sx={(theme) => ({
                                        minWidth: 120,
                                        backgroundColor: alpha(
                                            theme.palette.primary.main,
                                            theme.palette.action.activatedOpacity
                                        ),
                                        "&:hover": {
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                theme.palette.action.activatedOpacity * 2
                                            )
                                        }
                                    })}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Stack>
            </form>
        </Box>
    );
}

export { type CreateResourceFrom };
