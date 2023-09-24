package groupd.DNDMapGen.Generator;

import groupd.DNDMapGen.Generator.HallwayFactory.AbstractHallwayFactory;
import groupd.DNDMapGen.Generator.HallwayFactory.DefaultHallwayFactory;
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

    /**
     * Returns an instance of a HallwayFactory based on the provided map theme.
     *
     * @param mapTheme  The theme for which the hallway factory should be created.
     * @return An instance of AbstractHallwayFactory corresponding to the provided theme.
     */
    public static AbstractHallwayFactory getHallwayFactory(MapTheme mapTheme) {
        return switch (mapTheme) {
            default -> new DefaultHallwayFactory();
        };
    }

    /**
     * Builds a new Dungeon based on the provided size and theme.
     * @return A new Dungeon.
     */
    public Dungeon build(){
        // Select Room and Hallway factories based on theme
        AbstractRoomFactory roomFactory = getRoomFactory(theme);
        AbstractHallwayFactory hallwayFactory = getHallwayFactory(theme);

        // Generate rooms and hallways
        Collection<Room> rooms = roomFactory.generateRooms(size);
        Collection<Room> mainRooms = roomFactory.selectMainRooms(rooms);
        Collection<Hallway> hallways = hallwayFactory.generate(mainRooms);

        // Return a new Dungeon
        return new Dungeon(theme, mainRooms, hallways);
    }

    /**
     * Returns the specified map size.
     */
    public MapSize getSize() {
        return size;
    }

    /**
     * Returns the specified map theme.
     */
    public MapTheme getTheme() {
        return theme;
    }

    public static void main(String[] args) {
        Generator gen = new Generator(MapSize.LARGE, MapTheme.NECROMANCER_DUNGEON);
        Dungeon dungeon = gen.build();
        MockRenderer.render(dungeon);
    }
}
