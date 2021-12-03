export interface Animal {
  id: number;	
  areteinterno: string;
  areteSIINIGA: string;
  fechaNacimiento: string;
  sexo: string;
  idRaza: number;
  idClasificacion: number;
}

export interface GetAnimalsResponse{


    ok:string;
    msg:string;
    result:AnimalResponse[];

}
export interface GetServiciosResponse{


    ok:string;
    msg:string;
    result:Servicio[];

}

export interface AnimalResponse {
  animalID:     number;
  areteInter:   string;
  areteSIINIGA: string;
  fechaNac:     Date;
  sexo:         string;
  idRaza:       number;
  idClasific:   number;
  clasifiacion: string;
  raza:         string;
  status:       number;
}


export interface Baja{
  idAnimal: number;
  fechaBaja: string;
  descripcion: string;
}
export interface BajaTemp{
  fechaBaja: Date;
  descripcion: string;
}

export interface Venta {
  idBaja: number;
  comprador: string;
  precio: number;
}
export interface Servicio {
  IDServicio:     number;
  IDAnimal:       number;
  IDTipoServicio: number;
  FechaServicio:  Date;
  IDMedico:       number;
  Costo:          number;
}
