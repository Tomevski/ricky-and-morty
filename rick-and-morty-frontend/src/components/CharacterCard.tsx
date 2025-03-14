import React from 'react';
import {Card, CardContent, Typography, CardMedia, Grid2} from '@mui/material';

interface CharacterProps {
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: string;
}

const CharacterCard: React.FC<CharacterProps> = ({ name, status, species, gender, origin }) => {
    return (
        <Grid2 >
            <Card>
                <CardMedia
                    component="img"
                    height="140"
                    image="logo192.png"
                    alt={name}
                />
                <CardContent>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2" color="textSecondary">Status: {status}</Typography>
                    <Typography variant="body2" color="textSecondary">Species: {species}</Typography>
                    <Typography variant="body2" color="textSecondary">Gender: {gender}</Typography>
                    <Typography variant="body2" color="textSecondary">Origin: {origin}</Typography>
                </CardContent>
            </Card>
        </Grid2>
    );
};

export default CharacterCard;
