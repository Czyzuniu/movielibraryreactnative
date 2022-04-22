import 'reflect-metadata';
import {jsonMember, jsonObject} from 'typedjson';

@jsonObject
export default class MovieDto {
  @jsonMember(Boolean)
  public adult: boolean;
  @jsonMember(String)
  public backdrop_path: string;
  @jsonMember(String)
  public homepage: string;
  @jsonMember
  public id: number;
  @jsonMember
  public original_language: string;
  @jsonMember
  public original_title: string;
  @jsonMember
  public overview: string;
  @jsonMember
  public popularity: number;
  @jsonMember
  public poster_path: string;
  @jsonMember
  public release_date: string;
  @jsonMember
  public revenue: number;
  @jsonMember
  public runtime: number;
  @jsonMember
  public status: string;
  @jsonMember
  public tagline: string;
  @jsonMember
  public title: string;
  @jsonMember
  public video: boolean;
  @jsonMember
  public vote_average: number;
  @jsonMember
  public vote_count: number;
}
