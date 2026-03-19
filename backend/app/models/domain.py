from dataclasses import dataclass, field
from typing import Any


@dataclass
class Player:
    sid: str
    id: str
    name: str
    player_class: str
    x: float = 450
    y: float = 800
    hp: int = 100
    mana: int = 100
    stamina: int = 100


@dataclass
class Room:
    code: str
    players: dict[str, Player] = field(default_factory=dict)
    events: list[str] = field(default_factory=list)
    wave: int = 1

    def serialize_state(self, perspective_sid: str) -> dict[str, Any]:
        me = self.players[perspective_sid]
        return {
            'room_code': self.code,
            'wave': self.wave,
            'events': self.events[-8:],
            'stats': {
                'hp': me.hp,
                'mana': me.mana,
                'stamina': me.stamina,
            },
            'players': [
                {
                    'id': p.id,
                    'name': p.name,
                    'class': p.player_class,
                    'x': p.x,
                    'y': p.y,
                }
                for p in self.players.values()
            ],
        }
