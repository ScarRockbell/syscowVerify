export interface GastoAcum{
    Total:number;
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

  export interface NacimientosIntervalo{
      TotalNacimientos:number;
  }

  export interface ResponseNacimientoIntervalo{
    ok:string;
    msg:string;
    result:NacimientosIntervalo;
    server:Extra;
  }

  export interface VentasAnio{
      Ventas:number;
      Mes:number;
  }

  export interface ResponseVentasAnio{
      ok:string;
      msg:string;
      result:VentasAnio[];
      server:Extra;
  }

  export interface GastosAnio{
    Gastos:number;
    Mes:number;
  }

  export interface ResponseGastosAnio{
    ok:string;
    msg:string;
    result:GastosAnio[];
    server:Extra;
  }

  export interface Abortos{
      TotalAbortos:number;
  }

  export interface ResponseAbortos{
    ok:string;
    msg:string;
    result:Abortos;
    server:Extra;
  }

  export interface ChartData{
    labels: any[];
     datasets: DataSets[];
  }

  export interface DataSets{

    label: string;
    backgroundColor: string;
    data: any;
  }

