import { useEffect, useState } from "react";
import { Box, Card, CardContent, Divider, TextField, Typography } from "@mui/material";
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function Nuevo() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [farmacia, setFarmacia] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterData = () => {
            const filtered = data.filter((item) => {
                const comuna_nombre = item.comuna_nombre.toUpperCase();
                const pattern = farmacia.toUpperCase();
                return comuna_nombre.includes(pattern);
            });
            setFilteredData(filtered);
        };
        filterData();
    }, [data, farmacia]);

    const handleSearchChange = (event) => {
        setFarmacia(event.target.value);
    };


    return (
        <Box sx={{ display: "grid", gap: 2 }} component="div">
            <TextField
                id="buscador"
                label="Nombre Comuna"
                type="buscador"
                variant="outlined"
                size="small"
                fullWidth
                helperText="Ingrese la comuna donde desea buscar farmacia"
                value={farmacia}
                onChange={handleSearchChange}
                sx={{ marginTop: 3 }}
            />
            {filteredData.map((item, index) => (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Card sx={{ marginTop: 5, maxWidth: 500 }} key={index}>
                        <CardContent align="center">
                            <LocalHospitalOutlinedIcon />
                            <Typography variant="h4">{item.local_nombre}</Typography>
                            <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
                            <LocationOnOutlinedIcon />
                            <Typography variant="subtitle1" component="p">
                                Comuna: {item.comuna_nombre}
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                Direccion: {item.local_direccion}
                            </Typography>
                            <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
                            <LocalPhoneOutlinedIcon />
                            <Typography variant="subtitle1" component="p">
                                {item.local_telefono}
                            </Typography>
                            <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
                            <CalendarMonthOutlinedIcon />
                            <Typography variant="subtitle1" component="p">
                                Fecha Ultima Actualizacion: {item.fecha}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </Box>

    )
}