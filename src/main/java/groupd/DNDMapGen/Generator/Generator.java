package groupd.DNDMapGen.Generator;

import groupd.DNDMapGen.Generator.RoomFactory.AbstractRoomFactory;
import groupd.DNDMapGen.Generator.RoomFactory.DefaultRoomFactory;
import groupd.DNDMapGen.MapSize;
import groupd.DNDMapGen.MapTheme;

import java.util.*;

public class Generator {

    private final MapSize size;
    private final MapTheme theme;

    /**
     * Constructs a new Generator with the specified size and theme.
     *
     * @param size   The desired map size.
     * @param theme  The desired map theme.
     */
    public Generator(MapSize size, MapTheme theme){
        this.size = size;
        this.theme = theme;
    }

    /**
     * Returns an instance of a RoomFactory based on the provided map theme.
     *
     * @param mapTheme  The theme for which the room factory should be created.
     * @return An instance of AbstractRoomFactory corresponding to the provided theme.
     */
    public static AbstractRoomFactory getRoomFactory(MapTheme mapTheme) {
        return switch (mapTheme) {
            default -> new DefaultRoomFactory();
        };
    }

    public Dungeon build(){
        DefaultRoomFactory roomFactory = new DefaultRoomFactory();
        Collection<Room> rooms = roomFactory.generateRooms(size);
        Collection<Room> mainRooms = roomFactory.selectMainRooms(rooms);
        return new Dungeon(theme, rooms, mainRooms);
    }

    public MapSize getSize() {
        return size;
    }

    public MapTheme getTheme() {
        return theme;
    }

    public static void main(String[] args) {
        DefaultRoomFactory roomFactory = new DefaultRoomFactory();
        Collection<Room> rooms = roomFactory.generateRooms(MapSize.LARGE);
        Collection<Room> mainRooms = roomFactory.selectMainRooms(rooms);
        MockRenderer.render(rooms, mainRooms, "./test.png");
    }
}
