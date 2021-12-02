export interface Clasificacion {
	idClasificacion: string;
	nombreClasificacion: string;
}

export interface ResponseGetClasificaciones{
	ok:string;
	msg:string;
	result:Clasificacion[];
}

export interface ResponseGetRazas{
	ok:string;
	msg:string;
	result:Raza[];
}

export interface Raza {
	id: string;
	nombre: string;
}

export interface Servicio {
	id: string;
	nombre: string;
}
export interface ResponseGetServicios{
	ok:string;
	msg:string;
	result:Raza[];
}

export interface Medico{
	id: string;
	nombre: string;
	especialidad: string;
	status: boolean;
}

export interface CreatCat{
	msg:string;
	ok:string;
}


