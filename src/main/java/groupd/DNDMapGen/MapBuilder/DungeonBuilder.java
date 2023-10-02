package groupd.DNDMapGen.MapBuilder;

import org.springframework.http.ResponseEntity;
import groupd.DNDMapGen.MapTheme;
import groupd.DNDMapGen.Generator.Dungeon;
import groupd.DNDMapGen.Generator.Generator;
import groupd.DNDMapGen.Generator.MockRenderer;

public class DungeonBuilder implements Builder<byte[]> {

    private final int SMALL = 8;

    private final int MEDIUM = 15;

    private final int LARGE = 30;

    private MapTheme theme = MapTheme.MANSION;

    private int seed;

    private int roomNumber = this.MEDIUM;

    private double variance = 0.7;

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

    public void seed(int seed) {
        this.seed = seed;
    }

    public void roomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public void variance(double variance) {
        this.variance = variance;
    }

    public ResponseEntity<byte[]> construct() {
        Generator gen = new Generator(this.roomNumber, this.theme, this.seed);
        Dungeon dungeon = gen.build();

        String jsonDataString = "{" +
                "\"theme\": \"" + theme + "\"," +
                "\"seed\": " + seed + "," +
                "\"roomNumber\": " + roomNumber + "," +
                "\"variance\": " + variance +
                "}";

        // Still waiting on texture renderer but this will do for now, again
        MockRenderer mock = new MockRenderer();

        ResourceContent content = new ResourceContent(mock.render(dungeon, ""), jsonDataString);

        return ResponseEntity.ok().body(null);
    }

}
