package groupd.DNDMapGen.MapBuilder;

import org.springframework.http.ResponseEntity;
import groupd.DNDMapGen.MapTheme;
import groupd.DNDMapGen.Generator.Dungeon;
import groupd.DNDMapGen.Generator.Generator;
import groupd.DNDMapGen.Generator.MockRenderer;

/**
 * A utility class to encapsulate the building of a dungeon image
 * to return to the front end.
 * 
 * @author Andre Lepardo
 */
public class DungeonBuilder implements Builder<byte[]> {

    /**
     * Size constant for small
     */
    private final int SMALL = 8;

    /**
     * Size constant for medium
     */
    private final int MEDIUM = 15;

    /**
     * Size constant for large
     */
    private final int LARGE = 30;

    /*
     * Default theme
     */
    private MapTheme theme = MapTheme.MANSION;

    /**
     * Default seed
     */
    private int seed = 7;

    /*
     * Default room number
     */
    private int roomNumber = this.MEDIUM;

    /**
     * Defaulf variance
     */
    private double variance = 0.7;

    /**
     * Method to set size of dungeon
     * 
     * @param size Size of dungeon
     */
    public void size(String size) {
        switch (size) {
            case "Small":
                this.roomNumber = this.SMALL;
                break;
            case "Medium":
                this.roomNumber = this.MEDIUM;
                break;
            case "Large":
                this.roomNumber = this.LARGE;
                break;
            default:
                this.roomNumber = this.MEDIUM;
        }
    }

    /**
     * Method to set dungeon theme
     * 
     * @param theme Theme of dungeon
     */
    public void theme(String theme) {
        switch (theme) {
            case "Basement":
                this.theme = MapTheme.BASEMENT;
                break;
            case "Mansion":
                this.theme = MapTheme.MANSION;
                break;
            case "Graveyard":
                this.theme = MapTheme.GRAVEYARD;
                break;
            default:
                this.theme = MapTheme.MANSION;
        }
    }

    /**
     * Method to set the seed
     * 
     * @param seed Random Seed to use
     */
    public void seed(int seed) {
        this.seed = seed;
    }

    /**
     * Method to set number of rooms inside the dungeon
     * 
     * @param roomNumber Rooms to generate
     */
    public void roomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    /**
     * TODO
     * @param variance
     */
    public void variance(double variance) {
        this.variance = variance;
    }

    /**
     * Returns a response entity to send back to the front end.
     */
    public ResponseEntity<byte[]> construct() {
        Generator gen = new Generator(this.roomNumber, this.theme, this.seed);
        Dungeon dungeon = gen.build();
        // Still waiting on texture renderer but this will do for now, again
        MockRenderer mock = new MockRenderer();
        // STILL NEEDS TEXTURE RENDERING
        //TODO
        return ResponseEntity.ok().body(null);
    }

}
