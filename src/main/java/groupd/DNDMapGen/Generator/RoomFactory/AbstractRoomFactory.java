package groupd.DNDMapGen.Generator.RoomFactory;

import groupd.DNDMapGen.Generator.Room;
import groupd.DNDMapGen.MapSize;
import org.dyn4j.dynamics.Body;
import org.dyn4j.geometry.MassType;
import org.dyn4j.geometry.Rectangle;
import org.dyn4j.world.World;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public abstract class AbstractRoomFactory {

    /**
     * The default minimum room size
     */
    private static final int DEFAULT_MIN_ROOM_SIZE = 10;

    /**
     * Generates a collection of rooms
     * @param size The size of the map
     * @return A collection of rooms that don't overlap
     */
    public abstract Collection<Room> generateRooms(MapSize size);

    /**
     * Takes a collection of rooms and separates them, so they don't overlap.
     * This is done by simulating the rooms as rigid bodies in a dyn4j world
     * @param rooms The rooms to separate
     */
    protected void separateRooms(Collection<Room> rooms){
        Map<Body, Room> roomBodies = new HashMap<>();
        // Create a dyn4j world
        World<Body> world = new World<>();
        world.setGravity(World.ZERO_GRAVITY);

        for(Room room : rooms){
            // Create a body to simulate the room
            Rectangle roomShape = new Rectangle(room.width(), room.height());
            Body roomBody = new Body();
            roomBody.addFixture(roomShape);

            // Remove angular velocity so rooms remain axis-aligned
            roomBody.setMass(MassType.FIXED_ANGULAR_VELOCITY);
            roomBody.setAngularVelocity(0.0);

            // Move the room to its position
            roomBody.translate(room.x(), room.y());
            world.addBody(roomBody);
            roomBodies.put(roomBody, room);
        }

        // Simulate the world until all bodies are at rest
        while(!allBodiesAtRest(world)){
            world.step(1);
        }

        // Update the room positions
        for(Body b: world.getBodies()){
            Room room = roomBodies.get(b);
            room.moveTo((int) Math.round(b.getTransform().getTranslationX()-room.width()/2.0),
                    (int) Math.round(b.getTransform().getTranslationY() - room.height()/2.0));
        }
    }

    /**
     * Checks if all bodies in a dyn4j world are at rest
     * This is a helper method for separateRooms()
     * @param world The world to check
     * @return True if all bodies are not moving, false otherwise
     */
    private boolean allBodiesAtRest(World<Body> world) {
        for(Body body : world.getBodies()){
            if(!body.isAtRest()){
                return false;
            }
        }
        return true;
    }

    /**
     * Returns the number of rooms to generate for a given map size
     * @param size The size of the map
     * @return The number of rooms to generate
     */
    protected int getRoomCount(MapSize size){
        return switch (size) {
            case SMALL -> 25;
            case MEDIUM -> 50;
            case LARGE -> 100;
        };
    }

    /**
     * Returns the maximum width/height of a room for a given map size
     * @param size The size of the map
     * @return The maximum width/height of a room
     */
    protected int getMinRoomSize(MapSize size){
        return DEFAULT_MIN_ROOM_SIZE;
    }
}
