package groupd.DNDMapGen.Generator;

import groupd.DNDMapGen.MapSize;
import groupd.DNDMapGen.MapTheme;

import java.util.Collection;

public class Dungeon {

    private final Collection<Room> baseRooms;
    private final Collection<Room> mainRooms;
    private final MapTheme theme;
    private final int width;
    private final int height;

    public Dungeon(MapTheme theme, Collection<Room> rooms, Collection<Room> mainRooms){
        this.theme = theme;
        this.baseRooms = rooms;
        this.mainRooms = mainRooms;
        this.width = rooms.stream().mapToInt(room -> room.x() + room.width()).max().getAsInt();
        this.height = rooms.stream().mapToInt(room -> room.y() + room.height()).max().getAsInt();
    }

    public MapTheme theme(){
        return theme;
    }

    public int width(){
        return width;
    }

    public int height(){
        return height;
    }

    public Collection<Room> baseRooms(){
        return baseRooms;
    }

    public Collection<Room> mainRooms(){
        return mainRooms;
    }
}
