export interface GastoAcum{
    SUM:number;
    IDAnimal:number;
  }
  
  export interface RepGastoAcum{
    ok:string;
    msg:string;
    result:GastoAcum[];
  }
  
  export interface PartosMedico{
    IDMedico:number;
    TotalPartos:number;
  }
  
  export interface ResponsePartosMedico{
    ok:string;
    msg:string;
    result:PartosMedico[];
  }
  
  export interface EdadGanado{
    Anios:number;
    Total:number;
  }
  
  export interface ResponseEdadGanado{
    ok:string;
    msg:string;
    result:EdadGanado[];
  }
  
  export interface Extra{
    fieldCount:number;
    affectedRows: number,
    insertId: number;
    info:string;
    serverStatus: number;
    warningStatus: number;
  }
  
  export interface GanadoClasif{
    total:number;
    nombreClasificacion:string;
  }
  
  export interface ResponseGanadoClasif{
    ok:string;
    msg:string;
    result:GanadoClasif[];
    server:Extra;
  }