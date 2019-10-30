import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {    
  }

  obtenerUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.getUsuariosUrl).pipe(
      map(rawUsuarios => {
        return rawUsuarios.map((usuario) => usuario as Usuario)
      })
    );
  }

  crearUsuario(usuario: Usuario): Observable<boolean>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      };

    return this.http.post<string>(this.createUsuarioUrl, {
      nombre: usuario.nombre,
      edad: usuario.edad
    }, httpOptions).pipe(
      map(createResult => {
        if(createResult == "1"){
          return true;
        } else {
          return false;
        }
      })
    );
  }

  private readonly getUsuariosUrl = "http://10.49.184.48:8888/usuarios/getUsuarios.php";
  private readonly createUsuarioUrl = "http://10.49.184.48:8888/usuarios/createUsuario.php";
}
