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
	descripcion: string;
}
export interface ResponseGetServicios{
	ok:string;
	msg:string;
	result:Servicio[];
}

export interface ResponseGetMedicos{
	ok:string;
	msg:string;
	result:Medico[];
}

export interface Medico{
	idMedico: string;
	nombre: string;
	especialidad: string;
}

export interface CreatCat{
	msg:string;
	ok:string;
}

export interface Usuario{
	idUsuario:string;
	nombreUsuario:string;
	puesto:string;
	telefono:string;
	contraseniaUsuario:string;
}

export interface ResponseGetUsuarios{
	ok:string;
	msg:string;
	result:Usuario[];
}


