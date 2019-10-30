import { UsuariosService } from './../services/usuarios.service';
import { Component } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private usuariosService: UsuariosService, public alertController: AlertController, private geolocation: Geolocation) {    
    (<any>this.nuevoUsurio) = {};
  }

  usuarios: Usuario[];
  nuevoUsurio: Usuario;

  obtenerUsuarios(){
    this.usuariosService.obtenerUsuarios()
      .subscribe(usuarios => this.usuarios = usuarios);
  }

  crearUsuario(){
    this.usuariosService.crearUsuario(this.nuevoUsurio)
      .subscribe(async result => {
        if (result) {
          const alert = await this.alertController.create({
            header: 'Exito',
            message: 'Usuario insertado.',
            buttons: ['OK']
          });
          await alert.present();
        }else{
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Error al insertar usuario.',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
  }

  obtenerUbicacion(){
    this.geolocation.getCurrentPosition().then(async (resp) => {
      const alert = await this.alertController.create({
        header: 'Ubicacion',
        message: `Usted se encuentra en ${resp.coords.latitude}, ${resp.coords.longitude}`,
        buttons: ['OK']
      });
      await alert.present();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
