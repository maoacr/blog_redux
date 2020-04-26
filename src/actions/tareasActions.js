import axios from 'axios';
import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO,
	CAMBIO_TITULO
} from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: CARGANDO
	});

	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
		
		const tareas = {};
		respuesta.data.map((tar) => (
			tareas[tar.userId] = {
				...tareas[tar.userId],
				[tar.id]: {
					...tar
				}
			}
		));

		dispatch({
			type: TRAER_TODAS,
			payload: tareas
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Tareas no disponibles.'
		})
	}
};

export const cambioUsuarioId = (valor) => (dispatch) => {
	dispatch({
		type: CAMBIO_USUARIO,
		payload: valor
	})
};

export const cambioTitulo = (valor) => (dispatch) => {
	dispatch({
		type: CAMBIO_TITULO,
		payload: valor
	})
};

export const agregar = (nueva_tarea) => async (dispatch) => {
	dispatch({
		type: CARGANDO
	})

	try{
		const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
		console.log(respuesta.data);
		dispatch({
			type: 'agregada'
		})
	}
	catch(error) {
		console.log(error.message)
		dispatch({
			type: ERROR,
			payload: 'Intente más tarde.'
		})
	}
}









