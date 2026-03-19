from __future__ import annotations

import random
import string
import uuid

from app.models.domain import Player, Room


class LobbyService:
    def __init__(self) -> None:
        self.rooms: dict[str, Room] = {}
        self.player_to_room: dict[str, str] = {}

    async def create_room(self, sid: str, player_name: str, player_class: str) -> Room:
        code = ''.join(random.choice(string.ascii_uppercase) for _ in range(5))
        room = Room(code=code)
        room.players[sid] = Player(sid=sid, id=str(uuid.uuid4())[:8], name=player_name, player_class=player_class)
        room.events.append(f'{player_name} creó la sala {code}.')
        self.rooms[code] = room
        self.player_to_room[sid] = code
        return room

    async def join_room(self, sid: str, room_code: str, player_name: str, player_class: str) -> tuple[bool, str]:
        room = self.rooms.get(room_code)
        if not room:
            return False, 'Sala no encontrada'
        if len(room.players) >= 5:
            return False, 'Sala llena'

        room.players[sid] = Player(sid=sid, id=str(uuid.uuid4())[:8], name=player_name, player_class=player_class)
        room.events.append(f'{player_name} se unió como {player_class}.')
        self.player_to_room[sid] = room_code
        return True, 'ok'

    async def remove_player(self, sid: str) -> None:
        room_code = self.player_to_room.get(sid)
        if not room_code:
            return
        room = self.rooms.get(room_code)
        if not room:
            return
        player = room.players.pop(sid, None)
        if player:
            room.events.append(f'{player.name} abandonó la sala.')
        if not room.players:
            del self.rooms[room_code]
        self.player_to_room.pop(sid, None)

    async def move_player(self, sid: str, movement: dict[str, bool]) -> dict | None:
        room, player = self._locate(sid)
        if not room or not player:
            return None

        speed = 8
        if movement.get('up'):
            player.y -= speed
        if movement.get('down'):
            player.y += speed
        if movement.get('left'):
            player.x -= speed
        if movement.get('right'):
            player.x += speed

        player.x = max(10, min(player.x, 890))
        player.y = max(10, min(player.y, 1590))

        player.stamina = max(0, min(100, player.stamina - 1 if any(movement.values()) else player.stamina + 1))
        return room.serialize_state(sid)

    async def cast_skill(self, sid: str, payload: dict) -> dict | None:
        room, player = self._locate(sid)
        if not room or not player:
            return None

        slot = payload.get('skill_slot', 1)
        if player.mana >= 8:
            player.mana -= 8
            room.events.append(f'{player.name} lanzó habilidad #{slot}.')
        else:
            room.events.append(f'{player.name} intentó lanzar habilidad sin maná.')

        if len(room.events) > 25:
            room.events = room.events[-25:]

        return room.serialize_state(sid)

    def _locate(self, sid: str) -> tuple[Room | None, Player | None]:
        room_code = self.player_to_room.get(sid)
        if not room_code:
            return None, None
        room = self.rooms.get(room_code)
        if not room:
            return None, None
        player = room.players.get(sid)
        return room, player
