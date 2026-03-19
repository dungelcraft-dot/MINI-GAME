from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio

from app.services.lobby_service import LobbyService

sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
api = FastAPI(title='MINI-GAME API', version='0.1.0')

api.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

lobby_service = LobbyService()


@api.get('/health')
async def health() -> dict[str, str]:
    return {'status': 'ok'}


@sio.event
async def connect(sid, environ):
    await sio.emit('server_event', {'message': 'Conectado al servidor.'}, to=sid)


@sio.event
async def disconnect(sid):
    await lobby_service.remove_player(sid)


@sio.on('create_room')
async def create_room(sid, payload):
    room = await lobby_service.create_room(sid=sid, player_name=payload['player_name'], player_class=payload['player_class'])
    await sio.enter_room(sid, room.code)
    return {'ok': True, 'room_code': room.code}


@sio.on('join_room')
async def join_room(sid, payload):
    ok, message = await lobby_service.join_room(
        sid=sid,
        room_code=payload['room_code'],
        player_name=payload['player_name'],
        player_class=payload['player_class'],
    )
    if ok:
        await sio.enter_room(sid, payload['room_code'])
        await sio.emit('start_match', {}, room=payload['room_code'])
        return {'ok': True, 'message': 'Unido correctamente'}
    return {'ok': False, 'message': message}


@sio.on('move_input')
async def move_input(sid, payload):
    state = await lobby_service.move_player(sid, payload)
    if state:
        await sio.emit('world_state', state, room=state['room_code'])


@sio.on('cast_skill')
async def cast_skill(sid, payload):
    state = await lobby_service.cast_skill(sid, payload)
    if state:
        await sio.emit('world_state', state, room=state['room_code'])


app = socketio.ASGIApp(sio, api)
