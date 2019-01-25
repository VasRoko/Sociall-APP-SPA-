import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    knownAS: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    isLiked: boolean;
    interests?: string;
    description?: string;
    lookingFor?: string;
    photos?: Photo[];
    roles?: string[];
}
