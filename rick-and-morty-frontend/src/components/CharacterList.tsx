import React, { useEffect, useState } from 'react';
import {FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import { fetchCharacters } from '../services/api';
import CharacterCard from './CharacterCard';

interface Character {
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: { name: string };
}

const CharacterList: React.FC = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [sortByName, setSortByName] = useState<'asc' | 'desc'>('asc');

    const loadCharacters = async () => {
        setLoading(true);
        try {
            const data = await fetchCharacters(page);
            setCharacters((prev) => {
                const updatedCharacters = [...prev, ...data];
                return updatedCharacters.sort((a, b) => {
                    return sortByName === 'asc'
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                });
            });
        } catch (e) {
            setError('Error fetching characters.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCharacters([]);
        loadCharacters();
    }, [sortByName]);

    useEffect(() => {
        loadCharacters();
    }, [page]);

    const handleSortByNameChange = (event: SelectChangeEvent) => {
        setSortByName(event.target.value as 'asc' | 'desc');
    };

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    return (
        <>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            <FormControl fullWidth>
                <InputLabel></InputLabel>
                <Typography variant={"inherit"}>Sort By Name</Typography>
                <Select value={sortByName} onChange={handleSortByNameChange}>
                    <MenuItem value="asc">Name (A-Z)</MenuItem>
                    <MenuItem value="desc">Name (Z-A)</MenuItem>
                </Select>
            </FormControl>

            <Grid2 container spacing={3}>
                {characters.map((character, index) => (
                    <CharacterCard
                        key={index}
                        name={character.name}
                        status={character.status}
                        species={character.species}
                        gender={character.gender}
                        origin={character.origin.name}
                    />
                ))}
            </Grid2>

            <Typography align="center">
                <button onClick={handleLoadMore} disabled={loading}>
                    {loading ? 'Loading more...' : 'Load More'}
                </button>
            </Typography>
        </>
    );
};

export default CharacterList;
