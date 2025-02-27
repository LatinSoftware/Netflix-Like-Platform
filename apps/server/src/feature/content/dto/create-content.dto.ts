export class CreateContentDto {
    title: string;
    description: string;
    releaseDate: Date;
    duration: number;
    originalLanguage: string;
    category_id: number;
    genre_ids: number[];
}
