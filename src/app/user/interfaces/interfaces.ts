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
    result:ServicioCompleto[];

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
export interface ServicioCompleto {
  IDServicio:     number;
  IDAnimal:       number;
  IDTipoServicio: number;
  FechaServicio:  Date;
  IDMedico:       number;
  Costo:          number;
}

export interface NewServicio {
  idAnimal: string;
  idTipoServicio: string;
  fecha: string;
  idMedico: string;
  costo: number;
}

export interface Diagnostico {
  IDDiagnostico: number;
  Fecha: string;
  IDMedico: number;
  IDAnimal: number;
  Descripcion: string;
  DiasDeCarga: number;
  CostoDiagnostico: number;
  
  StatusDiagnostico: number;
  NombreMedico: string;
  Especialidad: string;
}
export interface NewDiagnostico {
  idAnimal: number ;
fecha: string ;
idMedico: number ;
descDiagnostico: number ;
diasDeCarga: number ;
 costo: number ;
statusDiagnostico: number ;

}
export interface GetDiagnosticoResponse{
  ok: boolean;
  msg: string;
  result : Diagnostico[];
}

export interface NewParto {
  idDiagnostico: number;
  tipoParto: string;
  fecha: string;
  observaciones: string;
}
            export interface GetPartosResponse{
              ok: boolean;
              msg: string;
              result : Parto[];
            }

export interface Parto {
  IDAnimal: number;
  IDParto: number;
  IDDiagnostico: number;
  FechaParto: string;
  TipoParto: string;
  Observaciones: string;
  FechaDiagnostico: string;
  IDMedico: number;
  DiasDeCarga: number;
  CostoDiagnostico: number;
  DescrDiagnostico: string;
}