package groupd.DNDMapGen;

import groupd.DNDMapGen.Generator.RoomFactory.AbstractRoomFactory;
import groupd.DNDMapGen.Generator.RoomFactory.DefaultRoomFactory;

public enum MapTheme {
    GRAVEYARD,
    NECROMANCER_DUNGEON,
    NEW_THEME,
    MANSION,
    BASEMENT;

    public AbstractRoomFactory getRoomFactory(){
        return getRoomFactory(this);
    }

    public static AbstractRoomFactory getRoomFactory(MapTheme mapTheme) {
        return switch (mapTheme) {
            default -> new DefaultRoomFactory();
        };
    }
}
