import { Injectable, NotFoundException } from '@nestjs/common';
import { combineLatest } from 'rxjs';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity'; 


@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies; 
    }

    getOne(id:number): Movie {
        const movie = this.movies.find(movie => movie.id === id ) ;
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`)
        }
        return movie ; 

    }

    deletOne(id:number): boolean {
        console.log(`delete movie : ${id}`); 
        this.getOne(id) ; 
        this.movies = this.movies.filter(movie => movie.id !== id ) ;
        return true; 
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({ 
            id: this.movies.length+1 , 
            ...movieData
        }); 
    }

    update(id:number, updateData: UpdateMovieDto) {
        console.log(id) ; 
        const movie = this.getOne(id) ; 
        this.deletOne(id) ;
//        this.movies.push({ 
//            ...movie , 
//            ...updateData
//        }); 
    }
}

