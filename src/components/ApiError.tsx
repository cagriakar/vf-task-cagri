import { Button, Container, Stack, Typography } from "@mui/material";

export default function ApiError({ onRetry }: { onRetry: () => Promise<any> }) {
    return (
        <Container>
            <Stack>
                <Typography variant="caption">{`Couldn't get the info right now, sorry!`}</Typography>
                <Button onClick={async () => await onRetry()}>Try Again</Button>
            </Stack>
        </Container>
    );
}
