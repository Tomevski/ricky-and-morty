import axios from 'axios';

const API_URL = 'http://localhost:8080/characters';

interface Character {
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: { name: string };
}

interface ApiResponse {
    data: {
        characters: {
            results: Character[];
        };
    };
}

export const fetchCharacters = async (page: number): Promise<Character[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${API_URL}?page=${page}`);
        return response.data.data.characters.results;
    } catch (error) {
        return [];
    }
};
