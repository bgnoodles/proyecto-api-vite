import { Box, Container, Typography } from "@mui/material";
import CardFarmacia from "./components/CardFarmacia";

export default function App() {
  
  return (
    <Container>
      <Typography variant="h2" sx={{ marginTop: 5 }} align="center">Buscador de Farmacias de Turno</Typography>
      <Box sx={{ display: "grid", gap: 2 }} component="form">
        <CardFarmacia />
      </Box>
    </Container>
  )
}