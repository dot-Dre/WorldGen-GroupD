package groupd.DNDMapGen.Generator.HallwayFactory;

import groupd.DNDMapGen.Generator.Hallway;
import groupd.DNDMapGen.Generator.Room;

import java.util.Collection;

public abstract class AbstractHallwayFactory {

    abstract public Collection<Hallway> generate(Collection<Room> rooms);
}
